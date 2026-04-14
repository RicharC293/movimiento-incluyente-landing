#!/usr/bin/env bash
set -e

# ---------------------------------------------------------------------------
# Uso:
#   npm run deploy-rules
#   FIREBASE_PROJECT_ID=my-project npm run deploy-rules
#
# También puedes setear FIREBASE_PROJECT_ID en .env.local y este script
# lo leerá automáticamente.
# ---------------------------------------------------------------------------

# Load .env.local if present
if [ -f "$(dirname "$0")/../.env.local" ]; then
  export $(grep -v '^#' "$(dirname "$0")/../.env.local" | grep 'FIREBASE_PROJECT_ID' | xargs)
fi

echo "Deploying Firebase security rules..."

# Check firebase CLI is installed
if ! command -v firebase &> /dev/null; then
  echo "ERROR: Firebase CLI not found. Install it: npm install -g firebase-tools"
  exit 1
fi

# Resolve project flag
if [ -n "$FIREBASE_PROJECT_ID" ]; then
  PROJECT_FLAG="--project $FIREBASE_PROJECT_ID"
  echo "Project: $FIREBASE_PROJECT_ID"
else
  # Try to read from .firebaserc
  if [ -f ".firebaserc" ]; then
    PROJECT_FLAG=""
    echo "Using project from .firebaserc"
  else
    echo ""
    echo "ERROR: No Firebase project specified."
    echo ""
    echo "Options:"
    echo "  1. Set FIREBASE_PROJECT_ID in .env.local"
    echo "  2. Run: firebase use --add  (creates .firebaserc)"
    echo "  3. Run: FIREBASE_PROJECT_ID=your-project-id npm run deploy-rules"
    echo ""
    echo "Find your project ID at: https://console.firebase.google.com"
    exit 1
  fi
fi

# Deploy Firestore rules + indexes
echo "Deploying Firestore rules and indexes..."
firebase deploy --only firestore $PROJECT_FLAG

# Deploy Storage rules
echo "Deploying Storage rules..."
firebase deploy --only storage $PROJECT_FLAG

echo "Done! Rules deployed successfully."
