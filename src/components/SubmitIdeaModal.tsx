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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xl overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-xl rounded-3xl bg-white text-[#1C1814] border border-[#3D3024]/15 shadow-[0_25px_60px_rgba(50,35,20,0.25)] p-6 sm:p-8 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#FAF5ED] border border-[#3D3024]/10 flex items-center justify-center text-[#8C7E72] hover:text-[#1C1814] hover:bg-[#F4EFE6] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {status === 'success' ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#FF3D91]/15 border border-[#FF3D91] flex items-center justify-center text-[#FF3D91]">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-light text-[#1C1814] font-display">
              VAULTED IN DATABASE.
            </h3>
            <p className="text-xs text-[#61554A] max-w-sm mx-auto leading-relaxed">
              Your concept has been recorded in the <code className="text-[#FF3D91] font-mono font-bold bg-[#FF3D91]/10 px-1.5 py-0.5 rounded">challenge_submissions</code> table.
            </p>
            <button
              onClick={handleReset}
              className="mt-4 px-7 py-3 rounded-full text-xs font-bold uppercase font-mono tracking-wider text-white bg-gradient-to-r from-[#FF3D91] via-[#FF2680] to-[#E60067] hover:from-[#E60067] hover:to-[#FF3D91] transition-all shadow-[0_4px_16px_rgba(255,61,145,0.4)]"
            >
              CLOSE OR PITCH ANOTHER
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-mono text-[#FF3D91] uppercase mb-1 font-bold">
                <span>PITCH A CHALLENGE</span>
                <span>/</span>
                <span>DATABASE INTAKE</span>
              </div>
              <h3 className="text-2xl font-light text-[#1C1814] font-display">
                SUBMIT A BEAST IDEA
              </h3>
            </div>

            {status === 'error' && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 flex items-center gap-2 text-xs text-red-700">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                <span>{feedback}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-mono uppercase text-[#1C1814] mb-1 font-bold">
                Challenge Title *
              </label>
              <input
                type="text"
                value={challengeName}
                onChange={(e) => setChallengeName(e.target.value)}
                placeholder="e.g. 100 People Fight For $1,000,000 in a Laser Maze"
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF5ED] border border-[#3D3024]/15 text-xs sm:text-sm text-[#1C1814] placeholder-[#8C7E72] focus:outline-none focus:border-[#FF3D91]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono uppercase text-[#1C1814] mb-1 font-bold">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF5ED] border border-[#3D3024]/15 text-xs text-[#1C1814] focus:outline-none focus:border-[#FF3D91]"
                >
                  <option value="COMPETITION">Competition</option>
                  <option value="SURVIVAL">Survival</option>
                  <option value="GIVEAWAYS">Giveaway & Vault</option>
                  <option value="TEAM">Team Gauntlet</option>
                  <option value="COMMUNITY">Philanthropy</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#1C1814] mb-1 font-bold">
                  Scale
                </label>
                <select
                  value={estimatedBudget}
                  onChange={(e) => setEstimatedBudget(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF5ED] border border-[#3D3024]/15 text-xs text-[#1C1814] focus:outline-none focus:border-[#FF3D91]"
                >
                  <option value="$250K - $500K">$250K - $500K</option>
                  <option value="$500K - $1M">$500K - $1,000,000</option>
                  <option value="$1M - $3M">$1M - $3,000,000</option>
                  <option value="$5M+ Extreme Stadium">$5M+ Extreme Stadium</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-[#1C1814] mb-1 font-bold">
                Challenge Rules & Mechanics *
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Explain the setup, stakes, and twists..."
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF5ED] border border-[#3D3024]/15 text-xs sm:text-sm text-[#1C1814] placeholder-[#8C7E72] focus:outline-none focus:border-[#FF3D91] resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-[#FF3D91] mb-1 font-bold">
                Why would this be a great MrBeast challenge? *
              </label>
              <textarea
                value={whyGreat}
                onChange={(e) => setWhyGreat(e.target.value)}
                rows={2}
                placeholder="What makes the pacing insane? Why does it fit Jimmy's style?"
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF5ED] border border-[#3D3024]/15 text-xs sm:text-sm text-[#1C1814] placeholder-[#8C7E72] focus:outline-none focus:border-[#FF3D91] resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono uppercase text-[#1C1814] mb-1 font-bold">
                  Your Handle (Optional)
                </label>
                <input
                  type="text"
                  value={submitterName}
                  onChange={(e) => setSubmitterName(e.target.value)}
                  placeholder="e.g. Alex M."
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF5ED] border border-[#3D3024]/15 text-xs text-[#1C1814] placeholder-[#8C7E72] focus:outline-none focus:border-[#FF3D91]"
                />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase text-[#1C1814] mb-1 font-bold">
                  Your Email (Optional)
                </label>
                <input
                  type="email"
                  value={submitterEmail}
                  onChange={(e) => setSubmitterEmail(e.target.value)}
                  placeholder="e.g. alex@fan.com"
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF5ED] border border-[#3D3024]/15 text-xs text-[#1C1814] placeholder-[#8C7E72] focus:outline-none focus:border-[#FF3D91]"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-gradient-to-r from-[#FF3D91] via-[#FF2680] to-[#E60067] hover:from-[#E60067] hover:to-[#FF3D91] text-white text-xs font-bold uppercase font-mono tracking-wider transition-all disabled:opacity-50 shadow-[0_4px_18px_rgba(255,61,145,0.4)] hover:scale-[1.01] active:scale-[0.99]"
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
