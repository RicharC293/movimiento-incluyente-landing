/**
 * Script to create the initial admin user in Firebase Auth.
 * Usage: npm run create-admin
 *
 * Reads vars from .env.local automatically. Also accepts inline env vars:
 *   ADMIN_EMAIL=admin@mi.ec ADMIN_PASSWORD=securepass npm run create-admin
 *
 * Required in .env.local:
 *   FIREBASE_PROJECT_ID
 *   FIREBASE_CLIENT_EMAIL
 *   FIREBASE_PRIVATE_KEY
 *   ADMIN_EMAIL
 *   ADMIN_PASSWORD
 */

import { readFileSync } from 'fs'
import { resolve } from 'path'
import * as admin from 'firebase-admin'

// Load .env.local before reading process.env
const envPath = resolve(process.cwd(), '.env.local')
try {
  const lines = readFileSync(envPath, 'utf-8').split('\n')
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const [key, ...rest] = trimmed.split('=')
    const value = rest.join('=').trim()
    if (key && !(key in process.env)) {
      process.env[key.trim()] = value
    }
  }
} catch {
  // .env.local not found — rely on env vars passed directly
}

const {
  FIREBASE_PROJECT_ID,
  FIREBASE_CLIENT_EMAIL,
  FIREBASE_PRIVATE_KEY,
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
} = process.env

if (!FIREBASE_PROJECT_ID || !FIREBASE_CLIENT_EMAIL || !FIREBASE_PRIVATE_KEY) {
  console.error('❌ Missing Firebase Admin SDK env vars.')
  console.error('   Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY')
  process.exit(1)
}

if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
  console.error('❌ Missing ADMIN_EMAIL or ADMIN_PASSWORD env vars.')
  console.error('   Example: ADMIN_EMAIL=admin@mi.ec ADMIN_PASSWORD=securepass npm run create-admin')
  process.exit(1)
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: FIREBASE_PROJECT_ID,
      clientEmail: FIREBASE_CLIENT_EMAIL,
      privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
  })
}

async function createAdmin() {
  try {
    // Check if user already exists
    try {
      const existing = await admin.auth().getUserByEmail(ADMIN_EMAIL!)
      console.log(`⚠️  User already exists: ${existing.email} (uid: ${existing.uid})`)
      console.log('   No changes made.')
      process.exit(0)
    } catch {
      // User doesn't exist — create it
    }

    const user = await admin.auth().createUser({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      displayName: 'Administrador Movimiento Incluyente',
    })

    console.log(`✅ Admin user created successfully!`)
    console.log(`   Email: ${user.email}`)
    console.log(`   UID:   ${user.uid}`)
    console.log(`\n   You can now log in at /admin/login`)
  } catch (err) {
    console.error('❌ Error creating admin user:', err)
    process.exit(1)
  }
}

createAdmin()
