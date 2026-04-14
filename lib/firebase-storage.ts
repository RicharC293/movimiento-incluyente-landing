'use client'
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { clientStorage } from './firebase-client'

export type StorageFolder = 'equipo' | 'cantones' | 'galeria' | 'documentos' | 'historia'

/**
 * Upload a file to Firebase Storage and return the download URL.
 */
export async function uploadFile(
  folder: StorageFolder,
  file: File,
  filename?: string
): Promise<string> {
  const name = filename ?? `${Date.now()}-${file.name}`
  const storageRef = ref(clientStorage, `${folder}/${name}`)
  await uploadBytes(storageRef, file)
  return getDownloadURL(storageRef)
}

/**
 * Delete a file by its full Storage path (e.g. "equipo/foo.jpg").
 */
export async function deleteFile(path: string): Promise<void> {
  const storageRef = ref(clientStorage, path)
  await deleteObject(storageRef)
}

/**
 * Extract the Storage path from a full download URL.
 * Useful when you need to delete a file given its URL.
 */
export function urlToPath(url: string): string {
  const decoded = decodeURIComponent(url)
  const match = decoded.match(/\/o\/(.+?)\?/)
  return match ? match[1] : ''
}
