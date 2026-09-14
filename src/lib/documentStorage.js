import { supabase } from './supabaseClient';

const BUCKET = 'veterinary-documents';

function safeFileName(name) {
  return name.toLowerCase().replace(/[^a-z0-9._-]+/g, '-').replace(/^-+|-+$/g, '') || 'certificate';
}

export async function uploadVeterinaryDocument({ userId, petId, file }) {
  if (!userId) throw new Error('Sign in before submitting a veterinary document.');
  if (!petId || !file) throw new Error('Missing pet or document information.');

  const path = `${userId}/${petId}/${crypto.randomUUID()}-${safeFileName(file.name)}`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: '3600',
    contentType: file.type,
    upsert: false
  });

  if (error) throw new Error('The document could not be uploaded securely. Please try again.');
  return path;
}

export async function getVeterinaryDocumentUrl(path) {
  if (!path) return null;
  const { data, error } = await supabase.storage.from(BUCKET).createSignedUrl(path, 60);
  if (error) throw new Error('The private document link could not be created.');
  return data.signedUrl;
}
