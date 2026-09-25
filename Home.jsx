import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, UserCheck, Lock, Vote, Award, Sparkles, ChevronRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-[calc(100vh-5rem)] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Hero Section */}
      <div className="max-w-5xl mx-auto text-center space-y-8">
        
        {/* Badges Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <span className="bg-red-600/20 text-red-400 border border-red-500/40 px-3.5 py-1 rounded-full text-xs font-mono font-bold tracking-widest uppercase">
            ⚡ DEMO ELECTION
          </span>
          <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 px-3.5 py-1 rounded-full text-xs font-mono font-bold tracking-widest uppercase">
            🛡️ ONE USER • ONE VOTE
          </span>
          <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-3.5 py-1 rounded-full text-xs font-mono font-bold tracking-widest uppercase">
            👤 IDENTITY VERIFIED VOTING
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <h1 className="font-orbitron font-black text-4xl sm:text-6xl lg:text-7xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-400 drop-shadow-[0_0_35px_rgba(0,240,255,0.3)]">
            AVENGERS FAN ELECTION
          </h1>
          <p className="text-xl sm:text-2xl font-semibold text-cyan-300 tracking-wide font-orbitron">
            "Choose Your Favorite Avenger"
          </p>
          <p className="max-w-2xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed font-inter">
            Welcome to the ultimate college demo voting portal. Cast your vote for Earth's Mightiest Heroes using biometric face recognition and secure MongoDB verification.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-4"
        >
          <Link
            to="/signup"
            className="bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-orbitron font-bold text-sm px-8 py-4 rounded-xl shadow-xl shadow-red-900/40 hover:scale-105 transition-all flex items-center space-x-2"
          >
            <span>REGISTER NOW</span>
            <ChevronRight className="w-4 h-4" />
          </Link>

          <Link
            to="/login"
            className="bg-cyan-500/20 hover:bg-cyan-500 text-cyan-300 hover:text-black border border-cyan-500/50 font-orbitron font-bold text-sm px-8 py-4 rounded-xl shadow-lg shadow-cyan-500/20 hover:scale-105 transition-all flex items-center space-x-2"
          >
            <Lock className="w-4 h-4" />
            <span>LOGIN & VOTE</span>
          </Link>

          <Link
            to="/results"
            className="bg-slate-900/90 hover:bg-slate-800 text-amber-300 border border-amber-500/40 font-orbitron font-bold text-sm px-8 py-4 rounded-xl shadow-lg hover:scale-105 transition-all flex items-center space-x-2"
          >
            <Award className="w-4 h-4 text-amber-400" />
            <span>VIEW RESULTS</span>
          </Link>
        </motion.div>
      </div>

      {/* Feature Cards Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="glass-panel glass-card-hover rounded-2xl p-6 border border-cyan-500/30 space-y-3">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <UserCheck className="w-6 h-6" />
          </div>
          <h3 className="font-orbitron font-bold text-lg text-white">
            128D Face Biometrics
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Generates 128-dimensional floating point descriptor vectors via webcam during registration and login for instantaneous biometric verification.
          </p>
        </div>

        <div className="glass-panel glass-card-hover rounded-2xl p-6 border border-red-500/30 space-y-3">
          <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-orbitron font-bold text-lg text-white">
            Strict Single-Vote System
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Database-enforced integrity checks prevent repeated voting attempts across both client side UI and Express server backend.
          </p>
        </div>

        <div className="glass-panel glass-card-hover rounded-2xl p-6 border border-amber-500/30 space-y-3">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="font-orbitron font-bold text-lg text-white">
            Dynamic Live Results
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Real-time candidate tally updates with animated percentage progress indicators and leader metrics stored in MongoDB.
          </p>
        </div>

      </div>

      {/* Candidate Roster Preview */}
      <div className="max-w-4xl mx-auto glass-panel rounded-2xl p-8 border border-slate-800 text-center space-y-6">
        <div className="flex items-center justify-center space-x-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <h2 className="font-orbitron font-bold text-2xl text-white tracking-wide">
            ELECTION CANDIDATES
          </h2>
        </div>
        <p className="text-xs text-slate-400 font-mono">
          Iron Man • Captain America • Thor • Hulk • Black Widow • Hawkeye • Spider-Man • Doctor Strange
        </p>
        <div className="flex flex-wrap justify-center gap-3 text-3xl">
          <span className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 hover:scale-125 transition-transform" title="Iron Man">🦾</span>
          <span className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 hover:scale-125 transition-transform" title="Captain America">🛡️</span>
          <span className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 hover:scale-125 transition-transform" title="Thor">⚡</span>
          <span className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 hover:scale-125 transition-transform" title="Hulk">💚</span>
          <span className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 hover:scale-125 transition-transform" title="Black Widow">🕷️</span>
          <span className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 hover:scale-125 transition-transform" title="Hawkeye">🏹</span>
          <span className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 hover:scale-125 transition-transform" title="Spider-Man">🕸️</span>
          <span className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 hover:scale-125 transition-transform" title="Doctor Strange">🔮</span>
        </div>
      </div>

    </div>
  );
};

export default Home;
