# Maintenance branch

This branch serves the BEU Exam Dost maintenance experience at the root path.

- The page replaces only `dist/index.html` on this branch; `main` remains unchanged.
- Desktop and mobile are one responsive page using the repository's Outfit font and horizontal brand logo.
- The existing generated static build copies this page into `build/` and updates the offline shell fingerprint.
- The maintenance page registers the existing service worker so the page can be installed and cached as a PWA.
- LinkedIn and email use the official destinations already present in the project.
- The WhatsApp Channel card is intentionally inactive until its official channel URL is configured.
- No countdown, downtime estimate, or promised return time is displayed.

To change the contact channel, add the verified URL to the WhatsApp card in `dist/index.html` and change the descriptive label from “Official channel link coming soon”.
