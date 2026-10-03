import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const { setCurrentPage, setCatalogCategory, showToast } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      showToast('Thank you for subscribing to The Sunday Digest.');
    }
  };

  const handleCollectionClick = (category: string) => {
    setCatalogCategory(category);
    setCurrentPage('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#f4f2fd] mt-10">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10">
          {/* Sunday Digest Col (2 cols) */}
          <div className="lg:col-span-2 pr-0 lg:pr-8">
            <span className="font-headline text-3xl font-normal tracking-tight text-[#1a1b22] block mb-3">
              The Sunday Digest
            </span>
            <p className="text-[15px] text-[#47464b] mb-4 max-w-md leading-relaxed">
              A weekly epistolary on archival printings, literary interviews, and overlooked first editions curated by the editors of Folio.
            </p>
            {subscribed ? (
              <div className="p-3 bg-[#e8e7f1] text-[#1a1b22] text-sm flex items-center gap-2 max-w-md">
                <span className="material-symbols-outlined text-[#9d4229] text-[18px]">check_circle</span>
                <span>You are subscribed to weekly archival despatches.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex max-w-md gap-0">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your correspondence address..."
                  required
                  className="flex-1 bg-[#fbf8ff] px-4 py-3 text-[13px] text-[#1a1b22] placeholder:text-[#77767b] border border-[#c8c5cb] focus:outline-none focus:border-[#000000]"
                />
                <button
                  type="submit"
                  className="bg-[#000000] hover:bg-[#1b1b1e] text-white px-6 py-3 text-[12px] uppercase tracking-wider font-semibold transition-colors shrink-0"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>

          {/* Curated Collections */}
          <div>
            <h4 className="text-[11px] uppercase tracking-wider text-[#1a1b22] font-bold mb-4">
              Curated Collections
            </h4>
            <ul className="space-y-2 text-[13px]">
              <li>
                <button
                  onClick={() => handleCollectionClick('Architecture & Design')}
                  className="text-[#47464b] hover:text-[#1a1b22] transition-colors text-left"
                >
                  European Architecture
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCollectionClick('Essays & Criticism')}
                  className="text-[#47464b] hover:text-[#1a1b22] transition-colors text-left"
                >
                  Critical Theory & Poetics
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCollectionClick('Architecture & Design')}
                  className="text-[#47464b] hover:text-[#1a1b22] transition-colors text-left"
                >
                  Archival Typography
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCollectionClick('All Volumes')}
                  className="text-[#47464b] hover:text-[#1a1b22] transition-colors text-left"
                >
                  Limited Pressings
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCollectionClick('Rare & Antiquarian')}
                  className="text-[#47464b] hover:text-[#1a1b22] transition-colors text-left"
                >
                  Ex Libris Stamp Editions
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-[11px] uppercase tracking-wider text-[#1a1b22] font-bold mb-4">
              Customer Service
            </h4>
            <ul className="space-y-2 text-[13px]">
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('cart');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-[#47464b] hover:text-[#1a1b22] transition-colors text-left"
                >
                  Order Tracking
                </button>
              </li>
              <li>
                <span className="text-[#47464b] hover:text-[#1a1b22] transition-colors cursor-pointer">
                  Shipping & Dispatch
                </span>
              </li>
              <li>
                <span className="text-[#47464b] hover:text-[#1a1b22] transition-colors cursor-pointer">
                  Archival Handling & Care
                </span>
              </li>
              <li>
                <span className="text-[#47464b] hover:text-[#1a1b22] transition-colors cursor-pointer">
                  Institutional Inquiries
                </span>
              </li>
              <li>
                <span className="text-[#47464b] hover:text-[#1a1b22] transition-colors cursor-pointer">
                  Contact Bureau
                </span>
              </li>
            </ul>
          </div>

          {/* Publishing Imprint */}
          <div>
            <h4 className="text-[11px] uppercase tracking-wider text-[#1a1b22] font-bold mb-4">
              Publishing Imprint
            </h4>
            <p className="text-[13px] text-[#47464b] leading-relaxed mb-3">
              FOLIO Books & Press
              <br />
              42 St. John’s Mews
              <br />
              Bloomsbury, London WC1N 2PB
            </p>
            <p className="text-[13px] text-[#47464b]">
              <span className="text-[#77767b]">ISSN</span> 2814-9912
              <br />
              <span className="text-[#77767b]">Catalog</span> #98-2025
            </p>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-6 border-t border-[#eeedf7] flex flex-col md:flex-row items-center justify-between gap-4 text-[13px] text-[#47464b]">
          <div className="flex items-center gap-4 text-[11px] flex-wrap justify-center md:justify-start">
            <span className="tracking-wider uppercase text-[#77767b]">
              © 2025 FOLIO Books, Inc.
            </span>
            <span className="hover:text-[#1a1b22] transition-colors cursor-pointer">
              Privacy Statement
            </span>
            <span className="hover:text-[#1a1b22] transition-colors cursor-pointer">
              Terms of Collation
            </span>
            <span className="hover:text-[#1a1b22] transition-colors cursor-pointer">
              Accessibility
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[10px] tracking-widest text-[#77767b] uppercase font-bold">
            <span className="px-2 py-0.5 bg-white text-[#47464b] shadow-xs">VISA</span>
            <span className="px-2 py-0.5 bg-white text-[#47464b] shadow-xs">MC</span>
            <span className="px-2 py-0.5 bg-white text-[#47464b] shadow-xs">AMEX</span>
            <span className="px-2 py-0.5 bg-white text-[#47464b] shadow-xs">APPLE PAY</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
