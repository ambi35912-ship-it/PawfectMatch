import { supabase } from './supabaseClient';

/**
 * Friendly error parser for Supabase Auth errors
 */
export function formatAuthError(error) {
  if (!error) return 'An unknown error occurred.';
  const msg = error.message || '';
  
  if (msg.includes('Invalid login credentials')) {
    return 'Invalid email or password. Please double check your credentials.';
  }
  if (msg.includes('Email not confirmed')) {
    return 'Please check your inbox to confirm your email address before signing in.';
  }
  if (msg.includes('User already registered')) {
    return 'An account with this email address already exists. Please sign in instead.';
  }
  if (msg.includes('Password should be at least')) {
    return 'Password must be at least 6 characters long.';
  }
  if (msg.includes('rate limit')) {
    return 'Too many requests. Please wait a moment and try again.';
  }
  return msg;
}

/**
 * Sign up a new user with email and password
 */
export async function signUpWithEmail(email, password, { ownerName = '', petName = '' } = {}) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: {
          ownerName: ownerName.trim() || 'Pet Parent',
          petName: petName.trim() || 'My Pup'
        }
      }
    });

    if (error) {
      return { success: false, error: formatAuthError(error), rawError: error };
    }

    return {
      success: true,
      user: data.user,
      session: data.session,
      needsEmailConfirmation: !data.session && !!data.user
    };
  } catch (err) {
    return { success: false, error: formatAuthError(err), rawError: err };
  }
}

/**
 * Sign in an existing user with email and password
 */
export async function signInWithEmail(email, password) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password
    });

    if (error) {
      return { success: false, error: formatAuthError(error), rawError: error };
    }

    return {
      success: true,
      user: data.user,
      session: data.session
    };
  } catch (err) {
    return { success: false, error: formatAuthError(err), rawError: err };
  }
}

/**
 * Sign out the currently authenticated user
 */
export async function signOutUser() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      return { success: false, error: formatAuthError(error) };
    }
    return { success: true };
  } catch (err) {
    return { success: false, error: formatAuthError(err) };
  }
}

/**
 * Send password reset email
 */
export async function sendPasswordReset(email) {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: window.location.origin
    });

    if (error) {
      return { success: false, error: formatAuthError(error) };
    }
    return { success: true };
  } catch (err) {
    return { success: false, error: formatAuthError(err) };
  }
}

/**
 * Get current session
 */
export async function getCurrentSession() {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) return null;
    return data.session;
  } catch {
    return null;
  }
}
