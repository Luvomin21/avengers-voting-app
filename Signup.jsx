import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Lock, ShieldCheck, AlertCircle, ArrowRight } from 'lucide-react';
import FaceCamera from '../components/FaceCamera';
import { signupApi } from '../services/api';

const Signup = () => {
  const navigate = useNavigate();

  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [faceData, setFaceData] = useState(null); // { photo, descriptor }

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const handleFaceCaptured = (captured) => {
    setFaceData(captured);
    setErrorMsg(null);
  };

  const handleClearFace = () => {
    setFaceData(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!userId || !password || !confirmPassword) {
      setErrorMsg('Please fill in all input fields.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match. Please re-enter passwords.');
      return;
    }

    if (!faceData || !faceData.descriptor) {
      setErrorMsg('Face capture required! Please click "Capture Face" using your webcam.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await signupApi({
        userId,
        password,
        faceDescriptor: faceData.descriptor,
        profilePhoto: faceData.photo
      });

      if (res.success) {
        setSuccessMsg('Registration successful ✓ Redirecting to Login & Face Verification...');
        setTimeout(() => {
          navigate('/login', { state: { registeredUserId: userId } });
        }, 1500);
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Registration failed.';
      setErrorMsg(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg glass-panel rounded-2xl p-8 border-2 border-cyan-500/30 shadow-2xl shadow-cyan-950/80 space-y-6"
      >
        {/* Page Title Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center space-x-2 bg-red-600/20 border border-red-500/40 px-3 py-1 rounded-full text-xs font-mono font-bold text-red-400 uppercase tracking-widest">
            <span>AVENGERS ELECTION REGISTRATION</span>
          </div>
          <h2 className="font-orbitron font-black text-3xl text-white tracking-wider">
            REGISTER VOTER
          </h2>
          <p className="text-xs text-slate-400 font-mono">
            Create your account and register your 128D facial biometric signature.
          </p>
        </div>

        {/* Feedback Alerts */}
        {errorMsg && (
          <div className="bg-red-950/80 border border-red-500/50 p-3.5 rounded-xl flex items-center space-x-3 text-red-300 text-xs font-mono">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="bg-emerald-950/80 border border-emerald-500/50 p-3.5 rounded-xl flex items-center space-x-3 text-emerald-300 text-xs font-mono">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* User ID Field */}
          <div>
            <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5 font-semibold">
              User ID
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="e.g. avenger01"
                className="w-full bg-slate-950/80 border border-slate-700/80 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-100 placeholder-slate-500 outline-none transition-all"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5 font-semibold">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950/80 border border-slate-700/80 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-100 placeholder-slate-500 outline-none transition-all"
              />
            </div>
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5 font-semibold">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950/80 border border-slate-700/80 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-100 placeholder-slate-500 outline-none transition-all"
              />
            </div>
          </div>

          {/* Face Capture Module */}
          <div className="pt-2">
            <label className="block text-xs font-mono uppercase text-slate-300 mb-2 font-semibold text-center">
              Webcam Face Biometric Capture
            </label>
            <FaceCamera
              onFaceCaptured={handleFaceCaptured}
              onClearCapture={handleClearFace}
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={isSubmitting || !faceData}
            className="w-full mt-4 bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-orbitron font-bold py-3.5 px-6 rounded-xl text-xs uppercase tracking-widest shadow-xl shadow-red-900/30 transition-transform hover:scale-105 disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            <span>{isSubmitting ? 'Registering Account...' : 'REGISTER VOTER'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 border-t border-slate-800">
          <span className="text-xs text-slate-400 font-mono">Already registered? </span>
          <Link to="/login" className="text-xs font-mono text-cyan-400 hover:underline font-bold">
            Login & Verify Identity →
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
