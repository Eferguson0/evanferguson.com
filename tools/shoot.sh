#!/usr/bin/env bash
# Capture a website preview for the timeline.
#
#   ./tools/shoot.sh https://example.com my-project
#
# Writes assets/previews/my-project.png at 1440x900, which is the aspect the
# preview cards are cropped to. Then set  preview: "assets/previews/my-project.png"
# on that entry in assets/projects.js.

set -euo pipefail

URL="${1:?usage: shoot.sh <url> <slug>}"
SLUG="${2:?usage: shoot.sh <url> <slug>}"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
OUT="$(cd "$(dirname "$0")/.." && pwd)/assets/previews/${SLUG}.png"

[ -x "$CHROME" ] || { echo "Chrome not found at $CHROME" >&2; exit 1; }

"$CHROME" --headless --disable-gpu --hide-scrollbars \
  --virtual-time-budget=6000 \
  --window-size=1440,900 \
  --screenshot="$OUT" "$URL" >/dev/null 2>&1

[ -s "$OUT" ] || { echo "capture failed for $URL" >&2; exit 1; }
echo "wrote assets/previews/${SLUG}.png"
