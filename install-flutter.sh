#!/bin/bash

# Exit on error
set -e

echo "--- Installing Flutter SDK ---"
if [ ! -d "flutter" ]; then
  git clone https://github.com/flutter/flutter.git -b stable --depth 1
else
  echo "Flutter already exists, skipping clone..."
fi

# Add flutter to PATH
export PATH="$PATH:`pwd`/flutter/bin"

# Pre-cache and enable web
flutter doctor
flutter config --enable-web

echo "--- Flutter Installation Complete ---"
