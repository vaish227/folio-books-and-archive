import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';

export const ArchivistModal: React.FC = () => {
  const { archivistOpen, setArchivistOpen, showToast } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bookDetails: '',
    maxBudget: '$200 - $500',
    timeframe: 'Standard (2-4 Weeks)'
  });
  const [submitted, setSubmitted] = useState(false);

  if (!archivistOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Archival requisition logged with the Bloomsbury desk.');
    setTimeout(() => {
      setSubmitted(false);
      setArchivistOpen(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#000000]/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#ffffff] max-w-xl w-full p-6 md:p-8 shadow-2xl relative animate-in fade-in duration-200">
        <button
          aria-label="Close dialog"
          className="absolute top-4 right-4 text-[#47464b] hover:text-[#1a1b22] p-1"
          onClick={() => setArchivistOpen(false)}
          type="button"
        >
          <span className="material-symbols-outlined text-[24px]">close</span>
        </button>

        <div className="flex items-center gap-2 mb-2 text-[#9d4229]">
          <span className="material-symbols-outlined text-[20px]">local_library</span>
          <span className="text-[11px] uppercase tracking-widest font-bold">
            The Rare Book Room
          </span>
        </div>
        <h3 className="font-headline text-2xl text-[#1a1b22]">Archival Requisition Dossier</h3>
        <p className="text-xs text-[#47464b] mt-1 mb-6">
          Our Bloomsbury archivists source authenticated first impressions, out-of-print architectural monographs, and rare letterpress works worldwide.
        </p>

        {submitted ? (
          <div className="p-6 bg-[#eeedf7] text-center space-y-2">
            <span className="material-symbols-outlined text-[#9d4229] text-[36px]">verified</span>
            <h4 className="font-headline text-lg text-[#1a1b22]">Requisition Received</h4>
            <p className="text-xs text-[#47464b]">
              Assigned to Senior Archivist M. Vance. You will receive an accession report within 48 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#77767b] mb-1 font-semibold">
                Your Full Name
              </label>
              <input
                required
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Julian Vance"
                className="w-full bg-[#f4f2fd] px-3 py-2 text-sm text-[#1a1b22] focus:outline-none focus:bg-white border border-[#c8c5cb]"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#77767b] mb-1 font-semibold">
                Correspondence Email
              </label>
              <input
                required
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="vance@bloomsbury.org"
                className="w-full bg-[#f4f2fd] px-3 py-2 text-sm text-[#1a1b22] focus:outline-none focus:bg-white border border-[#c8c5cb]"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#77767b] mb-1 font-semibold">
                Title, Architect / Author, or Publisher Desired
              </label>
              <textarea
                required
                rows={3}
                value={formData.bookDetails}
                onChange={(e) => setFormData({ ...formData, bookDetails: e.target.value })}
                placeholder="e.g. 1978 Birkhauser edition of Sigurd Lewerentz: Drawings & Buildings..."
                className="w-full bg-[#f4f2fd] px-3 py-2 text-sm text-[#1a1b22] focus:outline-none focus:bg-white border border-[#c8c5cb] resize-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#77767b] mb-1 font-semibold">
                  Target Valuation Range
                </label>
                <select
                  value={formData.maxBudget}
                  onChange={(e) => setFormData({ ...formData, maxBudget: e.target.value })}
                  className="w-full bg-[#f4f2fd] px-3 py-2 text-sm text-[#1a1b22] border border-[#c8c5cb]"
                >
                  <option>$100 - $200</option>
                  <option>$200 - $500</option>
                  <option>$500 - $1,500</option>
                  <option>$1,500+ Museum Acquisition</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#77767b] mb-1 font-semibold">
                  Requisition Urgency
                </label>
                <select
                  value={formData.timeframe}
                  onChange={(e) => setFormData({ ...formData, timeframe: e.target.value })}
                  className="w-full bg-[#f4f2fd] px-3 py-2 text-sm text-[#1a1b22] border border-[#c8c5cb]"
                >
                  <option>Standard (2-4 Weeks)</option>
                  <option>Immediate Auction Placement</option>
                  <option>Ongoing Passive Search</option>
                </select>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-[#000000] hover:bg-[#1b1b1e] text-white text-[12px] uppercase tracking-widest font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <span>Dispatch Search Requisition</span>
                <span className="material-symbols-outlined text-[16px]">send</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
