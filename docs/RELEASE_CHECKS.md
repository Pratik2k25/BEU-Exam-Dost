# Release validation

The app uses Node 24.x for GitHub Actions and Vercel builds. From a clean checkout:

```sh
npm ci
npm run build:verified
```

`build:verified` runs `validate` before the existing build. Validation runs syntax checks, version consistency, generated-question-content freshness, and the full test suite, in that order. Any failure blocks the build. GitHub Actions installs locked dependencies first; Vercel uses the same verified build command.

`npm run build:content` remains an explicit authoring operation. Commit regenerated solution modules when changing authored content; deployment must reject stale modules rather than rewrite them silently. Generated solution modules use LF line endings; retain their committed form when checking out on Windows.

`package.json`, `dist/app-meta.js`, and both the top-level and `packages[""].version` fields in `package-lock.json` must agree. Use `node scripts/check-version.mjs --set MAJOR.MINOR.PATCH` or `--bump patch|minor|major`; lockfile dependency records remain unchanged. Versions reject suffixes, whitespace, and leading zeroes. Existing optional HTML version metadata handling is retained.

Version 0.8.1 repairs the missing CI dependency installation, shares validation with Vercel, and synchronizes version metadata. It also restores the mobile Quiz button's selected state: either desktop quiz mode activates the shared mobile Quiz item, while desktop mode selection remains distinct. It changes no study content, storage/sync formats, or service-worker update logic. It adds no notification and preserves existing notification timestamps.

Before merging a release PR, require a successful GitHub check and READY app/landing previews. After deployment, verify the public pages, release version/commit/fingerprint, database health, unauthenticated sync rejection, PWA shell resources, and development-scan exclusion. Verify browser upgrade/state retention and fresh startup. Record exact evidence in the project work log. Do not run database migrations or submit support requests as part of these checks.
