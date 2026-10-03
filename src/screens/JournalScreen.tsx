import React from 'react';
import { useStore } from '../context/StoreContext';
import { BOOKS } from '../data/books';

export const JournalScreen: React.FC = () => {
  const { setCurrentPage, setSelectedBook } = useStore();

  const handleReadMonograph = (bookId: string) => {
    const book = BOOKS.find((b) => b.id === bookId);
    if (book) {
      setSelectedBook(book);
      setCurrentPage('pdp');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const articles = [
    {
      id: 'article-1',
      volume: 'FOLIO JOURNAL Nº 44',
      date: 'Spring 2025',
      title: 'The Silent Volume: Acoustic Architecture in the Swiss Alps',
      author: 'Elena Vane',
      readTime: '12 min read',
      excerpt:
        'Peter Zumthor and Tadao Ando share a tactile obsession with heavy thermal mass. How stone walls filter sound, creating what monks termed "the acoustic reservoir of the mind".',
      relatedBookId: 'form-and-silence',
      tag: 'Architectural Phenomenology'
    },
    {
      id: 'article-2',
      volume: 'FOLIO JOURNAL Nº 43',
      date: 'Winter 2024',
      title: 'Grid Coordinates and Cold-Glue: The Basel Letterpress Revival',
      author: 'Julian Keller',
      readTime: '9 min read',
      excerpt:
        'A pilgrimage through three clandestine printing ateliers near the Rhine where 1950s Heidelberg cylinders still press ink into wet rag paper.',
      relatedBookId: 'spatial-grammars-print',
      tag: 'Typography & Press'
    },
    {
      id: 'article-3',
      volume: 'FOLIO JOURNAL Nº 42',
      date: 'Autumn 2024',
      title: 'In Praise of Rough Edges: Deckled Pages and Readerly Solitude',
      author: 'Camille Laurent',
      readTime: '7 min read',
      excerpt:
        'Why the machine-trimmed edge diminishes our intimacy with the sentence. A meditation on unbleached bookcloth and uncut signatures.',
      relatedBookId: 'the-epistolary-fragment',
      tag: 'Poetics of Collation'
    }
  ];

  return (
    <div className="flex flex-col w-full">
      <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12 py-10">
        {/* Journal Header */}
        <div className="border-b border-[#eeedf7] pb-8 mb-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#9d4229]"></span>
            <span className="text-[10px] uppercase tracking-widest text-[#77767b] font-bold">
              The Folio Critical Compendium
            </span>
          </div>
          <h1 className="font-headline text-4xl sm:text-5xl text-[#1a1b22]">
            The Folio Journal
          </h1>
          <p className="text-base text-[#47464b] mt-3 max-w-2xl leading-relaxed">
            Scholarly essays, architectural dialogues, and photographic memoirs written by our contributing fellows, bibliophiles, and atelier directors.
          </p>
        </div>

        {/* Feature Article */}
        <div className="bg-[#f4f2fd] p-8 md:p-12 mb-12 border border-[#eeedf7] relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-3 text-xs">
              <span className="px-2 py-0.5 bg-[#9d4229] text-white text-[10px] uppercase tracking-wider font-bold">
                Cover Dossier
              </span>
              <span className="text-[#77767b]">VOL. VII • COMPENDIUM ESSAY</span>
            </div>
            <h2 className="font-headline text-3xl sm:text-4xl text-[#1a1b22] leading-tight">
              On the Tactility of Emptiness: Reflections from the Vals Cloister
            </h2>
            <p className="text-sm text-[#47464b] leading-relaxed">
              When light enters a quarry stone room at low elevation, silence transforms from an acoustic vacuum into an architectural presence. An exclusive excerpt and photographic essay by Elena Vane.
            </p>
            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={() => handleReadMonograph('form-and-silence')}
                className="px-6 py-3 bg-[#000000] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#1b1b1e] transition-colors"
                type="button"
              >
                Inspect Associated Monograph
              </button>
              <span className="text-xs text-[#77767b]">14 min read · 18 plates</span>
            </div>
          </div>
        </div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((art) => (
            <article
              key={art.id}
              className="bg-white p-6 border border-[#eeedf7] shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center text-[10px] uppercase tracking-wider text-[#77767b] mb-2 font-semibold">
                  <span>{art.volume}</span>
                  <span>{art.readTime}</span>
                </div>
                <span className="inline-block px-2 py-0.5 bg-[#eeedf7] text-[#9d4229] text-[9px] uppercase tracking-widest font-bold mb-3">
                  {art.tag}
                </span>
                <h3 className="font-headline text-2xl text-[#1a1b22] leading-snug mb-2">
                  {art.title}
                </h3>
                <p className="text-xs text-[#47464b] leading-relaxed mb-4">{art.excerpt}</p>
              </div>

              <div className="pt-4 border-t border-[#eeedf7] flex items-center justify-between">
                <span className="text-xs text-[#1a1b22] font-semibold">{art.author}</span>
                <button
                  onClick={() => handleReadMonograph(art.relatedBookId)}
                  className="text-xs text-[#9d4229] hover:text-[#74240d] font-bold uppercase tracking-wider flex items-center gap-1"
                >
                  <span>Read Essay</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
