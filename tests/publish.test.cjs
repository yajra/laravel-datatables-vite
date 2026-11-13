const { test } = require('node:test');
const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const { mkdtempSync, copyFileSync, writeFileSync, rmSync } = require('node:fs');
const { tmpdir } = require('node:os');
const { join, resolve } = require('node:path');

for (const [message, expected] of [
    ['fix: repair export', '0.7.1'],
    ['feat: add export', '0.8.0'],
    ['feat!: support DataTables 3\n\nBREAKING CHANGE: Requires DataTables 3.', '1.0.0'],
]) {
    test('publish dry run: ' + expected, () => {
        const directory = mkdtempSync(join(tmpdir(), 'datatables-release-'));
        const git = (...args) => execFileSync('git', args, { cwd: directory, encoding: 'utf8' }).trim();
        try {
            copyFileSync(resolve('publish.sh'), join(directory, 'publish.sh'));
            writeFileSync(join(directory, 'package.json'), JSON.stringify({ name: 'release-test', version: '0.7.0' }));
            git('init', '-b', 'main');
            git('config', 'user.name', 'Release Test');
            git('config', 'user.email', 'release-test@example.com');
            git('add', '.');
            git('commit', '-qm', 'chore: baseline');
            git('tag', 'v0.7.0');
            git('commit', '--allow-empty', '-qm', message);
            const head = git('rev-parse', 'HEAD');
            const output = execFileSync('bash', ['publish.sh', '--dry-run'], { cwd: directory, encoding: 'utf8' });
            assert.ok(output.includes('0.7.0 -> ' + expected), output);
            assert.equal(git('rev-parse', 'HEAD'), head);
            assert.equal(git('status', '--porcelain'), '');
            assert.equal(git('tag'), 'v0.7.0');
        } finally {
            rmSync(directory, { recursive: true, force: true });
        }
    });
}
