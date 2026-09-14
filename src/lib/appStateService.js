import { supabase } from './supabaseClient';

const STORAGE_KEY = 'pawfect-match:app-state:v1';

function storageKey(userId) {
  return userId ? `${STORAGE_KEY}:${userId}` : `${STORAGE_KEY}:guest`;
}

function readLocal(userId) {
  try {
    const value = window.localStorage.getItem(storageKey(userId));
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

function writeLocal(userId, state) {
  try {
    window.localStorage.setItem(storageKey(userId), JSON.stringify(state));
  } catch {
    // Storage may be unavailable or full. Remote persistence can still succeed.
  }
}

export async function loadAppState(userId) {
  const localState = readLocal(userId);
  if (!userId) return { state: localState, source: localState ? 'local' : 'default' };

  const { data, error } = await supabase
    .from('user_app_state')
    .select('state')
    .eq('user_id', userId)
    .maybeSingle();

  if (error) {
    console.warn('Remote profile state is unavailable; using local state.');
    return { state: localState, source: localState ? 'local' : 'default', error };
  }

  return { state: data?.state || localState, source: data?.state ? 'remote' : localState ? 'local' : 'default' };
}

export async function saveAppState(userId, state) {
  writeLocal(userId, state);
  if (!userId) return { source: 'local' };

  const { error } = await supabase
    .from('user_app_state')
    .upsert({ user_id: userId, state, updated_at: new Date().toISOString() });

  if (error) throw error;
  return { source: 'remote' };
}

export { STORAGE_KEY };
