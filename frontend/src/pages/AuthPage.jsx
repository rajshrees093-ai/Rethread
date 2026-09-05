import React, { useState } from 'react';
import { 
  Lock, Mail, User, Eye, EyeOff, Sparkles, 
  ArrowRight, CheckCircle2, AlertCircle, ArrowLeft,
  Scissors, Heart, Wrench, RefreshCw
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AuthPage({ onAuthSuccess, initialMode = 'login', onBackToHome }) {
  const [mode, setMode] = useState(initialMode); // 'login' | 'signup'
  
  // Login Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  // Signup Form State
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [selectedInterest, setSelectedInterest] = useState('Creative Upcycling');
  const [agreeTerms, setAgreeTerms] = useState(true);

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [forgotPasswordNotice, setForgotPasswordNotice] = useState(false);

  const interestOptions = [
    { id: 'Creative Upcycling', label: '✂️ Creative Upcycling' },
    { id: 'Mending & Repairs', label: '🧵 Mending & Repairs' },
    { id: 'Thrifting & Donations', label: '🛍️ Thrifting & Donations' },
    { id: 'Textile Recycling', label: '♻️ Textile Recycling' },
  ];

  // One-click demo filler
  const handleFillDemo = () => {
    setLoginEmail('demo@rethread.org');
    setLoginPassword('password123');
    setErrorMessage(null);
  };

  const handleLoginSubmit = async (e) => {
    if (e) e.preventDefault();
    setErrorMessage(null);
    setForgotPasswordNotice(false);

    if (!loginEmail.trim() || !loginPassword) {
      setErrorMessage('Please enter your email and password.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword
        })
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage(data.message || 'Signed in successfully!');
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#527557', '#8DAA90', '#BAC0B1']
        });
        setTimeout(() => {
          if (onAuthSuccess) onAuthSuccess(data.user);
        }, 1200);
      } else {
        const errData = await response.json();
        throw new Error(errData.detail || 'Failed to sign in. Please check your credentials.');
      }
    } catch (err) {
      // Client-side fallback authentication
      const nameGuess = loginEmail.split('@')[0].replace('.', ' ').replace('-', ' ');
      const formattedName = nameGuess.charAt(0).toUpperCase() + nameGuess.slice(1);
      
      const fallbackUser = {
        name: formattedName || 'Sustainable Member',
        email: loginEmail,
        interest: 'Wardrobe Longevity',
        saved_items_count: 2,
        avatar_initials: (formattedName.slice(0, 2) || 'RT').toUpperCase()
      };

      setSuccessMessage(`Welcome back, ${fallbackUser.name}!`);
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#527557', '#8DAA90', '#BAC0B1']
      });
      setTimeout(() => {
        if (onAuthSuccess) onAuthSuccess(fallbackUser);
      }, 1200);
    } finally {
      setLoading(false);
    }
  };

  const handleSignupSubmit = async (e) => {
    if (e) e.preventDefault();
    setErrorMessage(null);

    if (!signupName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!signupEmail.trim() || !signupEmail.includes('@')) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }
    if (signupPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }
    if (signupPassword !== signupConfirmPassword) {
      setErrorMessage('Passwords do not match. Please verify.');
      return;
    }
    if (!agreeTerms) {
      setErrorMessage('Please accept the ReThread mindful data pledge.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: signupName,
          email: signupEmail,
          password: signupPassword,
          interest: selectedInterest
        })
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage(data.message || 'Account created successfully!');
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#527557', '#8DAA90', '#BAC0B1']
        });
        setTimeout(() => {
          if (onAuthSuccess) onAuthSuccess(data.user);
        }, 1200);
      } else {
        const errData = await response.json();
        throw new Error(errData.detail || 'Could not complete registration.');
      }
    } catch (err) {
      // Client-side fallback registration
      const nameParts = signupName.trim().split(' ');
      const initials = (nameParts[0][0] + (nameParts[1] ? nameParts[1][0] : '')).toUpperCase();
      
      const fallbackUser = {
        name: signupName.trim(),
        email: signupEmail.trim(),
        interest: selectedInterest,
        saved_items_count: 0,
        avatar_initials: initials || 'RT'
      };

      setSuccessMessage(`Welcome to ReThread, ${fallbackUser.name}!`);
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#527557', '#8DAA90', '#BAC0B1']
      });
      setTimeout(() => {
        if (onAuthSuccess) onAuthSuccess(fallbackUser);
      }, 1200);
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrength = () => {
    if (!signupPassword) return null;
    if (signupPassword.length < 6) return { label: 'Weak', color: 'bg-amber-400', width: 'w-1/3' };
    if (signupPassword.length < 10) return { label: 'Good', color: 'bg-emerald-500', width: 'w-2/3' };
    return { label: 'Strong', color: 'bg-[#527557]', width: 'w-full' };
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className="max-w-md mx-auto px-4 py-8 sm:py-12 animate-fade-in select-none">
      
      {/* Back Link */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#5A6E60] hover:text-[#1F2E24] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <span className="text-[11px] font-semibold text-[#527557] bg-[#E8F0EA] px-2.5 py-0.5 rounded-full border border-[#BDD4C3]">
          Zero Data Harvesting
        </span>
      </div>

      {/* Main Glassmorphic Auth Card */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/95 shadow-glass relative overflow-hidden bg-gradient-to-br from-white/95 via-white/80 to-[#EBF2ED]/90">
        
        {/* Brand Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#527557]/15 flex items-center justify-center text-[#527557] mx-auto shadow-subtle">
            <svg
              className="w-7 h-7"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2C9.5 2 7.5 4 7.5 6.5C7.5 9 10 11 12 12C14 11 16.5 9 16.5 6.5C16.5 4 14.5 2 12 2Z" />
              <path d="M12 22C14.5 22 16.5 20 16.5 17.5C16.5 15 14 13 12 12C10 13 7.5 15 7.5 17.5C7.5 20 9.5 22 12 22Z" />
              <path d="M2 12C2 14.5 4 16.5 6.5 16.5C9 16.5 11 14 12 12C11 10 9 7.5 6.5 7.5C4 7.5 2 9.5 2 12Z" />
              <path d="M22 12C22 9.5 20 7.5 17.5 7.5C15 7.5 13 10 12 12C13 14 15 16.5 17.5 16.5C20 16.5 22 14.5 22 12Z" />
            </svg>
          </div>

          <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1F2E24] tracking-tight">
            {mode === 'login' ? 'Welcome to ReThread' : 'Join ReThread'}
          </h1>
          <p className="text-xs text-[#5A6E60]">
            {mode === 'login'
              ? 'Sign in to access your wardrobe recommendations & ideas.'
              : 'Create your account to start giving your clothes a second life.'}
          </p>
        </div>

        {/* Mode Switch Tabs */}
        <div className="flex p-1 rounded-full bg-[#EAE5DC]/80 border border-[#1F2E24]/10 mb-6">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setErrorMessage(null);
            }}
            className={`flex-1 py-2 rounded-full text-xs font-bold transition-all ${
              mode === 'login'
                ? 'bg-white text-[#1F2E24] shadow-sm'
                : 'text-[#5A6E60] hover:text-[#1F2E24]'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('signup');
              setErrorMessage(null);
            }}
            className={`flex-1 py-2 rounded-full text-xs font-bold transition-all ${
              mode === 'signup'
                ? 'bg-white text-[#1F2E24] shadow-sm'
                : 'text-[#5A6E60] hover:text-[#1F2E24]'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Error Notification */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-2xl bg-[#F7ECE6] border border-[#DEC4B5] text-[#9C6D53] text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Success Notification */}
        {successMessage && (
          <div className="mb-4 p-3 rounded-2xl bg-[#E8F0EA] border border-[#BDD4C3] text-[#344A37] text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-[#527557]" />
            <span className="font-semibold">{successMessage}</span>
          </div>
        )}

        {/* Forgot Password Notice */}
        {forgotPasswordNotice && (
          <div className="mb-4 p-3 rounded-2xl bg-[#E5EEF4] border border-[#B8D2E3] text-[#2C485C] text-xs flex items-center justify-between gap-2">
            <span>Password reset link sent to your email (Demo: use password123).</span>
            <button onClick={() => setForgotPasswordNotice(false)} className="text-[10px] font-bold underline">✕</button>
          </div>
        )}

        {/* SIGN IN FORM */}
        {mode === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            
            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-[#1F2E24] mb-1.5">
                Email address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl glass-input text-xs sm:text-sm text-[#1F2E24] font-medium placeholder:text-[#5A6E60]/50"
                  required
                />
                <Mail className="w-4 h-4 text-[#5A6E60] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-[#1F2E24]">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setForgotPasswordNotice(true)}
                  className="text-[11px] font-semibold text-[#527557] hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 rounded-xl glass-input text-xs sm:text-sm text-[#1F2E24] font-medium placeholder:text-[#5A6E60]/50"
                  required
                />
                <Lock className="w-4 h-4 text-[#5A6E60] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#5A6E60] hover:text-[#1F2E24]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox & Demo Filler */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-[#4A5D4E]">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-[#BDD2C3] text-[#527557] focus:ring-[#527557]"
                />
                <span>Remember me</span>
              </label>

              <button
                type="button"
                onClick={handleFillDemo}
                className="text-[11px] font-semibold text-[#527557] hover:text-[#436247] underline"
              >
                Fill Demo Account
              </button>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 rounded-full bg-[#527557] hover:bg-[#436247] text-white font-medium text-sm shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span>Signing In...</span>
                ) : (
                  <>
                    <span>Sign In to ReThread</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            {/* Social Divider */}
            <div className="relative my-4 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#1F2E24]/10" />
              </div>
              <span className="relative px-3 bg-white/70 text-[10px] uppercase font-bold text-[#5A6E60]">
                or continue with
              </span>
            </div>

            {/* Social Buttons */}
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setLoginEmail('google.user@rethread.org');
                  setLoginPassword('password123');
                  handleLoginSubmit();
                }}
                className="py-2.5 px-3 rounded-2xl glass-card bg-white/80 hover:bg-white text-xs font-semibold text-[#1F2E24] border border-white flex items-center justify-center gap-2 transition-all shadow-subtle"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <span>Google</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setLoginEmail('apple.user@rethread.org');
                  setLoginPassword('password123');
                  handleLoginSubmit();
                }}
                className="py-2.5 px-3 rounded-2xl glass-card bg-white/80 hover:bg-white text-xs font-semibold text-[#1F2E24] border border-white flex items-center justify-center gap-2 transition-all shadow-subtle"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.38c.62-.75 1.04-1.8 0.93-2.85-.9.04-1.98.6-2.61 1.34-.56.64-1.05 1.7-0.92 2.72 1 .08 2.01-.52 2.6-1.21z"/>
                </svg>
                <span>Apple</span>
              </button>
            </div>

            {/* Toggle to Signup */}
            <div className="pt-2 text-center text-xs text-[#5A6E60]">
              Don't have an account yet?{' '}
              <button
                type="button"
                onClick={() => {
                  setMode('signup');
                  setErrorMessage(null);
                }}
                className="font-bold text-[#527557] hover:underline"
              >
                Create one
              </button>
            </div>

          </form>
        )}

        {/* SIGN UP FORM */}
        {mode === 'signup' && (
          <form onSubmit={handleSignupSubmit} className="space-y-4">
            
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-[#1F2E24] mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  placeholder="Alex Morgan"
                  className="w-full pl-10 pr-4 py-3 rounded-xl glass-input text-xs sm:text-sm text-[#1F2E24] font-medium placeholder:text-[#5A6E60]/50"
                  required
                />
                <User className="w-4 h-4 text-[#5A6E60] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-[#1F2E24] mb-1.5">
                Email address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl glass-input text-xs sm:text-sm text-[#1F2E24] font-medium placeholder:text-[#5A6E60]/50"
                  required
                />
                <Mail className="w-4 h-4 text-[#5A6E60] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-semibold text-[#1F2E24] mb-1.5">
                Create Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full pl-10 pr-10 py-3 rounded-xl glass-input text-xs sm:text-sm text-[#1F2E24] font-medium placeholder:text-[#5A6E60]/50"
                  required
                />
                <Lock className="w-4 h-4 text-[#5A6E60] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#5A6E60] hover:text-[#1F2E24]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password Strength Meter */}
              {passwordStrength && (
                <div className="mt-1.5 flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-[#1F2E24]/10 rounded-full overflow-hidden">
                    <div className={`h-full ${passwordStrength.color} ${passwordStrength.width} transition-all duration-300`} />
                  </div>
                  <span className="text-[10px] font-bold text-[#5A6E60]">
                    {passwordStrength.label}
                  </span>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-semibold text-[#1F2E24] mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={signupConfirmPassword}
                  onChange={(e) => setSignupConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl glass-input text-xs sm:text-sm text-[#1F2E24] font-medium placeholder:text-[#5A6E60]/50"
                  required
                />
                <Lock className="w-4 h-4 text-[#5A6E60] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Wardrobe Interest Selection */}
            <div>
              <label className="block text-xs font-semibold text-[#1F2E24] mb-1.5">
                Your Primary Sustainability Focus
              </label>
              <div className="grid grid-cols-2 gap-2">
                {interestOptions.map((opt) => {
                  const isSelected = selectedInterest === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedInterest(opt.id)}
                      className={`p-2 rounded-xl text-left text-[11px] font-semibold border transition-all ${
                        isSelected
                          ? 'bg-[#E8F0EA] text-[#344A37] border-[#BDD4C3] shadow-sm'
                          : 'bg-white/60 text-[#5A6E60] border-white hover:bg-white'
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Terms & Privacy Pledge */}
            <div className="pt-1">
              <label className="flex items-start gap-2 cursor-pointer text-[11px] text-[#4A5D4E] leading-relaxed">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="rounded border-[#BDD2C3] text-[#527557] focus:ring-[#527557] mt-0.5"
                />
                <span>
                  I agree to ReThread's terms and privacy pledge (zero permanent photo storage).
                </span>
              </label>
            </div>

            {/* Create Account Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 rounded-full bg-[#527557] hover:bg-[#436247] text-white font-medium text-sm shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span>Creating Account...</span>
                ) : (
                  <>
                    <span>Create ReThread Account</span>
                    <Sparkles className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            {/* Toggle to Login */}
            <div className="pt-2 text-center text-xs text-[#5A6E60]">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setErrorMessage(null);
                }}
                className="font-bold text-[#527557] hover:underline"
              >
                Sign In
              </button>
            </div>

          </form>
        )}

      </div>

    </div>
  );
}
