#!/bin/bash

# Ensure the necessary binaries have execute permissions
chmod +x ./node_modules/.bin/vite
chmod +x ./node_modules/.bin/cross-env

# Run the build command
npm run build