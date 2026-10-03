import React from 'react';
import { useStore } from '../context/StoreContext';

export const Toast: React.FC = () => {
  const { toastMessage, setCurrentPage } = useStore();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 transform translate-y-0 opacity-100 transition-all duration-300 flex items-center gap-3 bg-[#000000] text-white px-5 py-3.5 shadow-2xl max-w-sm border border-[#1b1b1e]">
      <span className="material-symbols-outlined text-[#ffdbd1] text-[20px]">check_circle</span>
      <div className="flex-1">
        <p className="text-[10px] tracking-wider uppercase font-semibold text-[#ffdbd1]">
          Collation Registry
        </p>
        <p className="text-xs text-white truncate font-medium">{toastMessage}</p>
      </div>
      <button
        onClick={() => {
          setCurrentPage('cart');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="text-[11px] underline uppercase tracking-wider text-[#fd8c6c] hover:text-white transition-colors ml-2 font-bold"
        type="button"
      >
        View Bag
      </button>
    </div>
  );
};
