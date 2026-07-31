import React, { useState } from 'react';
import { Translations } from '../types';

interface AnonymousReportModalProps {
  onClose: () => void;
  t: Translations;
}

export default function AnonymousReportModal({ onClose, t }: AnonymousReportModalProps) {
  const [reportCategory, setReportCategory] = useState<string>('harassment');
  const [reportDescription, setReportDescription] = useState<string>('');
  const [reportLocation, setReportLocation] = useState<string>('');
  const [reportSubmitted, setReportSubmitted] = useState<boolean>(false);

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReportSubmitted(true);
    setTimeout(() => {
      setReportSubmitted(false);
      onClose();
      setReportDescription('');
      setReportLocation('');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-150">
        <div className="p-5 bg-gradient-to-r from-pink-500 to-purple-600 text-white flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <h2 className="font-bold text-lg">{t.modalTitle}</h2>
            </div>
            <p className="text-xs text-pink-100 mt-1">{t.modalSub}</p>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/20 transition text-white">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {reportSubmitted ? (
          <div className="p-8 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-bold text-slate-800 text-lg">{t.successMsg}</h3>
          </div>
        ) : (
          <form onSubmit={handleReportSubmit} className="p-6 flex flex-col gap-4 text-left">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">{t.catLabel}</label>
              <select
                value={reportCategory}
                onChange={(e) => setReportCategory(e.target.value)}
                className="w-full text-sm border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-pink-500 focus:outline-none bg-white text-slate-800"
              >
                <option value="harassment">{t.cat1}</option>
                <option value="physical">{t.cat2}</option>
                <option value="stalking">{t.cat3}</option>
                <option value="unsafe_area">{t.cat4}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">{t.locLabel}</label>
              <input
                type="text"
                required
                value={reportLocation}
                onChange={(e) => setReportLocation(e.target.value)}
                placeholder={t.locPlaceholder}
                className="w-full text-sm border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-pink-500 focus:outline-none text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">{t.descLabel}</label>
              <textarea
                rows={3}
                value={reportDescription}
                onChange={(e) => setReportDescription(e.target.value)}
                placeholder={t.descPlaceholder}
                className="w-full text-sm border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-pink-500 focus:outline-none text-slate-800 resize-none"
              />
            </div>

            <div className="flex items-center gap-3 mt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
              >
                {t.cancelBtn}
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 text-xs font-semibold text-white bg-[#FF008A] hover:bg-pink-600 rounded-lg shadow transition"
              >
                {t.submitBtn}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}