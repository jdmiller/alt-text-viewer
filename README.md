# Alt text viewer

A bookmarklet, and a Chrome extension with similar logic, that overlays every meaningful image on a page with its alt text, so you can read and check alt text without opening dev tools.

## Why

Checking alt text normally means inspecting images one at a time, or running a scanner that gives a list rather than showing the image next to its text. Reviewers and authors need both together, on the live page, including in web apps where images load dynamically.

## What it does

When you click it, each image gets an overlay on top of itself:

- **Dark overlay** with the alt text, when alt text is present.
- **Red overlay** reading "Missing alt text" when the `alt` attribute is absent, or "(suspected)" when it is empty on an image that doesn't look decorative.
- **EXPAND** opens a larger panel with the full alt text and file name. **HIDE** removes that overlay.

To keep the noise down, both versions skip tiny images and treat small images with empty alt as decorative. The extension skips images under 20 px, and leaves alone empty-alt images that are 200 px or smaller or whose file name, class or id contains a word like "icon", "divider" or "logo". The bookmarklet uses its own thresholds (5 px minimum, 150 px for small) and keyword list, and skips keyword matches outright. Clicking again clears old overlays and refreshes. The extension runs in all frames, which helps with embedded apps.

These heuristics are a convenience for review, not a verdict. A genuinely decorative image can be flagged, and poor alt text still shows as present.

## Install

**Bookmarklet:** open `bookmarklet/install.html` in a browser and drag the button onto the bookmarks bar.

**Chrome extension:** open `chrome://extensions`, turn on Developer mode, choose "Load unpacked" and select the `extension/` folder. Click the toolbar button on a page to run it. It requests only `activeTab` and `scripting`, so it runs only on the tab where you click.

## Known limits

- The two versions have separate code and have drifted: see the thresholds above. `extension/content.js` is the readable one.
- The extension has no toolbar icon yet.
- It looks only at `<img>` elements. CSS background images, canvas and similar are not covered, and neither are images inside shadow DOM.

## Licence

MIT. See [LICENSE](LICENSE).
