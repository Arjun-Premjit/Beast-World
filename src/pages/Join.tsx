import React, { useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle, ArrowUpRight, Users, ShieldCheck } from 'lucide-react';
import { submitCommunitySignup, fetchCommunityStats, type CommunityStatsResponse } from '../services/api';

export const Join: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [ageRange, setAgeRange] = useState('18-24');
  const [contentType, setContentType] = useState('High-Stakes Competitions');
  const [message, setMessage] = useState('');
  const [agreeToUpdates, setAgreeToUpdates] = useState(true);

  // Status & stats
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [successData, setSuccessData] = useState<any>(null);
  const [stats, setStats] = useState<CommunityStatsResponse | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await fetchCommunityStats();
      setStats(data);
    } catch (err) {
      console.warn('Could not fetch community stats:', err);
    }
  };

  const validate = (): boolean => {
    const errs: { [key: string]: string } = {};

    if (!name.trim() || name.trim().length < 2) {
      errs.name = 'Please provide your full name (at least 2 characters).';
    }

    if (!email.trim()) {
      errs.email = 'Please provide your email address.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        errs.email = 'Please provide a valid email format.';
      }
    }

    if (!agreeToUpdates) {
      errs.agree = 'You must agree to receive challenge dispatches to register.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await submitCommunitySignup({
        name: name.trim(),
        email: email.trim(),
        ageRange,
        contentType,
        message: message.trim(),
        agreeToUpdates,
      });

      if (res.success) {
        setStatus('success');
        setSuccessData(res.data);
        loadStats();
      } else {
        setStatus('error');
        setErrorMessage(res.message || 'Something went wrong. Please try again.');
      }
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setMessage('');
    setStatus('idle');
    setSuccessData(null);
    setErrors({});
  };

  return (
    <div className="min-h-screen pt-32 sm:pt-36 pb-24 px-6 sm:px-12 max-w-7xl mx-auto bg-[#F4EFE6] text-[#1C1814]">
      {/* Editorial Header */}
      <div className="border-b border-[#3D3024]/10 pb-12 mb-16 max-w-3xl">
        <div className="flex items-center gap-2 text-xs font-mono text-[#FF3D91] tracking-widest uppercase mb-4 font-bold">
          <span>GLOBAL ROSTER</span>
          <span>/</span>
          <span>DISPATCH ENROLLMENT</span>
        </div>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-[#1C1814] uppercase font-display leading-[0.95]">
          JOIN THE BEAST <br />
          <span className="font-extrabold text-[#FF3D91]">COMMUNITY.</span>
        </h1>
        <p className="text-xs sm:text-sm text-[#61554A] mt-4 leading-relaxed font-normal">
          Get challenge drops, production casting updates, and philanthropic build announcements delivered directly to your inbox.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl">
        {/* Form Column */}
        <div className="lg:col-span-7 rounded-3xl bg-white border border-[#3D3024]/12 p-6 sm:p-10 shadow-xl">
          {status === 'success' && successData ? (
            /* Success State */
            <div className="py-10 text-center space-y-6">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#FF3D91]/15 border border-[#FF3D91] flex items-center justify-center text-[#FF3D91]">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-light text-[#1C1814] font-display uppercase tracking-tight">
                  YOU'RE IN THE ROSTER.
                </h2>
                <p className="text-xs font-mono text-[#FF3D91] mt-1 font-bold">
                  MEMBER ID: {successData.id}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#FAF5ED] border border-[#3D3024]/10 text-left space-y-2 text-xs text-[#61554A]">
                <div className="flex justify-between border-b border-[#3D3024]/10 pb-2">
                  <span className="font-mono text-[#8C7E72]">Full Name</span>
                  <span className="font-semibold text-[#1C1814]">{successData.name}</span>
                </div>
                <div className="flex justify-between border-b border-[#3D3024]/10 pb-2">
                  <span className="font-mono text-[#8C7E72]">Registered Email</span>
                  <span className="font-semibold text-[#1C1814]">{successData.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-mono text-[#8C7E72]">Roster Status</span>
                  <span className="font-bold text-[#FF3D91] font-mono">ACTIVE // VERIFIED</span>
                </div>
              </div>

              <p className="text-xs text-[#61554A] leading-relaxed">
                Welcome to the Beast Community network. Keep an eye on your inbox for upcoming challenge announcements.
              </p>

              <button
                onClick={handleReset}
                className="px-7 py-3 rounded-full text-xs font-bold uppercase font-mono tracking-wider text-white bg-gradient-to-r from-[#FF3D91] via-[#FF2680] to-[#E60067] hover:from-[#E60067] hover:to-[#FF3D91] transition-all shadow-[0_4px_16px_rgba(255,61,145,0.4)]"
              >
                ENROLL ANOTHER MEMBER
              </button>
            </div>
          ) : (
            /* Active Form */
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div className="border-b border-[#3D3024]/10 pb-4">
                <h2 className="text-base font-semibold text-[#1C1814] font-display uppercase tracking-wider">
                  OFFICIAL ENROLLMENT FORM
                </h2>
                <p className="text-xs text-[#61554A] mt-0.5 font-normal">
                  Direct encrypted submission to the community registry database.
                </p>
              </div>

              {/* Error Banner */}
              {status === 'error' && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 flex items-start gap-2.5 text-xs text-red-700">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
                  <div>
                    <span className="font-semibold">Submission failed: </span>
                    <span>{errorMessage}</span>
                  </div>
                </div>
              )}

              {/* Field: Full Name */}
              <div>
                <label htmlFor="name" className="block text-xs font-mono uppercase text-[#1C1814] mb-1.5 font-bold">
                  Full Name *
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors({ ...errors, name: '' });
                  }}
                  placeholder="e.g. Alex Morgan"
                  disabled={status === 'loading'}
                  className={`w-full px-4 py-2.5 rounded-xl bg-[#FAF5ED] border text-xs sm:text-sm text-[#1C1814] placeholder-[#8C7E72] focus:outline-none transition-colors ${
                    errors.name ? 'border-red-500' : 'border-[#3D3024]/15 focus:border-[#FF3D91]'
                  }`}
                />
                {errors.name && (
                  <p className="text-xs text-red-500 mt-1 font-mono">{errors.name}</p>
                )}
              </div>

              {/* Field: Email */}
              <div>
                <label htmlFor="email" className="block text-xs font-mono uppercase text-[#1C1814] mb-1.5 font-bold">
                  Email Address *
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({ ...errors, email: '' });
                  }}
                  placeholder="e.g. alex.morgan@gmail.com"
                  disabled={status === 'loading'}
                  className={`w-full px-4 py-2.5 rounded-xl bg-[#FAF5ED] border text-xs sm:text-sm text-[#1C1814] placeholder-[#8C7E72] focus:outline-none transition-colors ${
                    errors.email ? 'border-red-500' : 'border-[#3D3024]/15 focus:border-[#FF3D91]'
                  }`}
                />
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1 font-mono">{errors.email}</p>
                )}
              </div>

              {/* Field: Age Range & Content Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="ageRange" className="block text-xs font-mono uppercase text-[#1C1814] mb-1.5 font-bold">
                    Age Bracket
                  </label>
                  <select
                    id="ageRange"
                    value={ageRange}
                    onChange={(e) => setAgeRange(e.target.value)}
                    disabled={status === 'loading'}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF5ED] border border-[#3D3024]/15 text-xs sm:text-sm text-[#1C1814] focus:outline-none focus:border-[#FF3D91]"
                  >
                    <option value="Under 18">Under 18</option>
                    <option value="18-24">18 — 24</option>
                    <option value="25-34">25 — 34</option>
                    <option value="35-44">35 — 44</option>
                    <option value="45+">45+</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contentType" className="block text-xs font-mono uppercase text-[#1C1814] mb-1.5 font-bold">
                    Preferred Content
                  </label>
                  <select
                    id="contentType"
                    value={contentType}
                    onChange={(e) => setContentType(e.target.value)}
                    disabled={status === 'loading'}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF5ED] border border-[#3D3024]/15 text-xs sm:text-sm text-[#1C1814] focus:outline-none focus:border-[#FF3D91]"
                  >
                    <option value="High-Stakes Competitions">High-Stakes Competitions</option>
                    <option value="Extreme Survival">Extreme Survival</option>
                    <option value="Philanthropy & Giving">Philanthropy & Giving</option>
                    <option value="Team Gauntlets">Team Gauntlets</option>
                    <option value="Money & Escapes">Money & Vaults</option>
                  </select>
                </div>
              </div>

              {/* Field: Message */}
              <div>
                <label htmlFor="message" className="block text-xs font-mono uppercase text-[#1C1814] mb-1.5 font-bold">
                  Why do you want to join? (Optional)
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  disabled={status === 'loading'}
                  placeholder="Tell us what you love most about Jimmy's videos..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF5ED] border border-[#3D3024]/15 text-xs sm:text-sm text-[#1C1814] placeholder-[#8C7E72] focus:outline-none focus:border-[#FF3D91] resize-none"
                />
              </div>

              {/* Checkbox: Agree */}
              <div>
                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={agreeToUpdates}
                    onChange={(e) => {
                      setAgreeToUpdates(e.target.checked);
                      if (errors.agree) setErrors({ ...errors, agree: '' });
                    }}
                    disabled={status === 'loading'}
                    className="mt-0.5 w-4 h-4 rounded border-[#3D3024]/20 text-[#FF3D91] accent-[#FF3D91]"
                  />
                  <span className="text-xs text-[#61554A] leading-normal font-normal">
                    I agree to receive verified challenge dispatches, production casting calls, and release notifications.
                  </span>
                </label>
                {errors.agree && (
                  <p className="text-xs text-red-500 mt-1 font-mono">{errors.agree}</p>
                )}
              </div>

              {/* Submit Button in Panther Pink */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-gradient-to-r from-[#FF3D91] via-[#FF2680] to-[#E60067] hover:from-[#E60067] hover:to-[#FF3D91] text-white text-xs font-bold uppercase tracking-wider font-mono transition-all disabled:opacity-50 shadow-[0_4px_18px_rgba(255,61,145,0.4)] hover:scale-[1.01] active:scale-[0.99]"
              >
                {status === 'loading' ? (
                  <span>RECORDING TO DATABASE...</span>
                ) : (
                  <>
                    <span>ENROLL IN COMMUNITY ROSTER</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Live Roster Stats */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl bg-white border border-[#3D3024]/12 p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-[#3D3024]/10 pb-4">
              <div className="flex items-center gap-2 text-xs font-mono text-[#FF3D91] uppercase font-bold">
                <Users className="w-4 h-4 text-[#FF3D91]" />
                <span>COMMUNITY INDEX</span>
              </div>
              <span className="text-[10px] font-mono text-[#FF3D91] bg-[#FF3D91]/15 px-2.5 py-0.5 rounded-full border border-[#FF3D91]/30 font-bold">
                LIVE STATUS
              </span>
            </div>

            <div>
              <div className="text-4xl font-light text-[#1C1814] font-display">
                {stats ? (
                  <span className="font-mono-numbers">{stats.totalSignups.toLocaleString()}</span>
                ) : (
                  <span className="font-mono-numbers">84,204+</span>
                )}
              </div>
              <p className="text-xs text-[#61554A] mt-1 font-normal">
                Subscribers and community members registered across 190+ countries.
              </p>
            </div>

            {/* Recent Signups Feed */}
            <div className="space-y-3 pt-2">
              <h4 className="text-[11px] font-mono uppercase tracking-wider text-[#8C7E72] font-semibold">
                RECENT SQUAD REGISTRATIONS
              </h4>
              {stats?.recentSignups && stats.recentSignups.length > 0 ? (
                <div className="space-y-2">
                  {stats.recentSignups.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-2xl bg-[#FAF5ED] border border-[#3D3024]/10 flex items-center justify-between text-xs"
                    >
                      <span className="font-bold text-[#1C1814] font-display">{item.displayName}</span>
                      <div className="flex items-center gap-2 text-[#61554A] font-mono text-[11px]">
                        <span>{item.contentType}</span>
                        <span>·</span>
                        <span>{item.joinedAgo}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-xs text-[#8C7E72] italic">
                  Synchronizing community roster...
                </div>
              )}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#3D3024]/12 flex items-start gap-3 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-[#FF3D91] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-[#1C1814] font-mono uppercase mb-0.5">
                PRIVACY PLEDGE
              </h4>
              <p className="text-xs text-[#61554A] leading-relaxed font-normal">
                Your email is stored securely and never sold or distributed. We only dispatch authentic challenge updates and relief builds.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
