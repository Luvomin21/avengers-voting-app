import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, Trophy, Users, RefreshCw, BarChart2 } from 'lucide-react';
import ResultCard from '../components/ResultCard';
import LoadingScreen from '../components/LoadingScreen';
import { getResultsApi } from '../services/api';

const Results = () => {
  const [resultsData, setResultsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const fetchResults = async (showRefreshIndicator = false) => {
    if (showRefreshIndicator) setIsRefreshing(true);
    try {
      const res = await getResultsApi();
      if (res.success) {
        setResultsData(res);
        setError(null);
      }
    } catch (err) {
      console.error('[Results Page Error]', err);
      setError('Failed to fetch live election results from server.');
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  // Poll database every 3 seconds for dynamic live updates
  useEffect(() => {
    fetchResults();

    const interval = setInterval(() => {
      fetchResults(false);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <LoadingScreen message="Calculating Live Avengers Election Totals..." />;
  }

  const { totalVotes, candidatesCount, leader, results } = resultsData || {
    totalVotes: 0,
    candidatesCount: 0,
    leader: null,
    results: []
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Header & Polling Indicator */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 bg-amber-500/20 border border-amber-500/40 px-3.5 py-1 rounded-full text-xs font-mono font-bold text-amber-300 uppercase tracking-widest mb-2">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>LIVE ELECTION DASHBOARD</span>
          </div>
          <h1 className="font-orbitron font-black text-3xl sm:text-5xl text-white tracking-wider">
            AVENGERS ELECTION RESULTS
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Real-time live synchronization with MongoDB database (Polling every 3s)
          </p>
        </div>

        <button
          onClick={() => fetchResults(true)}
          className="flex items-center space-x-2 bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-cyan-500/30 px-4 py-2.5 rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition-all w-fit shadow-md"
        >
          <RefreshCw className={`w-4 h-4 text-cyan-400 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>{isRefreshing ? 'Refreshing...' : 'Refresh Totals'}</span>
        </button>
      </div>

      {error && (
        <div className="bg-red-950/80 border border-red-500/50 p-4 rounded-xl text-red-300 text-xs font-mono text-center">
          {error}
        </div>
      )}

      {/* Dashboard Top Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Total Votes Widget */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel rounded-2xl p-6 border border-cyan-500/40 relative overflow-hidden flex items-center space-x-4 shadow-xl shadow-cyan-950/50"
        >
          <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
            <Users className="w-7 h-7" />
          </div>
          <div>
            <span className="text-xs font-mono text-slate-400 uppercase tracking-widest block">
              TOTAL VOTES CAST
            </span>
            <span className="font-orbitron font-black text-4xl text-white">
              {totalVotes}
            </span>
          </div>
        </motion.div>

        {/* Current Lead Widget */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-panel rounded-2xl p-6 border border-amber-500/40 relative overflow-hidden flex items-center space-x-4 shadow-xl shadow-amber-950/50"
        >
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 text-3xl">
            {leader ? (leader.image || '🏆') : '🏆'}
          </div>
          <div>
            <span className="text-xs font-mono text-slate-400 uppercase tracking-widest block">
              CURRENT LEADER
            </span>
            <span className="font-orbitron font-black text-2xl text-amber-300 truncate block max-w-[180px]">
              {leader ? leader.name : 'No Votes Yet'}
            </span>
          </div>
        </motion.div>

        {/* Total Candidates Widget */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-panel rounded-2xl p-6 border border-emerald-500/40 relative overflow-hidden flex items-center space-x-4 shadow-xl shadow-emerald-950/50"
        >
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
            <BarChart2 className="w-7 h-7" />
          </div>
          <div>
            <span className="text-xs font-mono text-slate-400 uppercase tracking-widest block">
              NUMBER OF CANDIDATES
            </span>
            <span className="font-orbitron font-black text-4xl text-emerald-400">
              {candidatesCount}
            </span>
          </div>
        </motion.div>

      </div>

      {/* Live Candidates Results Breakdown */}
      <div className="space-y-4 pt-4">
        <h3 className="font-orbitron font-bold text-xl text-white tracking-wide flex items-center space-x-2">
          <Award className="w-5 h-5 text-cyan-400" />
          <span>AVENGERS STANDINGS & VOTE BREAKDOWN</span>
        </h3>

        <div className="space-y-4">
          {results.map((candidate, index) => (
            <ResultCard
              key={candidate.candidateId}
              candidate={candidate}
              rank={index + 1}
              isLeader={leader && leader.candidateId === candidate.candidateId && candidate.voteCount > 0}
            />
          ))}
        </div>
      </div>

    </div>
  );
};

export default Results;
