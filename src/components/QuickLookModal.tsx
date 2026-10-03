import React from 'react';
import { useStore } from '../context/StoreContext';

export const QuickLookModal: React.FC = () => {
  const { quickLookBook, closeQuickLook, addToCart, formatPrice, navigateToBook } = useStore();

  if (!quickLookBook) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#000000]/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#ffffff] max-w-2xl w-full p-6 md:p-8 shadow-2xl relative animate-in fade-in duration-200">
        {/* Close Button */}
        <button
          aria-label="Close dialog"
          className="absolute top-4 right-4 text-[#47464b] hover:text-[#1a1b22] transition-colors p-1"
          onClick={closeQuickLook}
          type="button"
        >
          <span className="material-symbols-outlined text-[24px]">close</span>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center pt-2">
          {/* Cover Display */}
          <div className="w-full aspect-[3/4] bg-[#eeedf7] overflow-hidden shadow-inner flex items-center justify-center">
            {quickLookBook.coverImage ? (
              <img
                alt={quickLookBook.title}
                className="w-full h-full object-cover"
                src={quickLookBook.coverImage}
              />
            ) : (
              <div className="w-full h-full bg-[#1c1917] p-6 text-white flex flex-col justify-between">
                <span className="text-[10px] tracking-widest uppercase text-[#a8a29e]">
                  {quickLookBook.publisher}
                </span>
                <h3 className="font-headline text-2xl">{quickLookBook.title}</h3>
                <span className="text-xs text-[#a8a29e]">{quickLookBook.author}</span>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-3 flex flex-col justify-between h-full py-1">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#9d4229] font-bold">
                Archival Collation
              </span>
              <h3 className="font-headline text-2xl text-[#1a1b22] mt-1 leading-tight">
                {quickLookBook.title}
              </h3>
              <p className="text-sm text-[#47464b] mt-0.5">{quickLookBook.author}</p>
              <p className="text-xs text-[#77767b] mt-1">
                {quickLookBook.formatDetails || quickLookBook.format}
              </p>
              <p className="text-[13px] text-[#47464b] mt-3 leading-relaxed">
                Printed on FSC-certified archival Munken Pure paper stock (120gsm). Hand-inspected with blind debossed publisher crest and numbered limitation card.
              </p>
            </div>

            <div className="pt-4 space-y-3">
              <div className="flex items-baseline justify-between border-t border-[#eeedf7] pt-3">
                <span className="text-[11px] uppercase tracking-wider text-[#77767b]">Price</span>
                <span className="font-headline text-2xl font-semibold text-[#1a1b22] tabular-nums">
                  {formatPrice(quickLookBook.price)}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  className="flex-1 py-3 bg-[#9d4229] hover:bg-[#74240d] text-white text-[12px] uppercase tracking-widest font-semibold transition-colors flex items-center justify-center gap-2"
                  onClick={() => {
                    addToCart(quickLookBook);
                    closeQuickLook();
                  }}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                  <span>Add to Bag</span>
                </button>
                <button
                  className="px-4 py-3 bg-[#f4f2fd] hover:bg-[#eeedf7] text-[#1a1b22] text-[12px] uppercase tracking-wider transition-colors"
                  onClick={() => {
                    navigateToBook(quickLookBook.id);
                    closeQuickLook();
                  }}
                  type="button"
                  title="View full dossier"
                >
                  Inspect
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
