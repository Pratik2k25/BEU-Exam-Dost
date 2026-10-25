# Release requirements

- Keep the existing question-bank design. Original PYQs and Important Questions use the same cards and expandable solutions.
- Use strict semantic versions: MAJOR.MINOR.PATCH.
- Before issuing any new app-update or content-update notification, show the user its exact title and body and obtain explicit approval. Approval to publish code does not approve notification wording. If the user declines a notification, publish the requested fixes without issuing it.
- An approved notification must have a unique ID, release version, and timezone-aware ISO issue timestamp captured when it is issued. Preserve its timestamp on subsequent builds and visits. Historical release timestamps must use verified release evidence; do not invent delivery times or different timestamps for events from the same release.
- Add approved notifications to `dist/changelog.js`; omit `historical: true` for new alerts. Notification alerts are delivered once per device independently of dismissal, and remain available on the Notifications page until dismissed.
- Keep source scans in development evidence only. Do not link to, publish, or precache `docs/content-sources/` in the web app.
- Every deployment must generate a new content fingerprint when app or question content changes. Verify the PWA upgrade path in a real browser when changing update logic.

For version 0.5.2, the user explicitly requested publishing the fixes without the proposed notification. Do not issue that card later without fresh approval.
