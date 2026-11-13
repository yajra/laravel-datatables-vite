# Laravel, DataTables, Bootstrap and Vite

Get started with Laravel, DataTables, Bootstrap and Vite in a few minutes.

## Installation

`npm i laravel-datatables-vite --save-dev`

## Setup

Add the following to your `resources/js/app.js` file:

```js
import 'laravel-datatables-vite';
```

Add the following to your `resources/sass/app.scss` file:

```css
@import "bootstrap-icons/font/bootstrap-icons.min.css";
@import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
@import "datatables.net-buttons-bs5/css/buttons.bootstrap5.min.css";
@import "datatables.net-select-bs5/css/select.bootstrap5.min.css";
```

## Migrating to 1.x

DataTables 3.1.5 or later is required. This includes the upstream fix for HTTP 204 (No Content), so successful single-row and batch Ajax actions invoke `onSuccess` and redraw the table even when the response body is empty.

Ajax actions now use `DataTable.ajax` rather than jQuery's Ajax transport. Move application-wide request headers from `$.ajaxSetup()` to `DataTable.ajax.defaults.headers`. For Laravel, add the CSRF token to the page:

```html
<meta name="csrf-token" content="{{ csrf_token() }}">
```

Then configure the headers after importing the package, before initializing tables or invoking Ajax buttons:

```js
import 'laravel-datatables-vite';

DataTable.ajax.defaults.headers = {
    ...DataTable.ajax.defaults.headers,
    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
};
```

This applies to both `ajax` and `ajaxBatch` buttons, including applications that still use jQuery. CSRF token configuration remains the application's responsibility.

If your application uses jQuery, install and register it explicitly before initializing tables:

```js
import jQuery from 'jquery';
import 'laravel-datatables-vite';

DataTable.use(jQuery);
```

## Quick Starter

A [quick starter guide](https://yajrabox.com/docs/laravel-datatables/quick-starter) is available at the official package docs.

## Release lines

- `main` contains the current stable release line, starting with 1.x and DataTables 3. jQuery is no longer supplied by this package; applications that use jQuery must install and import it explicitly.
- `develop` is the integration branch for changes targeting `main`.
- `0.x` maintains the legacy DataTables 1/2 integration. Install it with `npm i laravel-datatables-vite@0 --save-dev`. Backport compatible fixes to this branch; do not merge the DataTables 3 upgrade into it.

### Preparing 1.0

The existing `0.x` branch preserves `v0.7.0`. Merge `develop` into `main` after the checks pass. Use the Conventional Commit PR title `feat!: release 1.0.0` and include this footer in the final merge or squash commit:

```text
BREAKING CHANGE: Requires DataTables 3 and no longer supplies jQuery.
```

The standard commit analyzer uses the `BREAKING CHANGE` footer to select `v1.0.0`. The existing feature commits alone would select `v0.8.0`; ensure the footer is retained in the final commit on `main`.

### GitHub releases

The Semantic Releases workflow checks pull requests to `main`, `develop`, and `0.x`. Pushes to `main` or `0.x` run the checks before semantic-release creates a version tag, updates `CHANGELOG.md` and `package.json`, and creates a GitHub release. `develop` does not publish releases. The npm plugin bundled with semantic-release updates the package version with npm publishing disabled.

For a preview, select **Actions → Semantic Releases → Run workflow**, choose `main` or `0.x`, and leave `dry_run` enabled. Manual runs on other branches do not release. The workflow uses `GITHUB_TOKEN`, with an optional `GH_TOKEN` secret override if repository rules require it.

The release configuration, workflow, check scripts, tests, and package scripts must also be merged into `0.x` before its next release, preserving that branch's legacy dependencies and source files. Release `1.0.0` on `main` before the first automated maintenance release. Its release range is `0.7.x` and its channel is `0.x`. This supports patches to the existing legacy release. A literal `0.x` range is not used because semantic-release 24 calculates its lower bound as `1.0.0`, blocking maintenance releases. If a new legacy minor line is needed, update the range explicitly before releasing it.

### npm publishing

GitHub releases and npm publishing are separate. After the GitHub release completes, check out its generated tag, verify the package version, and publish that exact version:

```sh
# Current stable release (1.x or later)
npm publish --tag latest

# Legacy 0.x maintenance release
npm publish --tag legacy-0
```

Use the `legacy-0` npm tag to keep 0.x from replacing npm's `latest`. Do not run `publish.sh` after an automated GitHub release: it creates another version and tag. That script remains available for the separate manual release process.
