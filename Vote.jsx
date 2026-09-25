import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck } from 'lucide-react';
import CandidateCard from '../components/CandidateCard';
import VoteModal from '../components/VoteModal';
import LoadingScreen from '../components/LoadingScreen';
import { getCandidatesApi, submitVoteApi } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Vote = () => {
  const navigate = useNavigate();
  const { user, updateVotingStatus } = useAuth();

  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successBanner, setSuccessBanner] = useState(null);

  // Fetch candidates list from backend API
  const fetchCandidates = async () => {
    try {
      const res = await getCandidatesApi();
      if (res.success) {
        setCandidates(res.candidates);
      }
    } catch (err) {
      console.error('[Vote Page Error]', err);
      setError('Failed to fetch candidates roster from database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const handleSelectCandidate = (candidate) => {
    if (user?.hasVoted) return;
    setSelectedCandidate(candidate);
    setIsModalOpen(true);
  };

  const handleConfirmVote = async () => {
    if (!selectedCandidate) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await submitVoteApi(selectedCandidate.candidateId);
      if (res.success) {
        setIsModalOpen(false);
        setSuccessBanner(`VOTE RECORDED ✓ You voted for ${res.candidate}!`);
        updateVotingStatus(selectedCandidate.candidateId);

        // Refresh candidate vote counts
        await fetchCandidates();
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to submit vote.';
      setError(msg);
      if (err.response?.status === 409) {
        updateVotingStatus(selectedCandidate?.candidateId);
      }
      setIsModalOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingScreen message="Accessing Stark-Tech Candidates Database..." />;
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Page Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 bg-red-600/20 border border-red-500/40 px-3.5 py-1 rounded-full text-xs font-mono font-bold text-red-400 uppercase tracking-widest">
          <span>AVENGERS FAN ELECTION</span>
        </div>
        <h1 className="font-orbitron font-black text-3xl sm:text-5xl text-white tracking-wider">
          CHOOSE YOUR FAVORITE AVENGER
        </h1>
        <p className="text-sm font-mono text-cyan-300">
          You can vote only once. Identity verified for user @{user?.userId}.
        </p>
      </div>

      {/* Banner / Error Feedback */}
      {successBanner && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto bg-emerald-950/90 border-2 border-emerald-500 p-4 rounded-2xl flex items-center justify-between shadow-xl shadow-emerald-950/80 text-emerald-300"
        >
          <div className="flex items-center space-x-3">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 shrink-0 animate-bounce" />
            <div>
              <h4 className="font-orbitron font-bold text-lg text-emerald-300">
                {successBanner}
              </h4>
              <p className="text-xs font-mono text-emerald-400/80">
                Database synced. Duplicate voting is permanently disabled for your user account.
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate('/results')}
            className="bg-emerald-500 hover:bg-emerald-400 text-black font-orbitron font-bold px-4 py-2 rounded-xl text-xs flex items-center space-x-1 shrink-0 transition-transform hover:scale-105"
          >
            <span>View Live Results</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      )}

      {error && (
        <div className="max-w-2xl mx-auto bg-red-950/90 border border-red-500/50 p-4 rounded-2xl flex items-center space-x-3 text-red-300 text-xs font-mono">
          <AlertTriangle className="w-6 h-6 text-red-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {user?.hasVoted && !successBanner && (
        <div className="max-w-2xl mx-auto bg-amber-950/80 border border-amber-500/40 p-4 rounded-2xl flex items-center space-x-3 text-amber-300 text-xs font-mono">
          <ShieldCheck className="w-6 h-6 text-amber-400 shrink-0" />
          <div>
            <span className="font-bold block">YOU HAVE ALREADY VOTED IN THIS ELECTION</span>
            <span>Your vote is permanently recorded in MongoDB. Thank you for participating!</span>
          </div>
        </div>
      )}

      {/* Candidate Grid (Responsive: 4 Desktop, 2 Tablet, 1 Mobile) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
        {candidates.map((candidate) => (
          <CandidateCard
            key={candidate.candidateId}
            candidate={candidate}
            onSelectCandidate={handleSelectCandidate}
            hasVoted={!!user?.hasVoted}
            isVotedForThisCandidate={user?.votedCandidateId === candidate.candidateId}
          />
        ))}
      </div>

      {/* Confirmation Modal */}
      <VoteModal
        candidate={selectedCandidate}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmVote}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default Vote;
