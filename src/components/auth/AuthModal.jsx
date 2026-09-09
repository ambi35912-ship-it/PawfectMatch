import React, { useState } from 'react';
import {
  X,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Dog
} from 'lucide-react';
import { signInWithEmail, signUpWithEmail, sendPasswordReset } from '../../lib/authService';

export default function AuthModal({ isOpen, onClose, onAuthSuccess, onGuestContinue }) {
  if (!isOpen) return null;

  const [mode, setMode] = useState('signin'); // 'signin' | 'signup' | 'forgot'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [petName, setPetName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const resetForm = () => {
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleModeChange = (newMode) => {
    resetForm();
    setMode(newMode);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    resetForm();

    if (!email || (!password && mode !== 'forgot')) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    setIsLoading(true);

    if (mode === 'signin') {
      const result = await signInWithEmail(email, password);
      setIsLoading(false);

      if (!result.success) {
        setErrorMessage(result.error);
      } else {
        setSuccessMessage('Signed in successfully! Welcome back.');
        setTimeout(() => {
          onAuthSuccess(result.user);
          onClose();
        }, 600);
      }
    } else if (mode === 'signup') {
      if (password.length < 6) {
        setIsLoading(false);
        setErrorMessage('Password must be at least 6 characters long.');
        return;
      }

      const result = await signUpWithEmail(email, password, {
        ownerName: ownerName || 'Pet Parent',
        petName: petName || 'My Pup'
      });
      setIsLoading(false);

      if (!result.success) {
        setErrorMessage(result.error);
      } else {
        if (result.needsEmailConfirmation) {
          setSuccessMessage('Registration successful! Please check your email inbox to confirm your account.');
        } else {
          setSuccessMessage('Account created! Welcome to Pawfect Match.');
          setTimeout(() => {
            onAuthSuccess(result.user);
            onClose();
          }, 700);
        }
      }
    } else if (mode === 'forgot') {
      const result = await sendPasswordReset(email);
      setIsLoading(false);

      if (!result.success) {
        setErrorMessage(result.error);
      } else {
        setSuccessMessage('Password reset instructions sent! Please check your email.');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/70 backdrop-blur-sm p-0 sm:p-4">
      <div className="w-full max-w-md bg-white rounded-t-[36px] sm:rounded-[36px] overflow-hidden shadow-2xl border border-warm-100 max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="relative p-5 pb-3 border-b border-warm-100 flex items-center justify-between bg-warm-50/60">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-coral-500 via-coral-400 to-amber-400 flex items-center justify-center text-white font-black text-lg shadow-md shadow-coral-500/20">
              🐾
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-base font-black text-slate-900 tracking-tight">
                  Pawfect Match
                </h2>
                <span className="px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold flex items-center gap-0.5 border border-emerald-300/60">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  Supabase Auth
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {mode === 'signup'
                  ? 'Join the community of verified pet parents'
                  : mode === 'forgot'
                  ? 'Reset your account password'
                  : 'Sign in to access your pets & playdates'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-warm-100 hover:bg-warm-200 text-slate-600 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mode Switcher Tabs */}
        {mode !== 'forgot' && (
          <div className="p-4 pb-0">
            <div className="flex p-1 rounded-2xl bg-warm-100 border border-warm-200/70">
              <button
                type="button"
                onClick={() => handleModeChange('signin')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                  mode === 'signin'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => handleModeChange('signup')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                  mode === 'signup'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Create Account
              </button>
            </div>
          </div>
        )}

        {/* Scrollable Form Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 no-scrollbar">
          
          {/* Status Messages */}
          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-rose-800 text-xs">
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <div className="flex-1 font-semibold">{errorMessage}</div>
            </div>
          )}

          {successMessage && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-2.5 text-emerald-800 text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="flex-1 font-semibold">{successMessage}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Sign Up Specific: Owner Name & Pet Name */}
            {mode === 'signup' && (
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Your Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Claire Vance"
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-warm-50/70 border border-warm-200 text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-coral-500/30"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Pet Name</label>
                  <div className="relative">
                    <Dog className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Luna"
                      value={petName}
                      onChange={(e) => setPetName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-warm-50/70 border border-warm-200 text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-coral-500/30"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Email Address */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="parent@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-warm-50/70 border border-warm-200 text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-coral-500/30"
                />
              </div>
            </div>

            {/* Password (for signin and signup) */}
            {mode !== 'forgot' && (
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700">Password</label>
                  {mode === 'signin' && (
                    <button
                      type="button"
                      onClick={() => handleModeChange('forgot')}
                      className="text-[11px] font-bold text-coral-600 hover:text-coral-700"
                    >
                      Forgot?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-warm-50/70 border border-warm-200 text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-coral-500/30"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
                {mode === 'signup' && (
                  <p className="text-[10px] text-slate-500 pl-1">
                    Minimum 6 characters with letters or numbers
                  </p>
                )}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 px-4 rounded-2xl bg-coral-500 hover:bg-coral-600 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md shadow-coral-500/25 transition-all active:scale-98 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Connecting to Supabase...</span>
                </>
              ) : mode === 'signin' ? (
                <>
                  <span>Sign In with Supabase</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              ) : mode === 'signup' ? (
                <>
                  <span>Create Supabase Account</span>
                  <Sparkles className="w-4 h-4" />
                </>
              ) : (
                <span>Send Reset Link</span>
              )}
            </button>
          </form>

          {mode === 'forgot' && (
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => handleModeChange('signin')}
                className="text-xs font-bold text-slate-600 hover:text-slate-900"
              >
                ← Back to Sign In
              </button>
            </div>
          )}

          {/* Divider */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-warm-200"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase font-black text-slate-400">
              <span className="bg-white px-3">or</span>
            </div>
          </div>

          {/* Continue as Guest */}
          <button
            type="button"
            onClick={() => {
              onGuestContinue?.();
              onClose();
            }}
            className="w-full py-2.5 px-4 rounded-2xl bg-warm-100 hover:bg-warm-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>Continue in Guest / Demo Mode</span>
          </button>

          <p className="text-[10px] text-center text-slate-400">
            Guest mode provides instant access to matching, playdate scheduling, and the health dashboard without creating an account.
          </p>

        </div>

      </div>
    </div>
  );
}
