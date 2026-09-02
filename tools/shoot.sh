#!/usr/bin/env bash
# Capture a website preview for the timeline.
#
#   ./tools/shoot.sh https://example.com my-project
#
# Writes assets/previews/my-project.png at 1440x900, which is the aspect the
# preview cards are cropped to. Then set  preview: "assets/previews/my-project.png"
# on that entry in assets/projects.js.

set -euo pipefail

URL="${1:?usage: shoot.sh <url> <slug> [crop-y]}"
SLUG="${2:?usage: shoot.sh <url> <slug> [crop-y]}"
# Optional third arg: capture a tall page, then crop a 1440x900 band starting
# this many pixels down. Use it when a site's hero is mostly whitespace and a
# section further down makes a better card.
CROP_Y="${3:-}"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
OUT="$(cd "$(dirname "$0")/.." && pwd)/assets/previews/${SLUG}.png"

[ -x "$CHROME" ] || { echo "Chrome not found at $CHROME" >&2; exit 1; }

# --timeout waits in real time. --virtual-time-budget fires too early on
# JS-heavy pages (Next/React), producing a blank capture.
HEIGHT=900
# Capture extra headroom below the band: sips refuses the crop when the
# rect ends exactly at the image edge.
[ -n "$CROP_Y" ] && HEIGHT=$((CROP_Y + 1200))

"$CHROME" --headless --disable-gpu --hide-scrollbars \
  --timeout="${SHOOT_WAIT_MS:-12000}" \
  --window-size=1440,"$HEIGHT" \
  --screenshot="$OUT" "$URL" >/dev/null 2>&1

[ -s "$OUT" ] || { echo "capture failed for $URL" >&2; exit 1; }

if [ -n "$CROP_Y" ]; then
  sips -c 900 1440 --cropOffset "$CROP_Y" 0 "$OUT" >/dev/null
  echo "wrote assets/previews/${SLUG}.png (cropped from y=${CROP_Y})"
else
  echo "wrote assets/previews/${SLUG}.png"
fi
