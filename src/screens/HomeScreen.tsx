import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { BOOKS } from '../data/books';

export const HomeScreen: React.FC = () => {
  const {
    setCurrentPage,
    setSelectedBook,
    addToCart,
    formatPrice,
    toggleWishlist,
    wishlist,
    setCatalogCategory,
    showToast,
    openQuickLook
  } = useStore();

  const [clubForm, setClubForm] = useState({
    name: '',
    email: '',
    discipline: 'Architecture & Urban Morphology'
  });
  const [clubSubmitted, setClubSubmitted] = useState(false);
  const [curatorNoteOpen, setCuratorNoteOpen] = useState(false);

  // Books for Staff Selections (4 items)
  const staffSelections = [
    BOOKS.find((b) => b.id === 'spatial-cadence') || BOOKS[1],
    BOOKS.find((b) => b.id === 'chiaroscuro-mind') || BOOKS[2],
    BOOKS.find((b) => b.id === 'monolith-concrete') || BOOKS[3],
    BOOKS.find((b) => b.id === 'the-epistolary-fragment') || BOOKS[4]
  ];

  // Featured book of the month
  const featuredBook = BOOKS[0]; // Form & Silence

  const handleClubSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setClubSubmitted(true);
    showToast('Membership dossier submitted for review.');
  };

  const handleInspectBook = (bookId: string) => {
    const book = BOOKS.find((b) => b.id === bookId);
    if (book) {
      setSelectedBook(book);
      setCurrentPage('pdp');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Top Subtle Architectural Barometer / Ticker */}
      <div className="w-full bg-[#f4f2fd] px-6 md:px-12 py-2 flex items-center justify-between text-[#47464b] text-[10px] md:text-[11px] tracking-widest uppercase">
        <div className="flex items-center gap-4">
          <span className="inline-flex items-center gap-1.5 font-semibold text-[#1a1b22]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#9d4229]"></span> FOLIO ARCHIVE NO. 44
          </span>
          <span className="hidden md:inline text-[#c8c5cb]">/</span>
          <span className="hidden md:inline">VOL. VII • SPRING 2025 COMPENDIUM</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-[#1a1b22] font-semibold">LONDON — PARIS — BASEL</span>
          <span className="hidden lg:inline text-[#77767b]">LIMITED FIRST PRESSINGS IN STOCK</span>
        </div>
      </div>

      {/* SECTION 1: HERO EDITORIAL (Asymmetric Masterwork) */}
      <section className="max-w-[1440px] mx-auto w-full px-6 md:px-12 pt-10 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Editorial Provocation & CTAs (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between py-2">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="px-2.5 py-1 bg-[#eeedf7] text-[10px] uppercase tracking-widest text-[#9d4229] font-bold">
                  Seasonal Monograph Focus
                </span>
                <span className="text-[#77767b] text-[10px] uppercase tracking-widest">
                  Nº 114 • Bloomsbury Press
                </span>
              </div>
              <h1 className="font-headline text-4xl sm:text-5xl lg:text-6xl text-[#1a1b22] tracking-tight leading-[1.08] max-w-2xl mb-4">
                Spring Curations: <br />
                <span className="italic font-normal">The Architecture</span> of Thought.
              </h1>
              <p className="text-[17px] text-[#47464b] max-w-xl leading-relaxed mb-8">
                A symposium of tactile editions confronting spatial emptiness, modernist typology, and the quiet resonance between structural form and literary solitude. Curated across thirty-two independent European ateliers.
              </p>
            </div>

            <div className="space-y-6 pt-2">
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => {
                    setCatalogCategory('All Volumes');
                    setCurrentPage('catalog');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="h-12 px-6 bg-[#000000] text-white flex items-center justify-center text-[12px] uppercase tracking-wider font-semibold hover:bg-[#1b1b1e] transition-colors shadow-sm"
                  type="button"
                >
                  Explore the Selection
                </button>
                <button
                  onClick={() => setCuratorNoteOpen(!curatorNoteOpen)}
                  className="h-12 px-6 bg-[#eeedf7] hover:bg-[#e8e7f1] text-[#1a1b22] flex items-center justify-center text-[12px] uppercase tracking-wider font-semibold transition-colors"
                  type="button"
                >
                  Read Curator's Note
                </button>
                <div className="flex items-center gap-2 pl-2 text-[#47464b] text-xs">
                  <span className="material-symbols-outlined text-[18px] text-[#9d4229]">
                    auto_stories
                  </span>
                  <span>18 Curated Folios Included</span>
                </div>
              </div>

              {/* Curator note expandable */}
              {curatorNoteOpen && (
                <div className="p-4 bg-[#f4f2fd] border-l-2 border-[#9d4229] animate-in fade-in">
                  <p className="font-headline text-lg italic text-[#1a1b22] mb-1">
                    “The book is not merely an intellectual container, but a physical boundary through which silence enters space.”
                  </p>
                  <p className="text-xs text-[#47464b] leading-relaxed">
                    This spring compendium centers on editions produced using Heidelberg cylinder letterpresses and unbleached cotton papers. We invite readers to experience typography as weight, depth, and tangible silence.
                  </p>
                  <span className="block mt-2 text-[10px] uppercase tracking-wider text-[#9d4229] font-bold">
                    — Arthur Vance, Keeper of Printed Books
                  </span>
                </div>
              )}

              {/* Metadata Spec Grid */}
              <div className="grid grid-cols-3 gap-2 pt-4 max-w-xl">
                <div className="bg-[#f4f2fd] p-3">
                  <span className="block text-[10px] text-[#77767b] uppercase tracking-wider mb-1">
                    Paper Weight
                  </span>
                  <span className="text-[13px] font-semibold text-[#1a1b22]">140gsm Munken Pure</span>
                </div>
                <div className="bg-[#f4f2fd] p-3">
                  <span className="block text-[10px] text-[#77767b] uppercase tracking-wider mb-1">
                    Binding
                  </span>
                  <span className="text-[13px] font-semibold text-[#1a1b22]">Exposed Cold-Glue</span>
                </div>
                <div className="bg-[#f4f2fd] p-3">
                  <span className="block text-[10px] text-[#77767b] uppercase tracking-wider mb-1">
                    Print Batch
                  </span>
                  <span className="text-[13px] font-semibold text-[#1a1b22]">500 Hand-numbered</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Featured Book of the Month Showcase (5 cols) */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="relative bg-[#f4f2fd] p-6 md:p-8 flex-1 flex flex-col justify-between overflow-hidden shadow-sm group">
              {/* Ambient decorative geometry */}
              <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-[#9d4229]/10 blur-2xl pointer-events-none"></div>

              {/* Card Header & Badge */}
              <div className="flex items-start justify-between relative z-10 mb-4">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#77767b] block">
                    Book of the Month
                  </span>
                  <span className="font-headline text-2xl text-[#1a1b22]">
                    Spring Laureate Selection
                  </span>
                </div>
                <div className="px-2.5 py-1 bg-white shadow-xs flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#9d4229]">
                    workspace_premium
                  </span>
                  <span className="text-[10px] text-[#1a1b22] uppercase tracking-wider font-bold">
                    Leipzig Prix 2024
                  </span>
                </div>
              </div>

              {/* Book Hero Representation with Precision CSS Geometric Jacket */}
              <div
                onClick={() => handleInspectBook('form-and-silence')}
                className="my-4 flex justify-center items-center py-2 relative z-10 cursor-pointer"
              >
                <div className="relative w-64 aspect-[3/4] bg-[#e3e1ec] shadow-xl transition-transform duration-300 group-hover:-translate-y-1">
                  {/* Book Spine Illusion */}
                  <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-black/25 via-black/5 to-transparent z-20"></div>

                  {/* Cover Artwork: Concrete Brutalism & Minimalist Typo */}
                  <div className="absolute inset-0 bg-[#1c1917] p-6 flex flex-col justify-between overflow-hidden text-stone-100">
                    <div className="flex justify-between items-start">
                      <div className="w-7 h-7 rounded-full bg-[#9d4229] flex items-center justify-center text-[10px] font-bold text-white">
                        01
                      </div>
                      <span className="text-[8px] uppercase tracking-[0.25em] text-stone-400">
                        ARCHIVE FOLIO
                      </span>
                    </div>

                    {/* Geometric Focal Graphic */}
                    <div className="relative my-4 flex items-center justify-center">
                      <div className="w-32 h-32 rounded-full border border-stone-700/80 flex items-center justify-center">
                        <div className="w-20 h-20 bg-stone-800 rotate-45 flex items-center justify-center">
                          <div className="w-10 h-10 rounded-full bg-[#9d4229]/80"></div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="h-0.5 w-8 bg-[#9d4229] mb-2"></div>
                      <h3 className="font-headline text-2xl text-stone-100 leading-tight">
                        Form & Silence
                      </h3>
                      <p className="text-xs text-stone-400 mt-1">Elena Vane</p>
                    </div>
                  </div>

                  {/* Inner foil edge indicator */}
                  <div className="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.15)] pointer-events-none"></div>
                </div>
              </div>

              {/* Book Details & Acquisition */}
              <div className="relative z-10 bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between mb-1">
                  <div>
                    <h4
                      onClick={() => handleInspectBook('form-and-silence')}
                      className="font-headline text-xl text-[#1a1b22] hover:text-[#9d4229] transition-colors cursor-pointer"
                    >
                      Form & Silence
                    </h4>
                    <p className="text-xs text-[#47464b]">Elena Vane • Monacelli & Folio Co-Press</p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-[#1a1b22] tabular-nums">
                      {formatPrice(38.0)}
                    </span>
                    <span className="block text-[9px] text-[#9d4229] uppercase tracking-widest font-semibold">
                      Hardcover 1st Ed.
                    </span>
                  </div>
                </div>
                <p className="text-xs text-[#47464b] line-clamp-2 mb-4 leading-relaxed">
                  A profound inquiry into silence as an architectonic component within sacred Japanese pavilions and postwar Scandinavian residential structures.
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => addToCart(featuredBook, 'Hardcover 1st Edition', 38.0)}
                    className="flex-1 py-3 bg-[#9d4229] hover:bg-[#74240d] text-white text-[11px] uppercase tracking-widest font-semibold transition-colors flex items-center justify-center gap-2"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                    Acquire Volume
                  </button>
                  <button
                    onClick={() => toggleWishlist('form-and-silence')}
                    className="p-3 bg-[#eeedf7] hover:bg-[#e8e7f1] text-[#1a1b22] transition-colors"
                    title="Bookmark for later"
                    type="button"
                  >
                    <span
                      className="material-symbols-outlined text-[18px]"
                      style={{
                        fontVariationSettings: wishlist.includes('form-and-silence')
                          ? "'FILL' 1"
                          : "'FILL' 0"
                      }}
                    >
                      bookmark_border
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: STAFF SELECTIONS — APRIL EDITION (Tactile Catalog Grid) */}
      <section className="w-full bg-[#f4f2fd] py-12">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 bg-[#000000]"></span>
                <span className="text-[10px] uppercase tracking-widest text-[#77767b] font-semibold">
                  Editorial Table No. 4
                </span>
              </div>
              <h2 className="font-headline text-3xl sm:text-4xl text-[#1a1b22]">
                Staff Selections — April Edition
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-xs text-[#47464b] max-w-sm hidden lg:block">
                Reviewed and annotated by FOLIO resident bibliophiles across independent typography, poetics, and architectural studies.
              </p>
              <button
                onClick={() => {
                  setCatalogCategory('All Volumes');
                  setCurrentPage('catalog');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-4 py-2 bg-white hover:bg-[#eeedf7] text-[#1a1b22] text-[11px] uppercase tracking-widest font-semibold transition-colors flex items-center gap-1 shadow-xs"
                type="button"
              >
                View All 24 Works{' '}
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* 4 Books Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Book 1: Spatial Cadence */}
            <div className="bg-white p-4 flex flex-col justify-between shadow-xs group hover:shadow-md transition-shadow">
              <div>
                <div
                  onClick={() => openQuickLook(staffSelections[0])}
                  className="relative w-full aspect-[3/4] bg-stone-100 mb-4 overflow-hidden flex flex-col justify-between p-5 text-stone-900 shadow-inner cursor-pointer"
                >
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] uppercase tracking-widest font-bold">
                      ZÜRICH PRESS
                    </span>
                    <span className="text-[9px] text-stone-400">Nº 88</span>
                  </div>
                  {/* Bauhaus Constructivist Graphic */}
                  <div className="space-y-2 my-auto">
                    <div className="w-full h-8 bg-stone-900"></div>
                    <div className="w-3/4 h-3 bg-[#9d4229]"></div>
                    <div className="w-1/2 h-1 bg-stone-400"></div>
                  </div>
                  <div>
                    <span className="font-headline text-xl block leading-tight">
                      Spatial Cadence
                    </span>
                    <span className="text-[10px] text-stone-500 uppercase tracking-wider">
                      H. R. Glarus
                    </span>
                  </div>
                  <div className="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)] pointer-events-none"></div>
                </div>

                <div className="flex items-center justify-between text-[#47464b] mb-1">
                  <span className="px-1.5 py-0.5 bg-[#eeedf7] text-[10px] uppercase tracking-wide">
                    Hardcover 1st Edition
                  </span>
                  <div className="flex items-center text-[#9d4229] text-[12px]">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className="material-symbols-outlined text-[14px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                    ))}
                  </div>
                </div>
                <h3
                  onClick={() => openQuickLook(staffSelections[0])}
                  className="font-headline text-lg text-[#1a1b22] hover:text-[#9d4229] cursor-pointer"
                >
                  Spatial Cadence
                </h3>
                <p className="text-xs text-[#47464b] mb-2">H. R. Glarus</p>
              </div>

              <div className="pt-2">
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-base font-bold text-[#1a1b22] tabular-nums">
                    {formatPrice(42.0)}
                  </span>
                  <span className="text-[11px] text-[#77767b]">Imported Linen</span>
                </div>
                <button
                  onClick={() => addToCart(staffSelections[0])}
                  className="w-full py-2.5 bg-[#000000] hover:bg-[#1b1b1e] text-white text-[11px] uppercase tracking-widest font-semibold transition-colors flex items-center justify-center gap-1.5"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">shopping_bag</span> Add to
                  Bag
                </button>
              </div>
            </div>

            {/* Book 2: Chiaroscuro & Mind */}
            <div className="bg-white p-4 flex flex-col justify-between shadow-xs group hover:shadow-md transition-shadow">
              <div>
                <div
                  onClick={() => openQuickLook(staffSelections[1])}
                  className="relative w-full aspect-[3/4] bg-stone-900 mb-4 overflow-hidden flex flex-col justify-between p-5 text-stone-200 shadow-inner cursor-pointer"
                >
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] uppercase tracking-widest text-stone-400">
                      KYOTO IMPRINT
                    </span>
                    <div className="w-2.5 h-2.5 bg-amber-600 rounded-full"></div>
                  </div>
                  {/* Monochromatic Minimalist Grid */}
                  <div className="my-auto flex flex-col items-center">
                    <div className="w-20 h-28 border border-stone-700 p-2 flex flex-col justify-between">
                      <div className="w-full h-px bg-stone-700"></div>
                      <div className="w-full h-px bg-stone-700"></div>
                      <div className="w-full h-px bg-stone-700"></div>
                    </div>
                  </div>
                  <div>
                    <span className="font-headline text-xl block leading-tight text-white">
                      Chiaroscuro & Mind
                    </span>
                    <span className="text-[10px] text-stone-400 uppercase tracking-wider">
                      Kenzo Matsuoka
                    </span>
                  </div>
                  <div className="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] pointer-events-none"></div>
                </div>

                <div className="flex items-center justify-between text-[#47464b] mb-1">
                  <span className="px-1.5 py-0.5 bg-[#eeedf7] text-[10px] uppercase tracking-wide">
                    Archival Clothbound
                  </span>
                  <div className="flex items-center text-[#9d4229] text-[12px]">
                    {[...Array(4)].map((_, i) => (
                      <span
                        key={i}
                        className="material-symbols-outlined text-[14px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                    ))}
                    <span className="material-symbols-outlined text-[14px]">star_half</span>
                  </div>
                </div>
                <h3
                  onClick={() => openQuickLook(staffSelections[1])}
                  className="font-headline text-lg text-[#1a1b22] hover:text-[#9d4229] cursor-pointer"
                >
                  Chiaroscuro & Mind
                </h3>
                <p className="text-xs text-[#47464b] mb-2">Kenzo Matsuoka</p>
              </div>

              <div className="pt-2">
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-base font-bold text-[#1a1b22] tabular-nums">
                    {formatPrice(34.5)}
                  </span>
                  <span className="text-[11px] text-[#77767b]">Gold Foiled</span>
                </div>
                <button
                  onClick={() => addToCart(staffSelections[1])}
                  className="w-full py-2.5 bg-[#000000] hover:bg-[#1b1b1e] text-white text-[11px] uppercase tracking-widest font-semibold transition-colors flex items-center justify-center gap-1.5"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">shopping_bag</span> Add to
                  Bag
                </button>
              </div>
            </div>

            {/* Book 3: Monolith: Concrete */}
            <div className="bg-white p-4 flex flex-col justify-between shadow-xs group hover:shadow-md transition-shadow">
              <div>
                <div
                  onClick={() => openQuickLook(staffSelections[2])}
                  className="relative w-full aspect-[3/4] bg-stone-200 mb-4 overflow-hidden flex flex-col justify-between p-5 text-stone-900 shadow-inner cursor-pointer"
                >
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] uppercase tracking-widest font-bold">ROTTERDAM</span>
                    <span className="text-[9px] px-1 bg-stone-300 font-bold">LIMITED</span>
                  </div>
                  {/* Heavy Brutalist Blocks */}
                  <div className="my-auto grid grid-cols-2 gap-1.5">
                    <div className="h-16 bg-stone-800"></div>
                    <div className="h-16 bg-stone-400"></div>
                    <div className="h-10 bg-[#9d4229] col-span-2"></div>
                  </div>
                  <div>
                    <span className="font-headline text-xl block leading-tight">
                      Monolith: Concrete
                    </span>
                    <span className="text-[10px] text-stone-600 uppercase tracking-wider">
                      Anouk Van Dijk
                    </span>
                  </div>
                  <div className="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)] pointer-events-none"></div>
                </div>

                <div className="flex items-center justify-between text-[#47464b] mb-1">
                  <span className="px-1.5 py-0.5 bg-[#eeedf7] text-[10px] uppercase tracking-wide">
                    Slipcase Edition
                  </span>
                  <div className="flex items-center text-[#9d4229] text-[12px]">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className="material-symbols-outlined text-[14px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                    ))}
                  </div>
                </div>
                <h3
                  onClick={() => openQuickLook(staffSelections[2])}
                  className="font-headline text-lg text-[#1a1b22] hover:text-[#9d4229] cursor-pointer"
                >
                  Monolith: Concrete
                </h3>
                <p className="text-xs text-[#47464b] mb-2">Anouk Van Dijk</p>
              </div>

              <div className="pt-2">
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-base font-bold text-[#1a1b22] tabular-nums">
                    {formatPrice(54.0)}
                  </span>
                  <span className="text-[11px] text-[#77767b]">Numbered / 300</span>
                </div>
                <button
                  onClick={() => addToCart(staffSelections[2])}
                  className="w-full py-2.5 bg-[#000000] hover:bg-[#1b1b1e] text-white text-[11px] uppercase tracking-widest font-semibold transition-colors flex items-center justify-center gap-1.5"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">shopping_bag</span> Add to
                  Bag
                </button>
              </div>
            </div>

            {/* Book 4: The Epistolary Fragment */}
            <div className="bg-white p-4 flex flex-col justify-between shadow-xs group hover:shadow-md transition-shadow">
              <div>
                <div
                  onClick={() => openQuickLook(staffSelections[3])}
                  className="relative w-full aspect-[3/4] bg-[#2d3032] mb-4 overflow-hidden flex flex-col justify-between p-5 text-white shadow-inner cursor-pointer"
                >
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] uppercase tracking-widest text-stone-300">
                      PARIS • FOLIO
                    </span>
                    <span className="text-[9px] text-[#fd8c6c] font-bold">EX LIBRIS</span>
                  </div>
                  {/* Typography interplay */}
                  <div className="my-auto py-2">
                    <span className="font-headline text-2xl italic text-stone-300 block font-light leading-none">
                      “Il n'y a pas
                    </span>
                    <span className="font-headline text-2xl text-stone-100 block font-light leading-none pl-4">
                      de vide.”
                    </span>
                    <div className="w-12 h-px bg-stone-500 mt-3"></div>
                  </div>
                  <div>
                    <span className="font-headline text-xl block leading-tight">
                      The Epistolary Fragment
                    </span>
                    <span className="text-[10px] text-stone-400 uppercase tracking-wider">
                      Camille Laurent
                    </span>
                  </div>
                  <div className="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] pointer-events-none"></div>
                </div>

                <div className="flex items-center justify-between text-[#47464b] mb-1">
                  <span className="px-1.5 py-0.5 bg-[#eeedf7] text-[10px] uppercase tracking-wide">
                    Letterpress Foil
                  </span>
                  <div className="flex items-center text-[#9d4229] text-[12px]">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className="material-symbols-outlined text-[14px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                    ))}
                  </div>
                </div>
                <h3
                  onClick={() => openQuickLook(staffSelections[3])}
                  className="font-headline text-lg text-[#1a1b22] hover:text-[#9d4229] cursor-pointer"
                >
                  The Epistolary Fragment
                </h3>
                <p className="text-xs text-[#47464b] mb-2">Camille Laurent</p>
              </div>

              <div className="pt-2">
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-base font-bold text-[#1a1b22] tabular-nums">
                    {formatPrice(29.0)}
                  </span>
                  <span className="text-[11px] text-[#77767b]">Bilingual Edition</span>
                </div>
                <button
                  onClick={() => addToCart(staffSelections[3])}
                  className="w-full py-2.5 bg-[#000000] hover:bg-[#1b1b1e] text-white text-[11px] uppercase tracking-widest font-semibold transition-colors flex items-center justify-center gap-1.5"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">shopping_bag</span> Add to
                  Bag
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: THEMATIC EDITORIAL COLLECTION FEATURE */}
      <section className="max-w-[1440px] mx-auto w-full px-6 md:px-12 py-12">
        <div className="bg-[#eeedf7] p-6 lg:p-10 relative overflow-hidden">
          {/* Decorative background typographic watermark */}
          <div className="absolute -right-10 -bottom-10 font-headline text-[140px] text-[#e3e1ec] select-none pointer-events-none opacity-40 leading-none">
            PRESSES
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Publisher Manifesto & Editorial Quote (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-white text-[10px] uppercase tracking-widest text-[#1a1b22] font-semibold">
                <span className="w-1.5 h-1.5 bg-[#9d4229]"></span> Feature Dossier
              </div>
              <h2 className="font-headline text-3xl sm:text-4xl text-[#1a1b22] leading-tight">
                Independent Art & Architecture Presses
              </h2>
              <blockquote className="font-headline text-xl italic text-[#47464b] font-normal leading-relaxed">
                “In an age of instantaneous and disposable imagery, the archival art monograph remains the last sovereign territory of uncompromised tactile contemplation.”
              </blockquote>
              <div className="flex items-center gap-2 pt-1">
                <div className="w-8 h-px bg-[#9d4229]"></div>
                <p className="text-[11px] text-[#1a1b22] uppercase tracking-wider font-semibold">
                  Julian Keller • Director, Verlag für Moderne Kunst
                </p>
              </div>
              <p className="text-sm text-[#47464b] leading-relaxed">
                We inspect small-run publishing workshops from Basel, Marseille, and Leipzig. These monograph volumes are bound with unbleached bookbinder’s thread, printed on bespoke cast-coated papers, and cataloged for lifetime preservation.
              </p>
              <div className="pt-2 flex items-center gap-4">
                <button
                  onClick={() => {
                    setCatalogCategory('Architecture & Design');
                    setCurrentPage('catalog');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-5 py-3 bg-[#000000] text-white text-[11px] uppercase tracking-widest font-semibold hover:bg-[#1b1b1e] transition-colors inline-block"
                  type="button"
                >
                  Explore 46 Press Monographs
                </button>
                <span className="text-xs text-[#77767b]">Global Distribution</span>
              </div>
            </div>

            {/* 2 Featured Art Monographs Showcase (7 cols) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Monograph Card 1 */}
              <div className="bg-white p-4 shadow-xs flex flex-col justify-between">
                <div className="relative w-full aspect-[4/5] bg-stone-100 mb-4 overflow-hidden flex items-center justify-center p-6">
                  <div className="w-full h-full bg-stone-800 text-stone-200 p-4 flex flex-col justify-between shadow-lg">
                    <div className="flex justify-between text-[8px] uppercase tracking-widest text-stone-400">
                      <span>ATELIER BASEL</span>
                      <span>VOL. II</span>
                    </div>
                    <div className="text-center py-6">
                      <div className="w-16 h-16 mx-auto rounded-full bg-[#9d4229]/90 flex items-center justify-center text-white font-headline text-2xl">
                        Ø
                      </div>
                    </div>
                    <div>
                      <span className="font-headline text-lg block text-white">Sverre Fehn: Works</span>
                      <span className="text-[9px] text-stone-400 uppercase">1962–1997 Complete</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-[11px] text-[#77767b] mb-1">
                    <span>PRESS: BIRKHÄUSER</span>
                    <span className="font-semibold text-[#9d4229]">{formatPrice(82.0)}</span>
                  </div>
                  <h4 className="font-headline text-lg text-[#1a1b22]">
                    Sverre Fehn: The Poetic Horizon
                  </h4>
                  <p className="text-xs text-[#47464b] mb-2">Critical appraisal by Mari Hvattum</p>

                  <div className="bg-[#f4f2fd] p-2 text-[11px] text-[#47464b] space-y-1 mb-4">
                    <div className="flex justify-between">
                      <span className="text-[#77767b]">Dimensions:</span>
                      <span className="font-medium text-[#1a1b22]">240 × 310 mm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#77767b]">Pagination:</span>
                      <span className="font-medium text-[#1a1b22]">364 pp • 218 plates</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#77767b]">Publication:</span>
                      <span className="font-medium text-[#1a1b22]">Edition of 800 (Leipzig)</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      const b = BOOKS.find((x) => x.id === 'sverre-fehn-poetic-horizon');
                      if (b) openQuickLook(b);
                    }}
                    className="w-full py-2 bg-[#eeedf7] hover:bg-[#e8e7f1] text-[#1a1b22] text-[11px] uppercase tracking-wider font-semibold transition-colors"
                    type="button"
                  >
                    Inspect Specification
                  </button>
                </div>
              </div>

              {/* Monograph Card 2 */}
              <div className="bg-white p-4 shadow-xs flex flex-col justify-between">
                <div className="relative w-full aspect-[4/5] bg-stone-100 mb-4 overflow-hidden flex items-center justify-center p-6">
                  <div className="w-full h-full bg-stone-900 text-stone-200 p-4 flex flex-col justify-between shadow-lg">
                    <div className="flex justify-between text-[8px] uppercase tracking-widest text-stone-400">
                      <span>SPECTOR BOOKS</span>
                      <span>CAT. 41</span>
                    </div>
                    <div className="text-center py-6">
                      <div className="w-20 h-10 border border-stone-600 mx-auto flex items-center justify-center font-mono text-[10px] text-stone-300">
                        GRID / AXIS
                      </div>
                    </div>
                    <div>
                      <span className="font-headline text-lg block text-white">Spatial Grammars</span>
                      <span className="text-[9px] text-stone-400 uppercase">Swiss Graphic Typo</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-[11px] text-[#77767b] mb-1">
                    <span>PRESS: SPECTOR BOOKS</span>
                    <span className="font-semibold text-[#9d4229]">{formatPrice(68.0)}</span>
                  </div>
                  <h4 className="font-headline text-lg text-[#1a1b22]">
                    Spatial Grammars & Print
                  </h4>
                  <p className="text-xs text-[#47464b] mb-2">Edited by Arthur Niggli Archive</p>

                  <div className="bg-[#f4f2fd] p-2 text-[11px] text-[#47464b] space-y-1 mb-4">
                    <div className="flex justify-between">
                      <span className="text-[#77767b]">Dimensions:</span>
                      <span className="font-medium text-[#1a1b22]">210 × 280 mm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#77767b]">Pagination:</span>
                      <span className="font-medium text-[#1a1b22]">296 pp • 4-color litho</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#77767b]">Publication:</span>
                      <span className="font-medium text-[#1a1b22]">Zurich / London</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      const b = BOOKS.find((x) => x.id === 'spatial-grammars-print');
                      if (b) openQuickLook(b);
                    }}
                    className="w-full py-2 bg-[#eeedf7] hover:bg-[#e8e7f1] text-[#1a1b22] text-[11px] uppercase tracking-wider font-semibold transition-colors"
                    type="button"
                  >
                    Inspect Specification
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: CATEGORIZED BROWSE HIGHLIGHTS (Bento Division) */}
      <section className="max-w-[1440px] mx-auto w-full px-6 md:px-12 py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-2">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#77767b] block mb-1">
              Taxonomy of the Archive
            </span>
            <h2 className="font-headline text-3xl sm:text-4xl text-[#1a1b22]">Curated Categories</h2>
          </div>
          <p className="text-xs text-[#47464b]">
            Browse over 2,400 selected works segmented into scholarly disciplines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Category 1 */}
          <div
            onClick={() => {
              setCatalogCategory('Contemporary Fiction');
              setCurrentPage('catalog');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group relative bg-[#f4f2fd] hover:bg-[#eeedf7] p-6 transition-colors flex flex-col justify-between h-72 shadow-xs cursor-pointer"
          >
            <div className="flex justify-between items-start">
              <span className="text-[10px] uppercase tracking-widest text-[#77767b] group-hover:text-[#1a1b22] transition-colors">
                01 / FICTION
              </span>
              <span className="px-2 py-0.5 bg-white text-[#1a1b22] text-[10px] uppercase tracking-wider font-semibold shadow-xs">
                384 Works
              </span>
            </div>
            <div>
              <span className="material-symbols-outlined text-[36px] text-[#000000] mb-3 transition-transform group-hover:translate-x-1">
                import_contacts
              </span>
              <h3 className="font-headline text-2xl text-[#1a1b22] group-hover:text-[#9d4229] transition-colors">
                Contemporary Fiction
              </h3>
              <p className="text-xs text-[#47464b] mt-1 leading-relaxed">
                Translated prose, novellas, and European magical realism.
              </p>
            </div>
            <div className="flex items-center gap-1 text-[11px] uppercase tracking-widest text-[#1a1b22] font-semibold pt-1">
              <span>Enter Catalog</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            </div>
          </div>

          {/* Category 2 */}
          <div
            onClick={() => {
              setCatalogCategory('Architecture & Design');
              setCurrentPage('catalog');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group relative bg-[#f4f2fd] hover:bg-[#eeedf7] p-6 transition-colors flex flex-col justify-between h-72 shadow-xs cursor-pointer"
          >
            <div className="flex justify-between items-start">
              <span className="text-[10px] uppercase tracking-widest text-[#77767b] group-hover:text-[#1a1b22] transition-colors">
                02 / SPATIAL
              </span>
              <span className="px-2 py-0.5 bg-white text-[#1a1b22] text-[10px] uppercase tracking-wider font-semibold shadow-xs">
                210 Works
              </span>
            </div>
            <div>
              <span className="material-symbols-outlined text-[36px] text-[#000000] mb-3 transition-transform group-hover:translate-x-1">
                apartment
              </span>
              <h3 className="font-headline text-2xl text-[#1a1b22] group-hover:text-[#9d4229] transition-colors">
                Architecture & Objects
              </h3>
              <p className="text-xs text-[#47464b] mt-1 leading-relaxed">
                Brutalism, industrial craft, Japanese joinery, and design theory.
              </p>
            </div>
            <div className="flex items-center gap-1 text-[11px] uppercase tracking-widest text-[#1a1b22] font-semibold pt-1">
              <span>Enter Catalog</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            </div>
          </div>

          {/* Category 3 */}
          <div
            onClick={() => {
              setCatalogCategory('Essays & Criticism');
              setCurrentPage('catalog');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group relative bg-[#f4f2fd] hover:bg-[#eeedf7] p-6 transition-colors flex flex-col justify-between h-72 shadow-xs cursor-pointer"
          >
            <div className="flex justify-between items-start">
              <span className="text-[10px] uppercase tracking-widest text-[#77767b] group-hover:text-[#1a1b22] transition-colors">
                03 / CRITIQUE
              </span>
              <span className="px-2 py-0.5 bg-white text-[#1a1b22] text-[10px] uppercase tracking-wider font-semibold shadow-xs">
                175 Works
              </span>
            </div>
            <div>
              <span className="material-symbols-outlined text-[36px] text-[#000000] mb-3 transition-transform group-hover:translate-x-1">
                psychology
              </span>
              <h3 className="font-headline text-2xl text-[#1a1b22] group-hover:text-[#9d4229] transition-colors">
                Philosophical Inquiries
              </h3>
              <p className="text-xs text-[#47464b] mt-1 leading-relaxed">
                Phenomenology, aesthetic ontology, and epistemic fragments.
              </p>
            </div>
            <div className="flex items-center gap-1 text-[11px] uppercase tracking-widest text-[#1a1b22] font-semibold pt-1">
              <span>Enter Catalog</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            </div>
          </div>

          {/* Category 4 */}
          <div
            onClick={() => {
              setCatalogCategory('Poetics & Verse');
              setCurrentPage('catalog');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group relative bg-[#f4f2fd] hover:bg-[#eeedf7] p-6 transition-colors flex flex-col justify-between h-72 shadow-xs cursor-pointer"
          >
            <div className="flex justify-between items-start">
              <span className="text-[10px] uppercase tracking-widest text-[#77767b] group-hover:text-[#1a1b22] transition-colors">
                04 / VERSE
              </span>
              <span className="px-2 py-0.5 bg-white text-[#1a1b22] text-[10px] uppercase tracking-wider font-semibold shadow-xs">
                142 Works
              </span>
            </div>
            <div>
              <span className="material-symbols-outlined text-[36px] text-[#000000] mb-3 transition-transform group-hover:translate-x-1">
                format_quote
              </span>
              <h3 className="font-headline text-2xl text-[#1a1b22] group-hover:text-[#9d4229] transition-colors">
                Visual Poetry
              </h3>
              <p className="text-xs text-[#47464b] mt-1 leading-relaxed">
                Concrete verse, typographic chapbooks, and lyrical prints.
              </p>
            </div>
            <div className="flex items-center gap-1 text-[11px] uppercase tracking-widest text-[#1a1b22] font-semibold pt-1">
              <span>Enter Catalog</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: 'THE READING CLUB' LUXURY CALLOUT BANNER */}
      <section className="w-full bg-[#e8e7f1] py-12">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="bg-white p-6 md:p-10 shadow-md relative overflow-hidden">
            {/* Left border accent strip (Terracotta Accent) */}
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#9d4229]"></div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Context & Invitation */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-[#ffdbd1] text-[#3b0900] text-[10px] uppercase tracking-widest font-bold">
                    Privileged Membership
                  </span>
                  <span className="text-[#77767b] text-[10px] tracking-widest uppercase">
                    Cohort VII Opening
                  </span>
                </div>
                <h2 className="font-headline text-3xl sm:text-5xl text-[#1a1b22] leading-tight">
                  The Folio Reading Club
                </h2>
                <p className="text-[17px] text-[#47464b] max-w-xl leading-relaxed">
                  An intimate circle of collectors, architects, and scholars receiving privileged first-press deliveries, critical essays, and private archival access.
                </p>

                {/* Perks Matrix */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-[#9d4229] text-[22px] flex-shrink-0">
                      edit_note
                    </span>
                    <div>
                      <h4 className="text-sm text-[#1a1b22] font-semibold">Signed Editions</h4>
                      <p className="text-xs text-[#47464b] mt-0.5">
                        Guaranteed author-inscribed copies before general catalog release.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-[#9d4229] text-[22px] flex-shrink-0">
                      menu_book
                    </span>
                    <div>
                      <h4 className="text-sm text-[#1a1b22] font-semibold">Monthly Companion</h4>
                      <p className="text-xs text-[#47464b] mt-0.5">
                        32-page letterpress journal detailing critical context & typography.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-[#9d4229] text-[22px] flex-shrink-0">
                      lock_open_right
                    </span>
                    <div>
                      <h4 className="text-sm text-[#1a1b22] font-semibold">Private Archive</h4>
                      <p className="text-xs text-[#47464b] mt-0.5">
                        Early priority acquisition on rare out-of-print monograph lots.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Signup Input Box */}
              <div className="lg:col-span-5 bg-[#f4f2fd] p-6 shadow-xs">
                <h3 className="font-headline text-xl text-[#1a1b22] mb-1">Request An Invitation</h3>
                <p className="text-xs text-[#47464b] mb-4">
                  Admissions are reviewed bi-weekly to maintain small-press fulfillment balance.
                </p>

                {clubSubmitted ? (
                  <div className="p-6 bg-white text-center space-y-2 border border-[#c8c5cb]">
                    <span className="material-symbols-outlined text-[#9d4229] text-[32px]">
                      check_circle
                    </span>
                    <h4 className="font-headline text-lg text-[#1a1b22]">Invitation Requested ✓</h4>
                    <p className="text-xs text-[#47464b]">
                      Thank you, {clubForm.name || 'Scholar'}. Your dossier has been entered into Cohort VII review.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleClubSubmit} className="space-y-3">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-[#77767b] mb-1 font-semibold">
                        Full Legal Name
                      </label>
                      <input
                        required
                        type="text"
                        value={clubForm.name}
                        onChange={(e) => setClubForm({ ...clubForm, name: e.target.value })}
                        placeholder="Elena Rostova"
                        className="w-full bg-white px-3 py-2.5 text-xs text-[#1a1b22] placeholder:text-[#c8c5cb] focus:outline-none focus:bg-[#eeedf7] transition-colors border border-[#eeedf7]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-[#77767b] mb-1 font-semibold">
                        Institutional or Correspondence Email
                      </label>
                      <input
                        required
                        type="email"
                        value={clubForm.email}
                        onChange={(e) => setClubForm({ ...clubForm, email: e.target.value })}
                        placeholder="rostova@atelier-arch.ch"
                        className="w-full bg-white px-3 py-2.5 text-xs text-[#1a1b22] placeholder:text-[#c8c5cb] focus:outline-none focus:bg-[#eeedf7] transition-colors border border-[#eeedf7]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-[#77767b] mb-1 font-semibold">
                        Primary Discipline / Focus
                      </label>
                      <select
                        value={clubForm.discipline}
                        onChange={(e) => setClubForm({ ...clubForm, discipline: e.target.value })}
                        className="w-full bg-white px-3 py-2.5 text-xs text-[#1a1b22] focus:outline-none focus:bg-[#eeedf7] transition-colors border border-[#eeedf7]"
                      >
                        <option>Architecture & Urban Morphology</option>
                        <option>Critical Literary Poetics</option>
                        <option>Fine Art & Lithography</option>
                        <option>Independent Monograph Collector</option>
                      </select>
                    </div>
                    <div className="pt-1">
                      <button
                        type="submit"
                        className="w-full py-3 bg-[#9d4229] hover:bg-[#74240d] text-white text-[11px] uppercase tracking-widest font-semibold transition-colors flex items-center justify-center gap-2"
                      >
                        <span>Submit Membership Dossier</span>
                        <span className="material-symbols-outlined text-[16px]">north_east</span>
                      </button>
                    </div>
                    <p className="text-[10px] text-center text-[#77767b] uppercase tracking-wider pt-1">
                      Membership dues: $45 / quarter • Cancel anytime
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
