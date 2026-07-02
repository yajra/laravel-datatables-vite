#!/usr/bin/env bash

set -euo pipefail

usage() {
    cat <<'EOF'
Usage: ./publish.sh [--dry-run] [major|minor|patch|x.y.z]

Without an explicit release type or version, the next version is inferred from
Conventional Commits since the latest reachable vX.Y.Z tag:

  BREAKING CHANGE or type!: major
  feat:                  minor
  fix: or perf:          patch

Examples:
  ./publish.sh --dry-run
  ./publish.sh patch
  ./publish.sh 0.7.0
EOF
}

require_command() {
    if ! command -v "$1" >/dev/null 2>&1; then
        echo "Missing required command: $1" >&2
        exit 1
    fi
}

dry_run=0
release_request=""

while [ "$#" -gt 0 ]; do
    case "$1" in
        --dry-run)
            dry_run=1
            ;;
        -h|--help)
            usage
            exit 0
            ;;
        *)
            if [ -n "$release_request" ]; then
                echo "Only one release type or version may be provided." >&2
                usage >&2
                exit 1
            fi

            release_request="$1"
            ;;
    esac

    shift
done

require_command git
require_command mktemp
require_command node
require_command npm

release_info_file="$(mktemp)"
trap 'rm -f "$release_info_file"' EXIT

RELEASE_REQUEST="$release_request" node <<'NODE' > "$release_info_file"
const { execFileSync } = require('node:child_process');
const { readFileSync } = require('node:fs');

const versionPattern = /^v?(\d+)\.(\d+)\.(\d+)$/;
const releaseTypes = new Set(['major', 'minor', 'patch']);

function git(args) {
    return execFileSync('git', args, {
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'pipe'],
    }).trim();
}

function parseVersion(value, label) {
    const match = versionPattern.exec(String(value).trim());

    if (!match) {
        throw new Error(label + ' must be a stable semver version like 1.2.3.');
    }

    return {
        major: Number(match[1]),
        minor: Number(match[2]),
        patch: Number(match[3]),
    };
}

function formatVersion(version) {
    return version.major + '.' + version.minor + '.' + version.patch;
}

function compareVersions(left, right) {
    for (const key of ['major', 'minor', 'patch']) {
        if (left[key] > right[key]) {
            return 1;
        }

        if (left[key] < right[key]) {
            return -1;
        }
    }

    return 0;
}

function bumpVersion(version, releaseType) {
    if (releaseType === 'major') {
        return { major: version.major + 1, minor: 0, patch: 0 };
    }

    if (releaseType === 'minor') {
        return { major: version.major, minor: version.minor + 1, patch: 0 };
    }

    return { major: version.major, minor: version.minor, patch: version.patch + 1 };
}

function commitsSince(tag) {
    const args = ['log'];

    if (tag) {
        args.push(tag + '..HEAD');
    }

    args.push('--format=%B%x00');

    const output = git(args);

    return output
        .split('\0')
        .map((message) => message.trim())
        .filter(Boolean);
}

function detectReleaseType(commits) {
    let hasFeature = false;
    let hasPatch = false;

    for (const message of commits) {
        const header = message.split(/\r?\n/, 1)[0] || '';

        if (/^[A-Za-z][\w-]*(\([^)]*\))?!:/.test(header) || /^BREAKING(?: |-)CHANGE:/m.test(message)) {
            return 'major';
        }

        if (/^feat(\([^)]*\))?:/.test(header)) {
            hasFeature = true;
        }

        if (/^(fix|perf)(\([^)]*\))?:/.test(header)) {
            hasPatch = true;
        }
    }

    if (hasFeature) {
        return 'minor';
    }

    if (hasPatch) {
        return 'patch';
    }

    return '';
}

try {
    const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
    const currentVersion = parseVersion(pkg.version, 'package.json version');
    let latestTag = '';
    let latestTagVersion = null;

    try {
        latestTag = git(['describe', '--tags', '--match', 'v[0-9]*.[0-9]*.[0-9]*', '--abbrev=0']);
        latestTagVersion = parseVersion(latestTag, 'latest git tag');
    } catch (_error) {
        latestTag = '';
    }

    const baseVersion = latestTagVersion && compareVersions(latestTagVersion, currentVersion) > 0
        ? latestTagVersion
        : currentVersion;
    const commits = commitsSince(latestTag);
    const request = process.env.RELEASE_REQUEST.trim();
    let releaseType = '';
    let nextVersion = null;
    let source = 'commits';

    if (request) {
        source = 'manual';

        if (releaseTypes.has(request)) {
            releaseType = request;
            nextVersion = bumpVersion(baseVersion, releaseType);
        } else {
            nextVersion = parseVersion(request, 'requested version');

            if (compareVersions(nextVersion, baseVersion) <= 0) {
                throw new Error('requested version ' + formatVersion(nextVersion) + ' must be greater than ' + formatVersion(baseVersion) + '.');
            }

            if (nextVersion.major !== baseVersion.major) {
                releaseType = 'major';
            } else if (nextVersion.minor !== baseVersion.minor) {
                releaseType = 'minor';
            } else {
                releaseType = 'patch';
            }
        }
    } else {
        releaseType = detectReleaseType(commits);

        if (!releaseType) {
            const range = latestTag ? ' since ' + latestTag : '';
            throw new Error('No release-worthy Conventional Commits found' + range + '.');
        }

        nextVersion = bumpVersion(baseVersion, releaseType);
    }

    console.log([
        releaseType,
        formatVersion(nextVersion),
        latestTag,
        commits.length,
        formatVersion(baseVersion),
        formatVersion(currentVersion),
        source,
    ].join('|'));
} catch (error) {
    console.error(error.message);
    process.exit(1);
}
NODE

release_info="$(<"$release_info_file")"
rm -f "$release_info_file"
trap - EXIT

IFS='|' read -r release_type version latest_tag commit_count base_version current_version source <<< "$release_info"

if [ "$source" = "manual" ]; then
    echo "Using requested $release_type release: $base_version -> $version"
else
    echo "Detected $release_type release from $commit_count commit(s): $base_version -> $version"
fi

if [ -n "$latest_tag" ]; then
    echo "Latest tag: $latest_tag"
fi

if [ "$current_version" != "$base_version" ]; then
    echo "Package version: $current_version"
fi

if [ "$dry_run" -eq 1 ]; then
    echo "Dry run only; no version, git, or npm changes were made."
    exit 0
fi

if [ -n "$(git status --porcelain)" ]; then
    echo "Working tree has uncommitted changes. Commit or stash them before publishing." >&2
    exit 1
fi

branch="$(git branch --show-current)"

if [ -z "$branch" ]; then
    echo "Cannot publish from a detached HEAD." >&2
    exit 1
fi

echo "Publishing version $version from $branch"
npm version "$version" -m "chore(release): v%s"
git push origin "$branch" --follow-tags
npm publish
