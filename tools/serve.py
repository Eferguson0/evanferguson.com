#!/usr/bin/env python3
"""Local preview server that never caches.

python -m http.server sends no Cache-Control, so browsers apply heuristic
caching and keep serving a stale projects.js after an edit. This sends
no-store on everything so a plain reload always shows current files.

    ./tools/serve.py [port]
"""
import sys
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


class NoCacheHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

    def log_message(self, *args):
        pass


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8412
    root = __file__.rsplit("/", 2)[0]
    handler = partial(NoCacheHandler, directory=root)
    print(f"serving {root} on http://localhost:{port} (no-cache)")
    ThreadingHTTPServer(("127.0.0.1", port), handler).serve_forever()
