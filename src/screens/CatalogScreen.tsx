import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { BOOKS } from '../data/books';
import { Book } from '../types';

export const CatalogScreen: React.FC = () => {
  const {
    formatPrice,
    addToCart,
    openQuickLook,
    navigateToBook,
    setArchivistOpen,
    catalogCategory,
    setCatalogCategory
  } = useStore();

  const [sortOption, setSortOption] = useState("Curator's Pick");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTag, setSearchTag] = useState('Monograph');
  const [selectedFormats, setSelectedFormats] = useState<string[]>([
    'Hardcover',
    'Linen Clothbound'
  ]);
  const [selectedEra, setSelectedEra] = useState<string>('2020s');
  const [maxPrice, setMaxPrice] = useState<number>(140);
  const [inStockOnly, setInStockOnly] = useState<boolean>(true);
  const [numberedOnly, setNumberedOnly] = useState<boolean>(false);
  const [currentPageNum, setCurrentPageNum] = useState<number>(1);

  // Discipline items
  const disciplines = [
    { name: 'All Volumes', count: 148 },
    { name: 'Architecture & Design', count: 42 },
    { name: 'Essays & Criticism', count: 36 },
    { name: 'Contemporary Fiction', count: 39 },
    { name: 'Poetics & Verse', count: 19 },
    { name: 'Rare & Antiquarian', count: 12 }
  ];

  const handleResetFilters = () => {
    setCatalogCategory('All Volumes');
    setSelectedFormats(['Hardcover', 'Linen Clothbound']);
    setSelectedEra('2020s');
    setMaxPrice(140);
    setInStockOnly(true);
    setNumberedOnly(false);
    setSearchTag('');
  };

  const toggleFormat = (fmt: string) => {
    setSelectedFormats((prev) =>
      prev.includes(fmt) ? prev.filter((f) => f !== fmt) : [...prev, fmt]
    );
  };

  // Filter books
  const filteredBooks = useMemo(() => {
    return BOOKS.filter((book) => {
      // Category filter
      if (catalogCategory !== 'All Volumes' && book.discipline !== catalogCategory) {
        return false;
      }
      // Price filter
      if (book.price > maxPrice) {
        return false;
      }
      // Numbered filter
      if (numberedOnly && !book.isNumbered) {
        return false;
      }
      return true;
    });
  }, [catalogCategory, maxPrice, numberedOnly]);

  // Sort books
  const sortedBooks = useMemo(() => {
    const list = [...filteredBooks];
    if (sortOption === 'Price: Low to High') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'Price: High to Low') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'Most Acclaimed') {
      list.sort((a, b) => b.rating - a.rating);
    }
    return list;
  }, [filteredBooks, sortOption]);

  return (
    <div className="flex flex-col w-full">
      <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12 pb-12">
        {/* Breadcrumb & Top Bar Meta */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-[11px] text-[#47464b] uppercase tracking-widest font-semibold">
              <span className="hover:text-[#1a1b22] cursor-pointer">Catalog</span>
              <span className="text-[#c8c5cb]">/</span>
              <span className="text-[#1a1b22]">{catalogCategory}</span>
            </div>
            <div className="flex items-baseline gap-4 flex-wrap pt-1">
              <h1 className="font-headline text-3xl sm:text-4xl text-[#1a1b22] tracking-tight">
                The Library Archive
              </h1>
              <span className="text-xs text-[#47464b]">
                Showing <span className="font-semibold text-[#1a1b22]">148</span> curated editions
              </span>
            </div>
          </div>

          {/* Active Filters Pill Box & Sort Control */}
          <div className="flex flex-wrap items-center gap-2">
            {searchTag && (
              <div className="flex items-center gap-1.5 px-3 py-1 bg-[#eeedf7] text-[#1a1b22] text-[11px] uppercase tracking-wider font-semibold">
                <span>Search: {searchTag}</span>
                <button
                  onClick={() => setSearchTag('')}
                  className="material-symbols-outlined text-[14px] text-[#47464b] hover:text-[#1a1b22]"
                  type="button"
                  title="Clear search tag"
                >
                  close
                </button>
              </div>
            )}

            {/* Sort Select */}
            <div className="relative">
              <select
                aria-label="Sort editions by"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="appearance-none bg-[#f4f2fd] hover:bg-[#eeedf7] text-[11px] uppercase tracking-wider text-[#1a1b22] font-semibold pl-3 pr-8 py-2.5 cursor-pointer focus:outline-none transition-colors border border-[#eeedf7]"
              >
                <option>Curator’s Pick</option>
                <option>Newest Arrivals</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Most Acclaimed</option>
              </select>
              <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-[16px] text-[#47464b] pointer-events-none">
                expand_more
              </span>
            </div>

            {/* View Switcher */}
            <div className="flex items-center bg-[#f4f2fd] p-1 gap-1">
              <button
                onClick={() => setViewMode('grid')}
                aria-label="Grid View"
                className={`p-1.5 transition-all ${
                  viewMode === 'grid'
                    ? 'bg-white text-[#000000] shadow-xs font-bold'
                    : 'text-[#47464b] hover:text-[#1a1b22]'
                }`}
                type="button"
              >
                <span className="material-symbols-outlined text-[18px] block">grid_view</span>
              </button>
              <button
                onClick={() => setViewMode('list')}
                aria-label="List View"
                className={`p-1.5 transition-all ${
                  viewMode === 'list'
                    ? 'bg-white text-[#000000] shadow-xs font-bold'
                    : 'text-[#47464b] hover:text-[#1a1b22]'
                }`}
                type="button"
              >
                <span className="material-symbols-outlined text-[18px] block">view_agenda</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Workspace Layout: Filter Sidebar + Catalog Canvas */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Filter Sidebar: 280px Desktop Fixed Column */}
          <aside className="w-full lg:w-[280px] shrink-0 bg-white p-5 shadow-xs space-y-6 border border-[#eeedf7]">
            <div className="flex items-center justify-between pb-1 border-b border-[#eeedf7]">
              <span className="text-[11px] uppercase tracking-widest text-[#1a1b22] font-bold">
                Refine By
              </span>
              <button
                onClick={handleResetFilters}
                className="text-[11px] text-[#9d4229] hover:text-[#74240d] transition-colors uppercase tracking-wider underline font-semibold"
                type="button"
              >
                Reset All
              </button>
            </div>

            {/* Category / Discipline Accordion */}
            <div className="space-y-2">
              <label className="block text-[11px] uppercase tracking-wider text-[#47464b] font-bold">
                Discipline
              </label>
              <nav className="flex flex-col space-y-1">
                {disciplines.map((d) => (
                  <button
                    key={d.name}
                    onClick={() => setCatalogCategory(d.name)}
                    className={`w-full text-left px-2.5 py-1.5 text-xs transition-colors flex items-center justify-between ${
                      catalogCategory === d.name
                        ? 'bg-[#eeedf7] text-[#1a1b22] font-semibold'
                        : 'text-[#47464b] hover:bg-[#f4f2fd] hover:text-[#1a1b22]'
                    }`}
                    type="button"
                  >
                    <span>{d.name}</span>
                    <span className="text-[10px] text-[#77767b]">{d.count}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Binding / Format Checkboxes */}
            <div className="space-y-2 pt-1 border-t border-[#eeedf7]">
              <label className="block text-[11px] uppercase tracking-wider text-[#47464b] font-bold pt-2">
                Format & Pressing
              </label>
              <div className="space-y-2 text-xs">
                {[
                  { label: 'Hardcover', count: 84 },
                  { label: 'Linen Clothbound', count: 28 },
                  { label: 'Softcover / Paperback', count: 42 },
                  { label: 'Signed Limited Pressing', count: 14 }
                ].map((item) => (
                  <label
                    key={item.label}
                    className="flex items-center justify-between cursor-pointer group select-none"
                  >
                    <span className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedFormats.includes(item.label)}
                        onChange={() => toggleFormat(item.label)}
                        className="w-4 h-4 rounded-none accent-[#000000] cursor-pointer"
                      />
                      <span className="text-[#1a1b22] group-hover:text-[#9d4229] transition-colors">
                        {item.label}
                      </span>
                    </span>
                    <span className="text-[10px] text-[#77767b]">{item.count}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Publication Epoch */}
            <div className="space-y-2 pt-1 border-t border-[#eeedf7]">
              <label className="block text-[11px] uppercase tracking-wider text-[#47464b] font-bold pt-2">
                Publication Era
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {['2020s', '2010s', 'Classics'].map((era) => (
                  <button
                    key={era}
                    onClick={() => setSelectedEra(era)}
                    className={`py-1.5 text-center text-[10px] uppercase tracking-wider font-semibold transition-colors ${
                      selectedEra === era
                        ? 'bg-[#000000] text-white'
                        : 'bg-[#eeedf7] hover:bg-[#e8e7f1] text-[#1a1b22]'
                    }`}
                    type="button"
                  >
                    {era}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Slider */}
            <div className="space-y-2 pt-1 border-t border-[#eeedf7]">
              <div className="flex items-center justify-between pt-2">
                <label className="text-[11px] uppercase tracking-wider text-[#47464b] font-bold">
                  Valuation
                </label>
                <span className="text-xs text-[#1a1b22] tabular-nums font-semibold">
                  $15 — ${maxPrice}
                </span>
              </div>
              <input
                type="range"
                min="15"
                max="220"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-1 bg-[#e3e1ec] accent-[#000000] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#77767b]">
                <span>$15</span>
                <span>$220+</span>
              </div>
            </div>

            {/* Studio Availability Toggles */}
            <div className="space-y-2 pt-1 border-t border-[#eeedf7]">
              <label className="block text-[11px] uppercase tracking-wider text-[#47464b] font-bold pt-2">
                Provenance
              </label>
              <div className="space-y-2 text-xs">
                <label className="flex items-center justify-between cursor-pointer select-none">
                  <span className="text-[#1a1b22]">In Stock at Studio</span>
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="w-4 h-4 accent-[#000000] cursor-pointer"
                  />
                </label>
                <label className="flex items-center justify-between cursor-pointer select-none">
                  <span className="text-[#1a1b22]">Numbered Editions Only</span>
                  <input
                    type="checkbox"
                    checked={numberedOnly}
                    onChange={(e) => setNumberedOnly(e.target.checked)}
                    className="w-4 h-4 accent-[#000000] cursor-pointer"
                  />
                </label>
              </div>
            </div>

            {/* Curatorial Certification Note */}
            <div className="bg-[#f4f2fd] p-3 space-y-1">
              <div className="flex items-center gap-1.5 text-[#9d4229]">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                <span className="text-[10px] uppercase font-bold tracking-wider">
                  Folio Certified
                </span>
              </div>
              <p className="text-[11px] leading-relaxed text-[#47464b]">
                Each edition is inspected in our Bloomsbury bindery for archival acid neutrality and binding tension.
              </p>
            </div>
          </aside>

          {/* Main Catalog Output Section */}
          <section className="flex-1 w-full space-y-8">
            {/* Books Gallery Grid / List */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
                {sortedBooks.map((book) => (
                  <article
                    key={book.id}
                    className="group flex flex-col bg-white p-3 transition-all duration-200 hover:shadow-md border border-[#eeedf7]"
                  >
                    {/* Cover Frame */}
                    <div className="relative w-full aspect-[3/4] bg-[#eeedf7] overflow-hidden mb-3">
                      {book.coverImage ? (
                        <img
                          alt={book.title}
                          src={book.coverImage}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 cursor-pointer"
                          onClick={() => navigateToBook(book.id)}
                        />
                      ) : (
                        <div
                          onClick={() => navigateToBook(book.id)}
                          className="w-full h-full p-4 flex flex-col justify-between cursor-pointer"
                          style={{
                            backgroundColor: book.customGeometricCover?.bgColor || '#1c1917',
                            color: '#ffffff'
                          }}
                        >
                          <span className="text-[8px] uppercase tracking-widest text-stone-400">
                            {book.customGeometricCover?.pressName || book.publisher}
                          </span>
                          <h4 className="font-headline text-lg">{book.title}</h4>
                          <span className="text-[10px] text-stone-400">{book.author}</span>
                        </div>
                      )}

                      {/* Badge Top Left */}
                      {book.badge && (
                        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10 pointer-events-none">
                          <span
                            className={`px-2 py-0.5 text-[9px] uppercase tracking-widest font-bold shadow-xs ${
                              book.badge === '1st Edition'
                                ? 'bg-[#9d4229] text-white'
                                : book.badge === 'Limited Run'
                                  ? 'bg-[#000000] text-white'
                                  : 'bg-white/90 backdrop-blur-sm text-[#1a1b22]'
                            }`}
                          >
                            {book.badge}
                          </span>
                        </div>
                      )}

                      {/* Action Tray Hover Overlay */}
                      <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-center gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-200 z-10">
                        <button
                          onClick={() => openQuickLook(book)}
                          className="px-2.5 py-1.5 bg-white text-[#1a1b22] text-[10px] uppercase tracking-wider font-semibold hover:bg-[#e3e1ec] transition-colors"
                          type="button"
                        >
                          Quick View
                        </button>
                        <button
                          onClick={() => addToCart(book)}
                          className="px-2.5 py-1.5 bg-[#9d4229] text-white text-[10px] uppercase tracking-wider font-semibold hover:bg-[#74240d] transition-colors flex items-center gap-1"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[13px]">add</span> Bag
                        </button>
                      </div>
                    </div>

                    {/* Book Metadata */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[11px] text-[#47464b] block mb-0.5">
                          {book.author}
                        </span>
                        <h2
                          onClick={() => navigateToBook(book.id)}
                          className="font-headline text-[18px] leading-tight text-[#1a1b22] font-normal group-hover:text-[#9d4229] transition-colors cursor-pointer"
                        >
                          {book.title}
                        </h2>
                        <p className="text-[11px] text-[#77767b] mt-1 truncate">
                          {book.formatDetails || book.format}
                        </p>
                      </div>
                      <div className="pt-2 mt-3 flex items-center justify-between border-t border-[#eeedf7]">
                        <span className="text-sm font-semibold text-[#1a1b22] tabular-nums">
                          {formatPrice(book.price)}
                        </span>
                        <span className="text-[9px] text-[#9d4229] uppercase font-bold tracking-widest">
                          {book.stockStatus}
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              /* List View Mode */
              <div className="grid grid-cols-1 gap-4">
                {sortedBooks.map((book) => (
                  <article
                    key={book.id}
                    className="p-4 bg-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#eeedf7] hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-16 h-20 bg-[#eeedf7] flex-shrink-0 overflow-hidden shadow-xs">
                        {book.coverImage ? (
                          <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-[#1c1917] p-1 text-white text-[8px] flex items-center justify-center font-serif text-center">
                            {book.title}
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-[#77767b]">{book.author}</span>
                          {book.badge && (
                            <span className="px-1.5 py-0.5 bg-[#f4f2fd] text-[9px] uppercase font-bold text-[#9d4229]">
                              {book.badge}
                            </span>
                          )}
                        </div>
                        <h3
                          onClick={() => navigateToBook(book.id)}
                          className="font-headline text-xl text-[#1a1b22] hover:text-[#9d4229] cursor-pointer"
                        >
                          {book.title}
                        </h3>
                        <p className="text-xs text-[#47464b]">{book.formatDetails || book.format}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <span className="text-base font-bold text-[#1a1b22] tabular-nums">
                          {formatPrice(book.price)}
                        </span>
                        <span className="block text-[9px] text-[#9d4229] uppercase tracking-wider font-semibold">
                          {book.stockStatus}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openQuickLook(book)}
                          className="px-3 py-2 bg-[#f4f2fd] hover:bg-[#eeedf7] text-[#1a1b22] text-xs font-semibold uppercase tracking-wider"
                        >
                          Inspect
                        </button>
                        <button
                          onClick={() => addToCart(book)}
                          className="px-3 py-2 bg-[#000000] hover:bg-[#1b1b1e] text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-1"
                        >
                          <span className="material-symbols-outlined text-[14px]">shopping_bag</span>
                          Add
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* Curatorial Archival Break / Feature Callout */}
            <div className="p-6 md:p-8 bg-[#eeedf7] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
              <div className="space-y-1 max-w-xl">
                <span className="text-[10px] uppercase tracking-widest text-[#9d4229] font-bold">
                  From the Folio Rare Book Room
                </span>
                <h3 className="font-headline text-2xl text-[#1a1b22]">
                  Seeking out of print or first edition pressings?
                </h3>
                <p className="text-xs text-[#47464b] leading-relaxed">
                  Our Bloomsbury archivists source authenticated first impressions and out-of-print architectural monographs worldwide upon requisition.
                </p>
              </div>
              <button
                onClick={() => setArchivistOpen(true)}
                className="shrink-0 px-6 py-3 bg-[#000000] hover:bg-[#1b1b1e] text-white text-[11px] uppercase tracking-wider font-semibold transition-colors shadow-xs"
                type="button"
              >
                Inquire with Archivist
              </button>
            </div>

            {/* Pagination & View Status */}
            <div className="pt-4 pb-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#eeedf7]">
              <span className="text-xs text-[#47464b]">
                Showing <span className="font-semibold text-[#1a1b22]">{sortedBooks.length}</span> of{' '}
                <span className="font-semibold text-[#1a1b22]">148</span> archival volumes
              </span>

              {/* Numbered Pagination */}
              <nav aria-label="Pagination" className="flex items-center gap-1 text-xs">
                {[1, 2, 3].map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPageNum(page)}
                    className={`w-9 h-9 flex items-center justify-center font-semibold ${
                      currentPageNum === page
                        ? 'bg-[#000000] text-white'
                        : 'bg-[#f4f2fd] hover:bg-[#eeedf7] text-[#1a1b22] transition-colors'
                    }`}
                    type="button"
                  >
                    {page}
                  </button>
                ))}
                <span className="w-7 h-9 flex items-center justify-center text-[#77767b] tracking-widest">
                  …
                </span>
                <button
                  onClick={() => setCurrentPageNum(12)}
                  className="w-9 h-9 flex items-center justify-center bg-[#f4f2fd] hover:bg-[#eeedf7] text-[#1a1b22] transition-colors font-semibold"
                  type="button"
                >
                  12
                </button>
                <button
                  onClick={() => setCurrentPageNum((p) => Math.min(12, p + 1))}
                  className="px-3 h-9 flex items-center gap-1 bg-[#f4f2fd] hover:bg-[#eeedf7] text-[#1a1b22] transition-colors uppercase tracking-wider font-semibold ml-1 text-[11px]"
                  type="button"
                >
                  <span>Next</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </nav>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
