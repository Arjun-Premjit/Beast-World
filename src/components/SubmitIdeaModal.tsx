import React, { useState } from 'react';
import { X, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { submitChallengeSubmission } from '../services/api';

interface SubmitIdeaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SubmitIdeaModal: React.FC<SubmitIdeaModalProps> = ({ isOpen, onClose }) => {
  const [challengeName, setChallengeName] = useState('');
  const [category, setCategory] = useState('COMPETITION');
  const [description, setDescription] = useState('');
  const [whyGreat, setWhyGreat] = useState('');
  const [estimatedBudget, setEstimatedBudget] = useState('$500K - $1M');
  const [submitterName, setSubmitterName] = useState('');
  const [submitterEmail, setSubmitterEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (challengeName.trim().length < 3) {
      setStatus('error');
      setFeedback('Please provide a challenge title (at least 3 characters).');
      return;
    }
    if (description.trim().length < 15) {
      setStatus('error');
      setFeedback('Please explain your challenge setup (at least 15 characters).');
      return;
    }
    if (whyGreat.trim().length < 10) {
      setStatus('error');
      setFeedback('Please explain why this would be a great MrBeast challenge (at least 10 characters).');
      return;
    }

    setStatus('submitting');
    setFeedback('');

    try {
      const response = await submitChallengeSubmission({
        challenge_name: challengeName,
        category,
        description,
        why_great: whyGreat,
        estimated_budget: estimatedBudget,
        submitter_name: submitterName || 'Community Creator',
        submitter_email: submitterEmail || undefined,
      });

      if (response.success) {
        setStatus('success');
        setFeedback(response.message || 'Challenge idea vaulted!');
      } else {
        setStatus('error');
        setFeedback(response.message || 'Error vaulting concept.');
      }
    } catch (err: any) {
      setStatus('error');
      setFeedback(err.message || 'Error vaulting concept. Please try again.');
    }
  };

  const handleReset = () => {
    setChallengeName('');
    setDescription('');
    setWhyGreat('');
    setSubmitterName('');
    setSubmitterEmail('');
    setStatus('idle');
    setFeedback('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-xl rounded-3xl bg-[#101826] text-[#F5F7FB] border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.8)] p-6 sm:p-8 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#AAB4C2] hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {status === 'success' ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#087BFA]/20 border border-[#00BCEB] flex items-center justify-center text-[#00BCEB]">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-light text-[#F5F7FB] font-display">
              VAULTED IN DATABASE.
            </h3>
            <p className="text-xs text-[#AAB4C2] max-w-sm mx-auto leading-relaxed">
              Your concept has been recorded in the <code className="text-[#00BCEB] font-mono">challenge_submissions</code> table.
            </p>
            <button
              onClick={handleReset}
              className="mt-4 px-6 py-2.5 rounded-full text-xs font-bold uppercase font-mono tracking-wider text-white bg-gradient-to-r from-[#087BFA] to-[#00BCEB] hover:opacity-90 transition-opacity"
            >
              CLOSE OR PITCH ANOTHER
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-mono text-[#00BCEB] uppercase mb-1">
                <span>PITCH A CHALLENGE</span>
                <span>/</span>
                <span>DATABASE INTAKE</span>
              </div>
              <h3 className="text-2xl font-light text-[#F5F7FB] font-display">
                SUBMIT A BEAST IDEA
              </h3>
            </div>

            {status === 'error' && (
              <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/40 flex items-center gap-2 text-xs text-red-200">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{feedback}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-mono uppercase text-white mb-1 font-medium">
                Challenge Title *
              </label>
              <input
                type="text"
                value={challengeName}
                onChange={(e) => setChallengeName(e.target.value)}
                placeholder="e.g. 100 People Fight For $1,000,000 in a Laser Maze"
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#141722] border border-white/15 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#28B8E8]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono uppercase text-white mb-1 font-medium">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#141722] border border-white/15 text-xs text-white focus:outline-none focus:border-[#28B8E8]"
                >
                  <option value="COMPETITION">Competition</option>
                  <option value="SURVIVAL">Survival</option>
                  <option value="GIVEAWAYS">Giveaway & Vault</option>
                  <option value="TEAM">Team Gauntlet</option>
                  <option value="COMMUNITY">Philanthropy</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-white mb-1 font-medium">
                  Scale
                </label>
                <select
                  value={estimatedBudget}
                  onChange={(e) => setEstimatedBudget(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#141722] border border-white/15 text-xs text-white focus:outline-none focus:border-[#28B8E8]"
                >
                  <option value="$250K - $500K">$250K - $500K</option>
                  <option value="$500K - $1M">$500K - $1,000,000</option>
                  <option value="$1M - $3M">$1M - $3,000,000</option>
                  <option value="$5M+ Extreme Stadium">$5M+ Extreme Stadium</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-white mb-1 font-medium">
                Challenge Rules & Mechanics *
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Explain the setup, stakes, and twists..."
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#141722] border border-white/15 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#28B8E8] resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-[#28B8E8] mb-1 font-medium">
                Why would this be a great MrBeast challenge? *
              </label>
              <textarea
                value={whyGreat}
                onChange={(e) => setWhyGreat(e.target.value)}
                rows={2}
                placeholder="What makes the pacing insane? Why does it fit Jimmy's style?"
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#141722] border border-white/15 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#28B8E8] resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono uppercase text-white mb-1 font-medium">
                  Your Handle (Optional)
                </label>
                <input
                  type="text"
                  value={submitterName}
                  onChange={(e) => setSubmitterName(e.target.value)}
                  placeholder="e.g. Alex M."
                  className="w-full px-3 py-2 rounded-xl bg-[#141722] border border-white/15 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#28B8E8]"
                />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase text-white mb-1 font-medium">
                  Your Email (Optional)
                </label>
                <input
                  type="email"
                  value={submitterEmail}
                  onChange={(e) => setSubmitterEmail(e.target.value)}
                  placeholder="e.g. alex@fan.com"
                  className="w-full px-3 py-2 rounded-xl bg-[#141722] border border-white/15 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#28B8E8]"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-gradient-to-r from-[#1769E0] to-[#28B8E8] hover:opacity-90 text-white text-xs font-bold uppercase font-mono tracking-wider transition-all disabled:opacity-50 shadow-[0_0_20px_rgba(23,105,224,0.3)]"
              >
                {status === 'submitting' ? (
                  <span>TRANSMITTING TO DATABASE...</span>
                ) : (
                  <>
                    <span>SUBMIT TO CHALLENGE_SUBMISSIONS</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
