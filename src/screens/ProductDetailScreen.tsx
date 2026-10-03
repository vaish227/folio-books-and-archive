import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { BOOKS } from '../data/books';

export const ProductDetailScreen: React.FC = () => {
  const {
    selectedBook,
    addToCart,
    formatPrice,
    toggleWishlist,
    wishlist,
    showToast,
    setCurrentPage,
    navigateToBook
  } = useStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedFormatIndex, setSelectedFormatIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [shareCopied, setShareCopied] = useState(false);
  const [alertAdded, setAlertAdded] = useState(false);

  // Accordion open states
  const [openAccordion, setOpenAccordion] = useState<string | null>('synopsis');

  const book = selectedBook || BOOKS[0];
  const isWishlisted = wishlist.includes(book.id);

  // Available formats
  const formats = book.editionFormats || [
    {
      id: 'clothbound',
      name: 'Deluxe Clothbound',
      description: 'Ecru woven linen, debossed copper foil, Smyth-sewn binding.',
      price: book.price
    },
    {
      id: 'slipcase',
      name: "Slipcase Collector's Edition",
      description: 'Hand-crafted rigid slipcase, numbered bookplate signed by author.',
      price: 85.0,
      badge: 'Numbered'
    },
    {
      id: 'digital',
      name: 'Digital Companion PDF & EPUB',
      description: 'High-fidelity 1200dpi spreads optimized for large displays. Instant download.',
      price: 18.0
    }
  ];

  const currentUnitPrice = formats[selectedFormatIndex]?.price ?? book.price;
  const currentTotalPrice = (currentUnitPrice * quantity).toFixed(2);

  const galleryImages = book.galleryImages && book.galleryImages.length > 0
    ? book.galleryImages
    : [
        book.coverImage || BOOKS[0].coverImage,
        BOOKS[0].galleryImages?.[1] || '',
        BOOKS[0].galleryImages?.[2] || '',
        BOOKS[0].galleryImages?.[3] || '',
        BOOKS[0].galleryImages?.[4] || ''
      ].filter(Boolean);

  const plateLabels = [
    'Plate 01 · Primary Cover',
    'Plate 02 · Interior Spread',
    'Plate 03 · Bound Spine',
    'Plate 04 · Colophon & Collation',
    'Plate 05 · Rigid Slipcase Box'
  ];

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setShareCopied(true);
      showToast('Collation catalog link copied to clipboard.');
      setTimeout(() => setShareCopied(false), 2500);
    }
  };

  // GITHUB_ISSUE #42: [Bug] Selected format tier price is ignored when adding to bag.
  // Reproduce: Select "Slipcase Collector's Edition ($85.00)", click "Add to Bag".
  // Notice the bag registers the item at $48.00 (book.price) instead of $85.00 (chosenFormat.price).
  const handleAddCurrentToBag = () => {
    const chosenFormat = formats[selectedFormatIndex];
    for (let i = 0; i < quantity; i++) {
      // BUG: Passing book.price instead of chosenFormat.price
      addToCart(book, chosenFormat.name, book.price);
    }
    setAlertAdded(true);
    setTimeout(() => setAlertAdded(false), 4000);
  };

  // 3 recommendations from data
  const recommendations = [
    BOOKS.find((b) => b.id === 'monolithic-space') || BOOKS[16],
    BOOKS.find((b) => b.id === 'the-shadows-edge') || BOOKS[17],
    BOOKS.find((b) => b.id === 'tacit-knowledge') || BOOKS[18]
  ];

  return (
    <div className="flex flex-col w-full">
      {/* BREADCRUMB & METADATA BAR */}
      <section className="w-full bg-white border-b border-[#eeedf7]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-3 flex flex-wrap items-center justify-between gap-4">
          <nav className="flex items-center gap-2 text-xs text-[#47464b]">
            <button
              onClick={() => setCurrentPage('home')}
              className="hover:text-[#1a1b22] transition-colors"
            >
              Home
            </button>
            <span className="text-[#c8c5cb]">/</span>
            <button
              onClick={() => setCurrentPage('catalog')}
              className="hover:text-[#1a1b22] transition-colors"
            >
              {book.discipline}
            </button>
            <span className="text-[#c8c5cb]">/</span>
            <button
              onClick={() => setCurrentPage('catalog')}
              className="hover:text-[#1a1b22] transition-colors"
            >
              Monographs
            </button>
            <span className="text-[#c8c5cb]">/</span>
            <span className="text-[#1a1b22] font-semibold truncate max-w-[220px] md:max-w-none">
              {book.title}
            </span>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#f4f2fd] hover:bg-[#eeedf7] text-[#1a1b22] text-[11px] uppercase tracking-wider font-semibold transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">
                {shareCopied ? 'done' : 'share'}
              </span>
              <span>{shareCopied ? 'Link Copied' : 'Share'}</span>
            </button>
            <button
              onClick={() => toggleWishlist(book.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#f4f2fd] hover:bg-[#eeedf7] text-[#1a1b22] text-[11px] uppercase tracking-wider font-semibold transition-colors"
              type="button"
            >
              <span
                className="material-symbols-outlined text-[16px] text-[#9d4229]"
                style={{ fontVariationSettings: isWishlisted ? "'FILL' 1" : "'FILL' 0" }}
              >
                {isWishlisted ? 'bookmark' : 'bookmark_border'}
              </span>
              <span>{isWishlisted ? 'Saved to Wishlist' : 'Save to Wishlist'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* MAIN PRODUCT SECTION: TWO-COLUMN EDITORIAL DISPLAY */}
      <section className="w-full bg-[#fbf8ff] py-10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* LEFT COLUMN: VISUAL GALLERY & TACTILE SHOWCASE (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {/* Main Display Frame */}
              <div className="relative w-full aspect-[4/5] bg-[#f4f2fd] p-8 flex items-center justify-center overflow-hidden shadow-xs border border-[#eeedf7]">
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-[#1a1b22] text-[10px] uppercase tracking-widest font-semibold shadow-xs">
                    {plateLabels[activeImageIndex] || 'Plate 01 · Primary Cover'}
                  </span>
                </div>

                {/* Floating Texture Badge */}
                <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-[#9d4229]"></span>
                  <span className="text-[10px] uppercase tracking-wider text-[#1a1b22] font-semibold">
                    {book.specs?.paperStock || 'Fedrigoni Arena White 170gsm'}
                  </span>
                </div>

                {/* Main Book Canvas Visual */}
                <div className="relative w-full h-full max-h-[560px] flex items-center justify-center p-4">
                  <img
                    alt={book.title}
                    src={galleryImages[activeImageIndex] || book.coverImage}
                    className="w-auto h-full max-h-[500px] object-contain shadow-xl transform transition-transform duration-500 hover:scale-[1.02]"
                  />
                </div>
              </div>

              {/* Thumbnail Gallery Switcher */}
              <div className="grid grid-cols-5 gap-2">
                {galleryImages.slice(0, 5).map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`p-2 transition-all shadow-xs text-left border ${
                      activeImageIndex === idx
                        ? 'bg-[#f4f2fd] border-[#000000]'
                        : 'bg-white hover:bg-[#f4f2fd] border-[#eeedf7]'
                    }`}
                    type="button"
                  >
                    <div className="aspect-[3/4] w-full overflow-hidden bg-[#eeedf7]">
                      <img src={img} alt={`Plate 0${idx + 1}`} className="w-full h-full object-cover" />
                    </div>
                    <span
                      className={`block mt-1 text-[10px] uppercase truncate ${
                        activeImageIndex === idx
                          ? 'font-bold text-[#1a1b22]'
                          : 'text-[#47464b]'
                      }`}
                    >
                      {`0${idx + 1} ${['Cover', 'Spread', 'Spine', 'Colophon', 'Slipcase'][idx] || 'View'}`}
                    </span>
                  </button>
                ))}
              </div>

              {/* Archival Production Banner */}
              <div className="p-4 bg-[#f4f2fd] flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-xs border border-[#eeedf7]">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#9d4229] text-[20px]">
                    verified
                  </span>
                  <span className="text-[11px] uppercase tracking-wider text-[#1a1b22] font-semibold">
                    Printed in Verona, Italy · Fedrigoni Arena Paper · Strict Edition of 1,200 Copies
                  </span>
                </div>
                <span className="text-[11px] text-[#47464b] font-medium">
                  Archival Grade Acid-Free
                </span>
              </div>
            </div>

            {/* RIGHT COLUMN: PURCHASING, SPECIFICATIONS & ACTIONS (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {/* Edition Status & Category Tag */}
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 bg-[#ffdbd1] text-[#3b0900] text-[10px] uppercase tracking-widest font-bold">
                  1st Edition / Limited Stock (142 Left)
                </span>
                <span className="text-[10px] uppercase tracking-wider text-[#77767b] font-semibold">
                  FOLIO ARCHIVE #049
                </span>
              </div>

              {/* Header Titles */}
              <div className="pt-1">
                <h1 className="font-headline text-3xl sm:text-4xl font-normal tracking-tight text-[#1a1b22] leading-tight">
                  {book.title}
                </h1>
                <p className="font-headline text-xl text-[#47464b] mt-1 italic font-normal">
                  {book.subtitle || 'An Architecture of Quietude and Light'}
                </p>
              </div>

              {/* Author Attribution */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-1">
                <div className="text-sm text-[#1a1b22]">
                  By <span className="underline underline-offset-4 decoration-[#c8c5cb] font-semibold">{book.author}</span>
                  <span className="text-[#47464b]"> · {book.foreword || 'Foreword by Juhani Pallasmaa'}</span>
                </div>
              </div>

              {/* Rating & Verified Readers */}
              <div className="flex items-center gap-2 py-1.5 px-3 bg-[#f4f2fd] w-fit border border-[#eeedf7]">
                <div className="flex text-[#9d4229] text-[14px]">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined text-[16px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                </div>
                <span className="text-xs font-bold text-[#1a1b22]">{book.rating || 4.9}</span>
                <span className="text-xs text-[#47464b]">({book.reviewsCount || 48} verified readers)</span>
              </div>

              {/* Pricing Bar */}
              <div className="pt-2">
                <div className="flex items-baseline gap-2">
                  <span className="font-headline text-3xl text-[#1a1b22] font-semibold tabular-nums">
                    {formatPrice(currentUnitPrice)}
                  </span>
                  <span className="text-xs text-[#77767b]">
                    Import duties included · VAT calculated at checkout
                  </span>
                </div>
              </div>

              {/* Format / Edition Selection Radio Cards */}
              <div className="space-y-2 pt-2">
                <span className="block text-[11px] uppercase tracking-wider text-[#1a1b22] font-bold mb-2">
                  Select Binding & Format
                </span>

                {formats.map((fmt, fIdx) => (
                  <label
                    key={fmt.id}
                    onClick={() => setSelectedFormatIndex(fIdx)}
                    className={`block p-4 cursor-pointer transition-all shadow-xs border ${
                      selectedFormatIndex === fIdx
                        ? 'bg-[#f4f2fd] border-[#000000]'
                        : 'bg-white hover:bg-[#f4f2fd] border-[#eeedf7]'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <span
                          className={`w-4 h-4 mt-0.5 flex items-center justify-center flex-shrink-0 ${
                            selectedFormatIndex === fIdx ? 'bg-[#000000]' : 'bg-[#e3e1ec]'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 ${
                              selectedFormatIndex === fIdx ? 'bg-white' : 'bg-transparent'
                            }`}
                          ></span>
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-[#1a1b22] block">
                              {fmt.name}
                            </span>
                            {fmt.badge && (
                              <span className="px-1.5 py-0.5 bg-[#ffdbd1] text-[#7e2c14] text-[9px] uppercase tracking-wider font-bold">
                                {fmt.badge}
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-[#47464b] block mt-0.5">
                            {fmt.description}
                          </span>
                        </div>
                      </div>
                      <span className="text-sm font-semibold text-[#1a1b22] tabular-nums">
                        {formatPrice(fmt.price)}
                      </span>
                    </div>
                  </label>
                ))}
              </div>

              {/* Quantity & Action Controls */}
              <div className="pt-2 space-y-3">
                <div className="flex gap-3">
                  {/* Stepper */}
                  <div className="flex items-center bg-[#f4f2fd] px-2 py-1 border border-[#eeedf7]">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      aria-label="Decrease quantity"
                      className="w-8 h-8 flex items-center justify-center text-[#1a1b22] hover:bg-[#eeedf7] transition-colors text-lg font-bold"
                      type="button"
                    >
                      −
                    </button>
                    <span className="w-10 text-center text-sm text-[#1a1b22] font-semibold tabular-nums">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                      aria-label="Increase quantity"
                      className="w-8 h-8 flex items-center justify-center text-[#1a1b22] hover:bg-[#eeedf7] transition-colors text-lg font-bold"
                      type="button"
                    >
                      +
                    </button>
                  </div>

                  {/* Main Add to Bag CTA */}
                  <button
                    onClick={handleAddCurrentToBag}
                    className="flex-1 h-12 bg-[#000000] hover:bg-[#1b1b1e] text-white text-[12px] uppercase tracking-widest font-bold flex items-center justify-center gap-2 transition-colors shadow-md"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                    <span>Add to Bag — {formatPrice(Number(currentTotalPrice))}</span>
                  </button>
                </div>

                {/* Instant Express Checkout */}
                <button
                  onClick={() => {
                    handleAddCurrentToBag();
                    setCurrentPage('cart');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full h-12 bg-white hover:bg-[#f4f2fd] text-[#1a1b22] text-[12px] uppercase tracking-widest font-bold flex items-center justify-center gap-2 transition-colors shadow-xs border border-[#c8c5cb]"
                  type="button"
                >
                  <span className="text-xs lowercase italic font-serif">buy with</span>
                  <span className="font-bold tracking-tight">Pay</span>
                </button>
              </div>

              {/* Shipping & Guarantee Micro-Perks */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                <div className="p-3 bg-white flex items-center gap-2 shadow-xs border border-[#eeedf7]">
                  <span className="material-symbols-outlined text-[18px] text-[#9d4229]">
                    local_shipping
                  </span>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-[#1a1b22] font-bold">
                      Complimentary
                    </p>
                    <p className="text-[10px] text-[#77767b]">On orders over $75</p>
                  </div>
                </div>
                <div className="p-3 bg-white flex items-center gap-2 shadow-xs border border-[#eeedf7]">
                  <span className="material-symbols-outlined text-[18px] text-[#9d4229]">
                    inventory_2
                  </span>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-[#1a1b22] font-bold">
                      Archival Box
                    </p>
                    <p className="text-[10px] text-[#77767b]">Free custom unboxing</p>
                  </div>
                </div>
                <div className="p-3 bg-white flex items-center gap-2 shadow-xs border border-[#eeedf7]">
                  <span className="material-symbols-outlined text-[18px] text-[#9d4229]">eco</span>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-[#1a1b22] font-bold">
                      Carbon Neutral
                    </p>
                    <p className="text-[10px] text-[#77767b]">100% offset transit</p>
                  </div>
                </div>
              </div>

              {/* Notification feedback banner */}
              {alertAdded && (
                <div className="p-3 bg-[#eeedf7] text-[#1a1b22] flex items-center justify-between shadow-xs border-l-2 border-[#9d4229] animate-in fade-in">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#9d4229] text-[18px]">
                      check_circle
                    </span>
                    <span className="text-xs font-semibold">Added to your library bag</span>
                  </div>
                  <button
                    onClick={() => {
                      setCurrentPage('cart');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-[11px] uppercase tracking-wider text-[#9d4229] font-bold hover:underline"
                  >
                    View Bag
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* EDITORIAL ACCORDIONS & BIBLIOGRAPHIC DOSSIER */}
      <section className="w-full bg-white py-12 border-t border-[#eeedf7]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Info Column (4 cols) */}
            <div className="lg:col-span-4 flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#9d4229] font-bold block mb-2">
                  Editorial Dossier
                </span>
                <h2 className="font-headline text-3xl font-normal tracking-tight text-[#1a1b22]">
                  Critical Inquiry & Technical Lineage
                </h2>
                <p className="text-sm text-[#47464b] mt-3 max-w-sm leading-relaxed">
                  Folio Monographs document significant architectural practices through uncompromised photography, tactile materials, and scholarly analysis.
                </p>
              </div>

              {/* Colophon Stamp */}
              <div className="hidden lg:block p-5 bg-[#f4f2fd] max-w-xs shadow-xs border border-[#eeedf7] mt-8">
                <span className="text-[10px] uppercase tracking-widest text-[#77767b] block font-semibold">
                  Folio Colophon
                </span>
                <p className="font-headline text-lg italic text-[#1a1b22] mt-1">Ex Libris Veritate</p>
                <p className="text-xs text-[#47464b] mt-2 leading-relaxed">
                  Typeset in Minion and Swiss Neue Grotesk. Printed with vegetable-based inks in northern Italy.
                </p>
              </div>
            </div>

            {/* Accordions Right Column (8 cols) */}
            <div className="lg:col-span-8 space-y-3">
              {/* Accordion 1: Synopsis & Excerpt */}
              <div className="bg-[#fbf8ff] shadow-xs overflow-hidden border border-[#eeedf7]">
                <button
                  onClick={() =>
                    setOpenAccordion(openAccordion === 'synopsis' ? null : 'synopsis')
                  }
                  className="w-full p-5 flex items-center justify-between text-left hover:bg-[#f4f2fd] transition-colors"
                  type="button"
                >
                  <span className="font-headline text-xl text-[#1a1b22] flex items-center gap-3">
                    <span className="text-xs text-[#9d4229] font-bold">01</span>
                    Synopsis & Excerpt
                  </span>
                  <span
                    className={`material-symbols-outlined text-[#1a1b22] transition-transform duration-300 ${
                      openAccordion === 'synopsis' ? 'rotate-180' : ''
                    }`}
                  >
                    expand_more
                  </span>
                </button>
                {openAccordion === 'synopsis' && (
                  <div className="px-5 pb-6 pt-1 animate-in fade-in">
                    <div className="space-y-4 text-sm text-[#47464b] leading-relaxed">
                      <p>
                        In <em className="text-[#1a1b22] font-serif">{book.title}</em>, architectural theorist {book.author} investigates eight remote sanctuaries, cloisters, and contemporary monoliths across Kyoto, Ticino, and the Vals valley. Stripping away the rhetorical noise of 21st-century hyper-connectivity, the book frames silence not as the absence of acoustic stimulus, but as a deliberate architectural envelope engineered through thermal mass, shadow gradations, and proportion.
                      </p>
                      <p>
                        Illustrated with over 160 unretouched high-contrast photographs printed via duotone lithography, this volume serves as both an aesthetic manifesto and a tactile tribute to architectural restraint.
                      </p>

                      {/* Expandable Excerpt Block */}
                      <div className="p-4 bg-[#f4f2fd] mt-2 border-l-2 border-[#9d4229]">
                        <div className="flex items-center gap-2 mb-2 text-[#9d4229]">
                          <span className="material-symbols-outlined text-[18px]">format_quote</span>
                          <span className="text-[10px] uppercase tracking-wider font-bold">
                            Excerpt from Chapter I: The Chamber of Low Sun
                          </span>
                        </div>
                        <blockquote className="font-headline text-lg italic text-[#1a1b22] leading-snug">
                          {book.excerpt?.quote ||
                            '“When light descends at five degrees across unhoned limestone, time ceases to be a measurement and converts into a material presence. We construct walls not to separate ourselves from the weather, but to give silence a vessel large enough to breathe.”'}
                        </blockquote>
                        <span className="block mt-2 text-[10px] uppercase tracking-wider text-[#77767b]">
                          {book.excerpt?.source || '— Elena Vane, page 42'}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Accordion 2: Bibliographic Specifications */}
              <div className="bg-[#fbf8ff] shadow-xs overflow-hidden border border-[#eeedf7]">
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'specs' ? null : 'specs')}
                  className="w-full p-5 flex items-center justify-between text-left hover:bg-[#f4f2fd] transition-colors"
                  type="button"
                >
                  <span className="font-headline text-xl text-[#1a1b22] flex items-center gap-3">
                    <span className="text-xs text-[#9d4229] font-bold">02</span>
                    Bibliographic Specifications
                  </span>
                  <span
                    className={`material-symbols-outlined text-[#1a1b22] transition-transform duration-300 ${
                      openAccordion === 'specs' ? 'rotate-180' : ''
                    }`}
                  >
                    expand_more
                  </span>
                </button>
                {openAccordion === 'specs' && (
                  <div className="px-5 pb-6 pt-1 animate-in fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 bg-[#f4f2fd] flex justify-between items-center">
                        <span className="text-[#47464b]">ISBN-13</span>
                        <span className="font-semibold text-[#1a1b22] font-mono">
                          {book.specs?.isbn || '978-0-123456-78-9'}
                        </span>
                      </div>
                      <div className="p-3 bg-[#f4f2fd] flex justify-between items-center">
                        <span className="text-[#47464b]">Pagination</span>
                        <span className="font-semibold text-[#1a1b22]">
                          {book.specs?.pagination || '288 pages (160 plates in duotone)'}
                        </span>
                      </div>
                      <div className="p-3 bg-[#f4f2fd] flex justify-between items-center">
                        <span className="text-[#47464b]">Trim Dimensions</span>
                        <span className="font-semibold text-[#1a1b22]">
                          {book.specs?.dimensions || '220 mm × 290 mm (Portrait)'}
                        </span>
                      </div>
                      <div className="p-3 bg-[#f4f2fd] flex justify-between items-center">
                        <span className="text-[#47464b]">Binding Standard</span>
                        <span className="font-semibold text-[#1a1b22]">
                          {book.specs?.binding || 'Smyth-sewn hardcover with linen sleeve'}
                        </span>
                      </div>
                      <div className="p-3 bg-[#f4f2fd] flex justify-between items-center">
                        <span className="text-[#47464b]">Paper Stock</span>
                        <span className="font-semibold text-[#1a1b22]">
                          {book.specs?.paperStock || 'Fedrigoni Arena White Smooth 170gsm'}
                        </span>
                      </div>
                      <div className="p-3 bg-[#f4f2fd] flex justify-between items-center">
                        <span className="text-[#47464b]">Language & Imprint</span>
                        <span className="font-semibold text-[#1a1b22]">
                          {book.specs?.language || 'English · Folio Editions (Autumn 2024)'}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Accordion 3: About the Author */}
              <div className="bg-[#fbf8ff] shadow-xs overflow-hidden border border-[#eeedf7]">
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'author' ? null : 'author')}
                  className="w-full p-5 flex items-center justify-between text-left hover:bg-[#f4f2fd] transition-colors"
                  type="button"
                >
                  <span className="font-headline text-xl text-[#1a1b22] flex items-center gap-3">
                    <span className="text-xs text-[#9d4229] font-bold">03</span>
                    About the Author
                  </span>
                  <span
                    className={`material-symbols-outlined text-[#1a1b22] transition-transform duration-300 ${
                      openAccordion === 'author' ? 'rotate-180' : ''
                    }`}
                  >
                    expand_more
                  </span>
                </button>
                {openAccordion === 'author' && (
                  <div className="px-5 pb-6 pt-1 animate-in fade-in">
                    <div className="flex flex-col sm:flex-row gap-5 items-start">
                      <div className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 bg-[#eeedf7] overflow-hidden shadow-xs">
                        <img
                          alt={book.author}
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0xrg5v16pVc9w33jCpvlsZyGzSwK0Vbf77Rl051TwRA3YYT2D9rIaeRv576h40DH-LiY15Wj6pPDkWWJ3zoNcUmiJPdgaSsMyilt-j2bNfaCMtTJLYxvnhtBZQs_Tg_F2PJYyeq7AUEKFPLnS0qF9d5XW3i8iikrctNkZeLe1V_eJ428B7rXSFh5qtUYHgd90LsEJ4uhbvk76S0DAfqdEiRjxg2mdZiCqYswGzMQNYwrbR6y8zROiAQ"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="space-y-2 text-sm text-[#47464b] leading-relaxed">
                        <p>
                          <strong className="text-[#1a1b22] font-semibold">{book.author}</strong> is a practicing architect and senior lecturer at the Architectural Association in London. Her previous essays on light phenomenologies have appeared in <em className="text-[#1a1b22] font-serif">San Rocco</em>, <em className="text-[#1a1b22] font-serif">Harvard Design Magazine</em>, and the <em className="text-[#1a1b22] font-serif">AA Files</em>.
                        </p>
                        <p className="text-xs text-[#77767b]">
                          She divides her research time between Zurich and an off-grid studio in the Valais Alps. <em className="text-[#1a1b22] font-serif">{book.title}</em> represents five years of field studies.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* READERS ALSO ACQUIRED: COMPLEMENTARY CURATED EDITIONS */}
      <section className="w-full bg-[#fbf8ff] py-12">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-2">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#77767b] block mb-1">
                Companion Library
              </span>
              <h3 className="font-headline text-3xl font-normal tracking-tight text-[#1a1b22]">
                Readers Also Acquired
              </h3>
            </div>
            <button
              onClick={() => {
                setCurrentPage('catalog');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-xs uppercase tracking-wider text-[#1a1b22] hover:text-[#9d4229] flex items-center gap-1 font-semibold transition-colors"
              type="button"
            >
              <span>View Complete Architecture Catalog</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendations.map((rec) => (
              <div
                key={rec.id}
                className="group flex flex-col bg-white p-4 shadow-xs hover:shadow-md transition-all border border-[#eeedf7]"
              >
                <div
                  onClick={() => navigateToBook(rec.id)}
                  className="relative aspect-[3/4] w-full bg-[#f4f2fd] overflow-hidden mb-4 cursor-pointer"
                >
                  <img
                    alt={rec.title}
                    src={rec.coverImage || BOOKS[0].coverImage}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {rec.badge && (
                    <span className="absolute top-3 left-3 px-2 py-0.5 bg-white/90 text-[10px] uppercase font-semibold text-[#1a1b22] shadow-xs">
                      {rec.badge}
                    </span>
                  )}
                </div>

                <div className="flex flex-col flex-1 justify-between">
                  <div>
                    <p className="text-xs text-[#77767b]">{rec.author}</p>
                    <h4
                      onClick={() => navigateToBook(rec.id)}
                      className="font-headline text-lg text-[#1a1b22] mt-1 group-hover:text-[#9d4229] transition-colors cursor-pointer"
                    >
                      {rec.title}
                    </h4>
                    <p className="text-xs text-[#47464b] mt-1 line-clamp-2 leading-relaxed">
                      {rec.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 flex items-center justify-between border-t border-[#eeedf7]">
                    <span className="text-sm font-semibold text-[#1a1b22] tabular-nums">
                      {formatPrice(rec.price)}
                    </span>
                    <button
                      onClick={() => addToCart(rec)}
                      className="px-3 py-1.5 bg-[#f4f2fd] hover:bg-[#000000] hover:text-white text-[#1a1b22] text-[10px] uppercase tracking-wider font-semibold transition-colors"
                      type="button"
                    >
                      + Quick Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
