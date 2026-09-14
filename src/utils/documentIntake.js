const ACCEPTED_TYPES = new Set([
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp'
]);

const MAX_FILE_SIZE = 10 * 1024 * 1024;

async function sha256(file) {
  if (!globalThis.crypto?.subtle) return null;
  const digest = await globalThis.crypto.subtle.digest('SHA-256', await file.arrayBuffer());
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Validates and fingerprints a veterinary document before it is submitted for
 * human review. This deliberately does not claim to verify medical records.
 */
export async function prepareVeterinaryDocument(file, onProgress) {
  if (!file) throw new Error('Choose a certificate file first.');
  if (!ACCEPTED_TYPES.has(file.type)) {
    throw new Error('Upload a PDF, JPEG, PNG, or WebP certificate.');
  }
  if (file.size <= 0 || file.size > MAX_FILE_SIZE) {
    throw new Error('Certificate files must be between 1 byte and 10 MB.');
  }

  onProgress?.({ stage: 1, message: 'Validating file type and size…', percent: 30 });
  const checksum = await sha256(file);
  onProgress?.({ stage: 2, message: 'Creating a tamper-evident document fingerprint…', percent: 75 });

  const result = {
    success: true,
    reviewStatus: 'pending',
    checksum,
    mimeType: file.type,
    size: file.size,
    receivedAt: new Date().toISOString(),
    message: 'Document accepted. A qualified reviewer must verify its contents.'
  };

  onProgress?.({ stage: 3, message: 'Ready for veterinary review', percent: 100, result });
  return result;
}

export { ACCEPTED_TYPES, MAX_FILE_SIZE };
