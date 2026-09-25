import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Lock, AlertCircle, ShieldCheck, ArrowRight } from 'lucide-react';
import FaceScanner from '../components/FaceScanner';
import { verifyFaceApi } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginUser } = useAuth();

  const [userId, setUserId] = useState(location.state?.registeredUserId || '');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [verificationResult, setVerificationResult] = useState(null);

  const handleVerifyScan = async (faceDescriptor) => {
    setErrorMsg(null);
    setSuccessMsg(null);
    setVerificationResult(null);

    if (!userId || !password) {
      setErrorMsg('Please enter both User ID and Password before scanning face.');
      return;
    }

    if (!faceDescriptor) {
      setErrorMsg('Could not read facial signature from camera stream. Please try scanning again.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Call Backend API to verify User ID + Password + Face Vector
      const res = await verifyFaceApi({
        userId,
        password,
        faceDescriptor
      });

      if (res.success && res.faceMatched) {
        setVerificationResult({ success: true, message: res.message });
        setSuccessMsg(res.message);

        // Login user into AuthContext
        loginUser(res.token, {
          userId: res.userId || userId,
          hasVoted: res.hasVoted,
          votedCandidateId: res.votedCandidateId
        });

        // Navigate to vote page after short delay
        setTimeout(() => {
          if (res.hasVoted) {
            navigate('/results');
          } else {
            navigate('/vote');
          }
        }, 1500);
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Identity verification failed.';
      setVerificationResult({ success: false, message: msg });
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
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center space-x-2 bg-cyan-500/20 border border-cyan-500/40 px-3 py-1 rounded-full text-xs font-mono font-bold text-cyan-300 uppercase tracking-widest">
            <span>STARK TECH VERIFICATION</span>
          </div>
          <h2 className="font-orbitron font-black text-3xl text-white tracking-wider">
            VOTER VERIFICATION
          </h2>
          <p className="text-xs text-slate-400 font-mono">
            Enter credentials and scan live face to authenticate voting access.
          </p>
        </div>

        {/* Alerts */}
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

        {/* Credentials Inputs */}
        <div className="space-y-4">
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
                placeholder="Enter registered User ID"
                className="w-full bg-slate-950/80 border border-slate-700/80 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-100 placeholder-slate-500 outline-none transition-all"
              />
            </div>
          </div>

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
                placeholder="Enter password"
                className="w-full bg-slate-950/80 border border-slate-700/80 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-100 placeholder-slate-500 outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* Live Face Scanner Module */}
        <div className="pt-2">
          <label className="block text-xs font-mono uppercase text-slate-300 mb-2 font-semibold text-center">
            Live Face Biometric Matching
          </label>
          <FaceScanner
            onVerify={handleVerifyScan}
            isSubmitting={isSubmitting}
            verificationResult={verificationResult}
          />
        </div>

        <div className="text-center pt-2 border-t border-slate-800">
          <span className="text-xs text-slate-400 font-mono">Need to create an account? </span>
          <Link to="/signup" className="text-xs font-mono text-amber-400 hover:underline font-bold">
            Register Here →
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
