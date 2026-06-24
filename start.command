#!/bin/bash
# Double-click this file to launch the TuxMat Capsule launch site.
# It starts a small local web server, then opens it in your browser.

cd "$(dirname "$0")" || exit 1

# Use the local Node that was installed for this project.
export PATH="$HOME/.local/node/node-v20.18.0-darwin-arm64/bin:$PATH"

if ! command -v node >/dev/null 2>&1; then
  echo "Could not find Node.js. Please install it from https://nodejs.org and try again."
  read -r -p "Press Return to close..." _
  exit 1
fi

# First-time setup: install dependencies if missing.
if [ ! -d node_modules ]; then
  echo "First-time setup — installing dependencies (one minute)..."
  npm install
fi

echo ""
echo "============================================================"
echo "  TuxMat Capsule launch site is starting..."
echo "  It will open in your browser at:  http://localhost:5173"
echo ""
echo "  Leave this window open while presenting."
echo "  To stop the site: close this window (or press Ctrl + C)."
echo "============================================================"
echo ""

# Open the browser a few seconds after the server boots.
( sleep 4; open "http://localhost:5173" ) &

# Start the server (stays running in this window).
npm run dev
