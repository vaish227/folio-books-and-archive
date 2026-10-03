import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../context/StoreContext';
import { BOOKS } from '../data/books';

export const SearchModal: React.FC = () => {
  const { searchOpen, setSearchOpen, navigateToBook, addToCart, formatPrice } = useStore();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [searchOpen]);

  if (!searchOpen) return null;

  const results = query.trim()
    ? BOOKS.filter(
        (b) =>
          b.title.toLowerCase().includes(query.toLowerCase()) ||
          b.author.toLowerCase().includes(query.toLowerCase()) ||
          b.publisher.toLowerCase().includes(query.toLowerCase()) ||
          b.discipline.toLowerCase().includes(query.toLowerCase())
      )
    : BOOKS.slice(0, 5);

  return (
    <div className="fixed inset-0 z-50 bg-[#000000]/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
      <div className="bg-[#ffffff] max-w-2xl w-full shadow-2xl overflow-hidden border border-[#eeedf7] animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-[#eeedf7]">
          <span className="material-symbols-outlined text-[#77767b] text-[20px] mr-2">search</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search archival monographs, authors, disciplines..."
            className="w-full text-base text-[#1a1b22] placeholder:text-[#77767b] focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#77767b] hover:text-[#1a1b22] mr-2"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
          <button
            onClick={() => setSearchOpen(false)}
            className="text-[11px] uppercase tracking-wider text-[#77767b] hover:text-[#1a1b22] px-2 py-1 bg-[#f4f2fd]"
            type="button"
          >
            ESC
          </button>
        </div>

        {/* Results list */}
        <div className="max-h-[60vh] overflow-y-auto divide-y divide-[#eeedf7]">
          <div className="px-4 py-2 bg-[#fbf8ff] text-[10px] uppercase tracking-widest text-[#77767b] font-semibold">
            {query.trim() ? `Search Results (${results.length})` : 'Curator Recommendations'}
          </div>

          {results.length === 0 ? (
            <div className="p-8 text-center text-sm text-[#77767b]">
              No archival volumes found matching “{query}”.
            </div>
          ) : (
            results.map((book) => (
              <div
                key={book.id}
                className="p-3 hover:bg-[#f4f2fd] transition-colors flex items-center justify-between gap-4 group"
              >
                <div
                  onClick={() => {
                    navigateToBook(book.id);
                    setSearchOpen(false);
                  }}
                  className="flex items-center gap-3 cursor-pointer flex-1"
                >
                  <div className="w-10 h-14 bg-[#eeedf7] flex-shrink-0 overflow-hidden shadow-xs">
                    {book.coverImage ? (
                      <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-[#1c1917] flex items-center justify-center text-[8px] text-white p-1 text-center font-serif">
                        {book.title.slice(0, 10)}
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-headline text-base text-[#1a1b22] group-hover:text-[#9d4229] transition-colors leading-tight">
                      {book.title}
                    </h4>
                    <p className="text-xs text-[#77767b]">
                      {book.author} · <span className="text-[#1a1b22]">{book.publisher}</span>
                    </p>
                    <span className="text-[10px] text-[#9d4229] uppercase tracking-wider font-semibold">
                      {book.discipline}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-semibold text-sm text-[#1a1b22] tabular-nums">
                    {formatPrice(book.price)}
                  </span>
                  <button
                    onClick={() => {
                      addToCart(book);
                      setSearchOpen(false);
                    }}
                    className="p-1.5 bg-[#fbf8ff] hover:bg-[#000000] hover:text-white border border-[#c8c5cb] text-[#1a1b22] transition-colors text-xs flex items-center gap-1"
                    title="Add to bag"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
