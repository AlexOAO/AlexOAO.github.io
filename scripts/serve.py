"""Local preview server: python3 scripts/serve.py [port]  (default 8765)

Same as `python3 -m http.server`, but it tells the browser not to keep
old copies, so every reload shows the files as they are on disk.
"""
import functools
import http.server
import os
import sys


class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()


port = int(sys.argv[1]) if len(sys.argv) > 1 else 8765
root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
handler = functools.partial(NoCacheHandler, directory=root)
print(f'Serving {root} at http://localhost:{port}/')
http.server.ThreadingHTTPServer(('', port), handler).serve_forever()
