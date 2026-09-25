import React from 'react';
import { motion } from 'framer-motion';
import { User, ShieldCheck, CheckCircle2, AlertCircle, Calendar, Vote } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg glass-panel rounded-2xl p-8 border-2 border-emerald-500/40 shadow-2xl shadow-emerald-950/80 space-y-6"
      >
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center space-x-2 bg-emerald-500/20 border border-emerald-500/40 px-3.5 py-1 rounded-full text-xs font-mono font-bold text-emerald-300 uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>AUTHENTICATED STARK-TECH PROFILE</span>
          </div>
          <h2 className="font-orbitron font-black text-3xl text-white tracking-wider">
            VOTER PROFILE
          </h2>
          <p className="text-xs text-slate-400 font-mono">
            Identity verification details and voting audit log
          </p>
        </div>

        {/* Registered Face Photo Frame */}
        <div className="flex flex-col items-center justify-center space-y-3 pt-2">
          <div className="relative w-36 h-36 rounded-2xl overflow-hidden border-2 border-emerald-400/60 shadow-lg shadow-emerald-950/80 bg-slate-950 p-1">
            {user?.profilePhoto ? (
              <img
                src={user.profilePhoto}
                alt="Registered Face"
                className="w-full h-full object-cover rounded-xl"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 text-slate-500 space-y-1">
                <User className="w-12 h-12 text-slate-600" />
                <span className="text-[10px] font-mono">NO PHOTO DATA</span>
              </div>
            )}
            <div className="absolute bottom-1 right-1 bg-emerald-500 text-black p-1 rounded-full shadow-md">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <span className="text-xs font-mono text-emerald-400 font-semibold">
            REGISTERED BIOMETRIC FACE PHOTO
          </span>
        </div>

        {/* Profile Attributes List */}
        <div className="space-y-4 pt-2">
          
          {/* User ID */}
          <div className="flex items-center justify-between p-3.5 bg-slate-900/80 border border-slate-800 rounded-xl">
            <div className="flex items-center space-x-2 text-slate-400 text-xs font-mono">
              <User className="w-4 h-4 text-cyan-400" />
              <span>USER ID</span>
            </div>
            <span className="font-orbitron font-bold text-sm text-cyan-300">
              @{user?.userId || 'avenger01'}
            </span>
          </div>

          {/* Identity Verification */}
          <div className="flex items-center justify-between p-3.5 bg-slate-900/80 border border-slate-800 rounded-xl">
            <div className="flex items-center space-x-2 text-slate-400 text-xs font-mono">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>IDENTITY STATUS</span>
            </div>
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold px-3 py-1 rounded-full">
              VERIFIED ✓
            </span>
          </div>

          {/* Voting Status */}
          <div className="flex items-center justify-between p-3.5 bg-slate-900/80 border border-slate-800 rounded-xl">
            <div className="flex items-center space-x-2 text-slate-400 text-xs font-mono">
              <Vote className="w-4 h-4 text-amber-400" />
              <span>VOTING STATUS</span>
            </div>
            {user?.hasVoted ? (
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold px-3 py-1 rounded-full flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>VOTE SUBMITTED ✓</span>
              </span>
            ) : (
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold px-3 py-1 rounded-full">
                NOT VOTED
              </span>
            )}
          </div>

          {/* Account Creation Timestamp */}
          <div className="flex items-center justify-between p-3.5 bg-slate-900/80 border border-slate-800 rounded-xl">
            <div className="flex items-center space-x-2 text-slate-400 text-xs font-mono">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>REGISTERED ON</span>
            </div>
            <span className="text-xs font-mono text-slate-300">
              {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Active Session'}
            </span>
          </div>

        </div>

      </motion.div>
    </div>
  );
};

export default Profile;
