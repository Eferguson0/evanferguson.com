#!/usr/bin/env bash
# Rebuild the Relay landing page and install it at /relay.
#
#   ./tools/build-relay.sh [path-to-relay-landing-source]
#
# Defaults to the sibling checkout. The source is a Next.js app configured for
# static export; NEXT_BASE_PATH/NEXT_PUBLIC_BASE_PATH make it resolve under
# /relay instead of the domain root.

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="${1:-$ROOT/relay-landing copy}"

[ -d "$SRC" ] || { echo "no Relay source at: $SRC" >&2; exit 1; }

cd "$SRC"
NEXT_BASE_PATH=/relay NEXT_PUBLIC_BASE_PATH=/relay pnpm build

rm -rf "$ROOT/relay"
cp -R "$SRC/out" "$ROOT/relay"
echo "installed $(du -sh "$ROOT/relay" | cut -f1) at /relay"
