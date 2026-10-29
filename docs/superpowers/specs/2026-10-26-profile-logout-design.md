# Profile logout and data erasure

## Approved behavior

Provide a clearly labeled logout action on both mobile and desktop profile pages. Logging out is destructive and must require a clear confirmation that explains the scope before proceeding.

- On desktop, log out this desktop only: revoke its device credential, clear its local profile/study snapshot and cached profile, and return to the welcome screen. Keep the primary mobile profile and cloud snapshot intact so the desktop can be paired again.
- On the primary mobile device, log out and erase the profile: delete its local profile/study snapshot and cached profile, delete the encrypted cloud snapshot/account, revoke linked devices through account deletion, and return to the normal app entry point.
- Linked desktops that are offline cannot be erased remotely at that instant. Their next authenticated sync must fail because the account/device was deleted, then clear their local profile and sync key and return to the welcome screen.
- If mobile has no sync account, erase only its local profile and cached profile. If a linked mobile device cannot reach the service, do not claim that cloud/linked-device data was erased; show an actionable error and preserve local data until the full erase can complete.

## UI and interaction

Keep the existing profile and linked-device settings design. Put the logout action within the existing connection/settings section on each platform. Use a destructive button and a confirmation dialog. Desktop wording must communicate that only this desktop is disconnected; mobile wording must communicate that the primary profile, local data, cloud copy, and linked-device access are erased. Do not offer device management on desktop.

## Implementation boundaries

Reuse the existing `logoutDevice()` API action for desktop-specific revocation and `deleteAccount()` for primary-mobile account deletion. The server account deletion already cascades to linked device records. Do not change pairing, sync format, version, notifications, or deployment behavior.

## Verification

Add regression tests for both platform actions and destructive scopes. Verify existing sync-client/API tests, full test suite, checks, and production build. Browser-check if an available local browser session allows confirming the two profile variants and confirmation copy. Do not deploy as part of this change.
