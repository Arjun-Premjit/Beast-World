import React, { useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle, ArrowUpRight, Layers } from 'lucide-react';
import { submitChallengeSubmission, fetchChallengeSubmissions, type ChallengeSubmissionsListResponse } from '../services/api';

export const SubmitChallenge: React.FC = () => {
  const [challengeName, setChallengeName] = useState('');
  const [category, setCategory] = useState('COMPETITION');
  const [estimatedBudget, setEstimatedBudget] = useState('$500K - $1M');
  const [description, setDescription] = useState('');
  const [whyGreat, setWhyGreat] = useState('');
  const [submitterName, setSubmitterName] = useState('');
  const [submitterEmail, setSubmitterEmail] = useState('');

  // Status states
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [successData, setSuccessData] = useState<any>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Submissions feed
  const [feed, setFeed] = useState<ChallengeSubmissionsListResponse | null>(null);

  useEffect(() => {
    loadSubmissionsFeed();
  }, []);

  const loadSubmissionsFeed = async () => {
    try {
      const data = await fetchChallengeSubmissions();
      setFeed(data);
    } catch (err) {
      console.warn('Could not load submissions feed:', err);
    }
  };

  const validate = (): boolean => {
    const errs: { [key: string]: string } = {};

    if (!challengeName.trim() || challengeName.trim().length < 3) {
      errs.challengeName = 'Please enter a challenge name (at least 3 characters).';
    }

    if (!description.trim() || description.trim().length < 15) {
      errs.description = 'Please describe the challenge rules and mechanics (at least 15 characters).';
    }

    if (!whyGreat.trim() || whyGreat.trim().length < 15) {
      errs.whyGreat = 'Please explain why this would be a great MrBeast challenge (at least 15 characters).';
    }

    if (submitterEmail.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(submitterEmail.trim())) {
        errs.submitterEmail = 'Please provide a valid email format if entered.';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await submitChallengeSubmission({
        challenge_name: challengeName.trim(),
        category,
        description: description.trim(),
        why_great: whyGreat.trim(),
        estimated_budget: estimatedBudget,
        submitter_name: submitterName.trim() || undefined,
        submitter_email: submitterEmail.trim() || undefined,
      });

      if (response.success) {
        setStatus('success');
        setSuccessData(response.data);
        loadSubmissionsFeed();
      } else {
        setStatus('error');
        setErrorMessage(response.message || 'Error vaulting concept.');
      }
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'Something went wrong. Please check your network and try again.');
    }
  };

  const handleReset = () => {
    setChallengeName('');
    setDescription('');
    setWhyGreat('');
    setSubmitterName('');
    setSubmitterEmail('');
    setStatus('idle');
    setSuccessData(null);
    setErrors({});
  };

  return (
    <div className="min-h-screen pt-32 sm:pt-36 pb-24 px-6 sm:px-12 max-w-7xl mx-auto bg-[#070A10] text-[#F5F7FB]">
      {/* Editorial Header */}
      <div className="border-b border-white/10 pb-12 mb-16 max-w-3xl">
        <div className="flex items-center gap-2 text-xs font-mono text-[#00BCEB] tracking-widest uppercase mb-4">
          <span>PRODUCTION BRAINSTORM PORTAL</span>
          <span>/</span>
          <span>DATABASE INTAKE</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-[#F5F7FB] uppercase font-display leading-[0.95]">
          PITCH A CHALLENGE <br />
          <span className="font-extrabold text-[#087BFA]">CONCEPT.</span>
        </h1>

        <p className="text-xs sm:text-sm text-[#AAB4C2] mt-4 leading-relaxed font-normal">
          Have an extreme concept Jimmy hasn't tackled yet? Pitch your wildest ideas directly to the Beast production team. Submissions are saved into the official <code className="text-[#00BCEB] font-mono">challenge_submissions</code> table.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl">
        {/* Form Container */}
        <div className="lg:col-span-7 rounded-3xl glass-panel border border-white/15 p-6 sm:p-10 shadow-2xl">
          {status === 'success' && successData ? (
            /* Success State */
            <div className="py-10 text-center space-y-6">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#087BFA]/20 border border-[#00BCEB] flex items-center justify-center text-[#00BCEB]">
                <CheckCircle2 className="w-6 h-6" />
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-light text-[#F5F7FB] font-display uppercase tracking-tight">
                  CHALLENGE VAULTED.
                </h2>
                <p className="text-xs font-mono text-[#00BCEB] mt-1">
                  SUBMISSION ID: {successData.id}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#101826] border border-white/10 text-left space-y-2 text-xs text-[#AAB4C2]">
                <div className="border-b border-white/10 pb-2">
                  <span className="font-mono text-[10px] text-neutral-500 block">Challenge Title</span>
                  <span className="font-semibold text-[#F5F7FB] text-sm font-display">{successData.challenge_name}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1.5">
                  <span className="font-mono text-[#AAB4C2]">Category</span>
                  <span className="font-semibold text-[#F5F7FB]">{successData.category}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1.5">
                  <span className="font-mono text-[#AAB4C2]">Budget Tier</span>
                  <span className="font-semibold text-[#F5F7FB]">{successData.estimated_budget}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-mono text-[#AAB4C2]">Storage Table</span>
                  <span className="font-mono font-semibold text-[#00BCEB]">challenge_submissions</span>
                </div>
              </div>

              <p className="text-xs text-[#AAB4C2] leading-relaxed">
                Your pitch has been recorded in the database. Our creative directors and challenge engineers review submissions weekly.
              </p>

              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-full text-xs font-bold uppercase font-mono tracking-wider text-white bg-gradient-to-r from-[#087BFA] to-[#00BCEB] hover:opacity-90 transition-opacity"
              >
                PITCH ANOTHER CHALLENGE
              </button>
            </div>
          ) : (
            /* Active Form */
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div className="border-b border-white/10 pb-4">
                <h2 className="text-base font-semibold text-[#F5F7FB] font-display uppercase tracking-wider">
                  PRODUCTION SUBMISSION FORM
                </h2>
                <p className="text-xs text-[#AAB4C2] mt-0.5 font-normal">
                  Vaulted in the <code className="text-[#00BCEB] font-mono">challenge_submissions</code> table.
                </p>
              </div>

              {status === 'error' && (
                <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/40 flex items-start gap-2.5 text-xs text-red-200">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
                  <div>
                    <span className="font-semibold">Pitch error: </span>
                    <span>{errorMessage}</span>
                  </div>
                </div>
              )}

              {/* Challenge Title */}
              <div>
                <label htmlFor="challengeName" className="block text-xs font-mono uppercase text-[#F5F7FB] mb-1.5 font-medium">
                  Challenge Title *
                </label>
                <input
                  id="challengeName"
                  type="text"
                  value={challengeName}
                  onChange={(e) => {
                    setChallengeName(e.target.value);
                    if (errors.challengeName) setErrors({ ...errors, challengeName: '' });
                  }}
                  placeholder="e.g. Surviving 7 Days in an Abandoned Nuclear Bunker"
                  disabled={status === 'submitting'}
                  className={`w-full px-4 py-2.5 rounded-xl bg-[#101826] border text-xs sm:text-sm text-[#F5F7FB] placeholder-neutral-500 focus:outline-none transition-colors ${
                    errors.challengeName ? 'border-red-500' : 'border-white/15 focus:border-[#00BCEB]'
                  }`}
                />
                {errors.challengeName && (
                  <p className="text-xs text-red-400 mt-1 font-mono">{errors.challengeName}</p>
                )}
              </div>

              {/* Category & Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="category" className="block text-xs font-mono uppercase text-[#F5F7FB] mb-1.5 font-medium">
                    Category
                  </label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    disabled={status === 'submitting'}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#101826] border border-white/15 text-xs sm:text-sm text-[#F5F7FB] focus:outline-none focus:border-[#00BCEB]"
                  >
                    <option value="COMPETITION">High-Stakes Competition</option>
                    <option value="SURVIVAL">Extreme Survival</option>
                    <option value="GIVEAWAYS">Giveaway & Bank Vault</option>
                    <option value="TEAM">Team Gauntlet</option>
                    <option value="COMMUNITY">Philanthropic Build</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="budget" className="block text-xs font-mono uppercase text-[#F5F7FB] mb-1.5 font-medium">
                    Estimated Scale
                  </label>
                  <select
                    id="budget"
                    value={estimatedBudget}
                    onChange={(e) => setEstimatedBudget(e.target.value)}
                    disabled={status === 'submitting'}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#101826] border border-white/15 text-xs sm:text-sm text-[#F5F7FB] focus:outline-none focus:border-[#00BCEB]"
                  >
                    <option value="$250K - $500K">$250K — $500K</option>
                    <option value="$500K - $1M">$500K — $1,000,000</option>
                    <option value="$1M - $3M">$1M — $3,000,000</option>
                    <option value="$5,000,000+ Extreme">$5,000,000+ (Extreme Stadium Scale)</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-xs font-mono uppercase text-[#F5F7FB] mb-1.5 font-medium">
                  Challenge Description & Rules *
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    if (errors.description) setErrors({ ...errors, description: '' });
                  }}
                  rows={4}
                  placeholder="Detail the setup, how contestants get eliminated, what obstacles they face, and any crazy midpoint twists..."
                  disabled={status === 'submitting'}
                  className={`w-full px-4 py-2.5 rounded-xl bg-[#101826] border text-xs sm:text-sm text-[#F5F7FB] placeholder-neutral-500 focus:outline-none resize-none ${
                    errors.description ? 'border-red-500' : 'border-white/15 focus:border-[#00BCEB]'
                  }`}
                />
                {errors.description && (
                  <p className="text-xs text-red-400 mt-1 font-mono">{errors.description}</p>
                )}
              </div>

              {/* Why Great */}
              <div>
                <label htmlFor="whyGreat" className="block text-xs font-mono uppercase text-[#00BCEB] mb-1.5 font-medium">
                  Why would this be a great MrBeast challenge? *
                </label>
                <textarea
                  id="whyGreat"
                  value={whyGreat}
                  onChange={(e) => {
                    setWhyGreat(e.target.value);
                    if (errors.whyGreat) setErrors({ ...errors, whyGreat: '' });
                  }}
                  rows={3}
                  placeholder="Why does this fit Jimmy's style? What makes the thumbnail clickable? How does it keep 100M+ viewers glued to the screen?"
                  disabled={status === 'submitting'}
                  className={`w-full px-4 py-2.5 rounded-xl bg-[#101826] border text-xs sm:text-sm text-[#F5F7FB] placeholder-neutral-500 focus:outline-none resize-none ${
                    errors.whyGreat ? 'border-red-500' : 'border-white/15 focus:border-[#00BCEB]'
                  }`}
                />
                {errors.whyGreat && (
                  <p className="text-xs text-red-400 mt-1 font-mono">{errors.whyGreat}</p>
                )}
              </div>

              {/* Submitter Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="submitterName" className="block text-xs font-mono uppercase text-[#F5F7FB] mb-1.5 font-medium">
                    Your Name / Handle
                  </label>
                  <input
                    id="submitterName"
                    type="text"
                    value={submitterName}
                    onChange={(e) => setSubmitterName(e.target.value)}
                    placeholder="e.g. Jordan (@jordankai)"
                    disabled={status === 'submitting'}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#101826] border border-white/15 text-xs sm:text-sm text-[#F5F7FB] placeholder-neutral-500 focus:outline-none focus:border-[#00BCEB]"
                  />
                </div>

                <div>
                  <label htmlFor="submitterEmail" className="block text-xs font-mono uppercase text-[#F5F7FB] mb-1.5 font-medium">
                    Contact Email (Optional)
                  </label>
                  <input
                    id="submitterEmail"
                    type="email"
                    value={submitterEmail}
                    onChange={(e) => {
                      setSubmitterEmail(e.target.value);
                      if (errors.submitterEmail) setErrors({ ...errors, submitterEmail: '' });
                    }}
                    placeholder="e.g. jordan@example.com"
                    disabled={status === 'submitting'}
                    className={`w-full px-4 py-2.5 rounded-xl bg-[#101826] border text-xs sm:text-sm text-[#F5F7FB] placeholder-neutral-500 focus:outline-none ${
                      errors.submitterEmail ? 'border-red-500' : 'border-white/15 focus:border-[#00BCEB]'
                    }`}
                  />
                  {errors.submitterEmail && (
                    <p className="text-xs text-red-400 mt-1 font-mono">{errors.submitterEmail}</p>
                  )}
                </div>
              </div>

              {/* Submit Button with Rounded Pill */}
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-gradient-to-r from-[#087BFA] to-[#00BCEB] hover:opacity-90 text-white text-xs font-bold uppercase font-mono tracking-wider transition-all disabled:opacity-50 shadow-[0_0_20px_rgba(8,123,250,0.3)]"
              >
                {status === 'submitting' ? (
                  <span>TRANSMITTING TO CHALLENGE_SUBMISSIONS...</span>
                ) : (
                  <>
                    <span>SUBMIT CHALLENGE IDEA</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Blueprint & Live Feed */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl glass-panel border border-white/15 p-6 sm:p-8 space-y-4 shadow-xl">
            <span className="text-xs font-mono text-[#00BCEB] uppercase tracking-widest font-semibold block">
              THE VIRAL BENCHMARK
            </span>
            <h3 className="text-xl font-light text-[#F5F7FB] font-display">
              WHAT MAKES A 100M+ CHALLENGE?
            </h3>
            <ul className="space-y-3 text-xs text-[#AAB4C2] leading-relaxed">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00BCEB] mt-1.5 shrink-0" />
                <span><strong className="text-white">Instant Visual Hook:</strong> The premise must be immediately obvious from a single glance at the thumbnail.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00BCEB] mt-1.5 shrink-0" />
                <span><strong className="text-white">Escalating Stakes:</strong> The stakes and difficulty must double every couple of minutes so tension never drops.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00BCEB] mt-1.5 shrink-0" />
                <span><strong className="text-white">Unscripted Payoff:</strong> Everyday contestants whose lives genuinely change upon winning.</span>
              </li>
            </ul>
          </div>

          <div className="rounded-3xl glass-panel border border-white/15 p-6 sm:p-8 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[#00BCEB] uppercase font-semibold">
                <Layers className="w-4 h-4 text-[#087BFA]" />
                <span>RECENT VAULTED IDEAS</span>
              </div>
              <span className="text-[10px] font-mono text-[#AAB4C2] bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10">
                {feed?.totalSubmissions || 2} ENTRIES
              </span>
            </div>

            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {feed?.submissions && feed.submissions.length > 0 ? (
                feed.submissions.map((sub) => (
                  <div
                    key={sub.id}
                    className="p-3.5 rounded-2xl bg-[#101826] border border-white/10 space-y-1 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[#F5F7FB] font-display truncate max-w-[200px]">
                        {sub.challenge_name}
                      </span>
                      <span className="text-[10px] font-mono text-[#00BCEB]">
                        {sub.category}
                      </span>
                    </div>
                    <p className="text-[#AAB4C2] text-[11px] line-clamp-2">
                      "{sub.why_great}"
                    </p>
                    <div className="flex items-center justify-between text-[10px] text-neutral-400 font-mono pt-1">
                      <span>By {sub.submitter_name}</span>
                      <span>{sub.time_ago}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-xs text-[#AAB4C2] italic">
                  Synchronizing recent pitches...
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
