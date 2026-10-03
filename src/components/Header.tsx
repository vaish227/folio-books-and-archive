import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';

export const Header: React.FC = () => {
  const {
    currentPage,
    setCurrentPage,
    currency,
    setCurrency,
    cartCount,
    wishlistCount,
    setSearchOpen,
    setCatalogCategory
  } = useStore();

  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page: 'home' | 'catalog' | 'cart' | 'journal', category?: string) => {
    if (category) {
      setCatalogCategory(category);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#fbf8ff]/90 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        {/* Announcement Ticker Bar */}
        <div className="bg-[#000000] text-white py-1.5 px-4 md:px-12 text-center text-[10px] md:text-xs font-semibold uppercase tracking-widest">
          Complimentary global shipping on editions over $75 — Use code FOLIO25
        </div>

        {/* Primary Navigation Container */}
        <div className="h-20 max-w-[1440px] mx-auto px-4 md:px-12 flex items-center justify-between gap-4 md:gap-6">
          {/* Brand Logo */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2 text-left focus:outline-none group"
              type="button"
            >
              <img
                alt="FOLIO Books Logo"
                className="h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida/AEtjO1Xj7em9nV051nZixsIjUIoAtwCws8ao6zGorS8lSd3HddFrfcLASGZ5doDMNwESTxbluWlNSSI0Z_Cbvl_IE08pFr3ufYo2jbs0nmYmuPg7rpdpMOOjl-xBnujQJ96E1FHolKuFk39-gjItciaJlWLyNwv-XadpBM0dcqSjfUVZbVOrctlUmyE3g1lkF8Q1SQGoQmPl3w-JFkvb-9oWZ75a5uoYWoEYQJ66R1uu4H1T86rH4m3ZvoVeq2nZ"
              />
              <span className="font-headline text-2xl font-normal tracking-tight text-[#1a1b22]">
                FOLIO
              </span>
            </button>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-6">
            <button
              onClick={() => handleNavClick('catalog', 'All Volumes')}
              className={`text-[13px] transition-colors pb-0.5 ${
                currentPage === 'catalog'
                  ? 'text-[#000000] font-semibold border-b-2 border-[#000000]'
                  : 'text-[#47464b] hover:text-[#1a1b22]'
              }`}
              type="button"
            >
              New Arrivals
            </button>
            <button
              onClick={() => handleNavClick('catalog', 'Essays & Criticism')}
              className="text-[13px] text-[#47464b] hover:text-[#1a1b22] transition-colors"
              type="button"
            >
              Fiction & Essays
            </button>
            <button
              onClick={() => handleNavClick('catalog', 'Architecture & Design')}
              className="text-[13px] text-[#47464b] hover:text-[#1a1b22] transition-colors"
              type="button"
            >
              Art & Design
            </button>
            <button
              onClick={() => handleNavClick('catalog', 'Architecture & Design')}
              className="text-[13px] text-[#47464b] hover:text-[#1a1b22] transition-colors"
              type="button"
            >
              Monographs
            </button>
            <button
              onClick={() => handleNavClick('home')}
              className="text-[13px] text-[#47464b] hover:text-[#1a1b22] transition-colors"
              type="button"
            >
              Staff Selections
            </button>
            <button
              onClick={() => handleNavClick('journal')}
              className={`text-[13px] transition-colors ${
                currentPage === 'journal'
                  ? 'text-[#000000] font-semibold border-b-2 border-[#000000]'
                  : 'text-[#47464b] hover:text-[#1a1b22]'
              }`}
              type="button"
            >
              The Folio Journal
            </button>
          </nav>

          {/* Right Action Icons & Controls */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-1.5 px-2 md:px-3 py-1.5 bg-[#f4f2fd] hover:bg-[#eeedf7] text-[#47464b] hover:text-[#1a1b22] transition-colors text-left rounded-sm"
              type="button"
              title="Search the catalog (⌘K)"
            >
              <span className="material-symbols-outlined text-[18px]">search</span>
              <span className="text-[13px] text-[#77767b] hidden md:inline">Search library...</span>
              <kbd className="hidden md:inline-block text-[10px] px-1 py-0.5 bg-[#fbf8ff] border border-[#c8c5cb] text-[#47464b] font-sans font-bold ml-1">
                ⌘K
              </kbd>
            </button>

            {/* Currency Switcher */}
            <div className="flex items-center gap-1 text-[11px] tracking-wider uppercase text-[#47464b] pl-1">
              <button
                onClick={() => setCurrency('USD')}
                className={`transition-colors ${currency === 'USD' ? 'text-[#000000] font-bold' : 'hover:text-[#1a1b22]'}`}
                type="button"
              >
                USD
              </button>
              <span className="text-[#c8c5cb]">/</span>
              <button
                onClick={() => setCurrency('EUR')}
                className={`transition-colors ${currency === 'EUR' ? 'text-[#000000] font-bold' : 'hover:text-[#1a1b22]'}`}
                type="button"
              >
                EUR
              </button>
            </div>

            {/* Wishlist Link */}
            <button
              onClick={() => handleNavClick('catalog')}
              aria-label="Wishlist"
              className="relative p-1 text-[#47464b] hover:text-[#1a1b22] transition-colors"
              title={`Wishlist (${wishlistCount} items)`}
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">bookmark_border</span>
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 text-[9px] w-4 h-4 rounded-full bg-[#e8e7f1] text-[#1a1b22] flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Link */}
            <button
              onClick={() => handleNavClick('cart')}
              aria-label="Cart"
              className="relative p-1 text-[#47464b] hover:text-[#1a1b22] transition-colors"
              title={`Bag (${cartCount} items)`}
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 text-[9px] w-4 h-4 rounded-full bg-[#9d4229] text-white flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Customer Profile Icon */}
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              aria-label="Customer Profile"
              className="pl-1 flex items-center flex-shrink-0 focus:outline-none"
              type="button"
            >
              <img
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover border border-[#e3e1ec] hover:ring-2 hover:ring-[#9d4229] transition-all"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDK_99i8yY9rKqp9mXHxOWfOM_V4mxasyUB5wtwBzgdR8O_VoGjahfd0NMp4bNnDN7zbT5-eFdWBLm8hofm6FcmRE8QCz7BAyKXhj_YOv-40Q_Q0HPE98nwZwy03jAXd0UqlEinEjcbfK6RY1s67ZWJicflpo8k6SKd9vPHPOy_SeA9NYyqu_Is4ZPj3b_LelO1W6O6P73Rx0WUxNjOGS50TJ763dl9ADxxYpERH5e-YfyJA3GCdE0V0w"
              />
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-1 text-[#47464b] hover:text-[#1a1b22]"
              type="button"
              aria-label="Toggle navigation menu"
            >
              <span className="material-symbols-outlined text-[22px]">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-[#fbf8ff] border-t border-[#eeedf7] px-6 py-4 flex flex-col gap-3 shadow-lg">
            <button
              onClick={() => handleNavClick('catalog', 'All Volumes')}
              className="text-left py-2 font-medium text-[15px] text-[#1a1b22] hover:text-[#9d4229]"
            >
              New Arrivals
            </button>
            <button
              onClick={() => handleNavClick('catalog', 'Essays & Criticism')}
              className="text-left py-2 font-medium text-[15px] text-[#1a1b22] hover:text-[#9d4229]"
            >
              Fiction & Essays
            </button>
            <button
              onClick={() => handleNavClick('catalog', 'Architecture & Design')}
              className="text-left py-2 font-medium text-[15px] text-[#1a1b22] hover:text-[#9d4229]"
            >
              Art & Design
            </button>
            <button
              onClick={() => handleNavClick('catalog', 'Architecture & Design')}
              className="text-left py-2 font-medium text-[15px] text-[#1a1b22] hover:text-[#9d4229]"
            >
              Monographs
            </button>
            <button
              onClick={() => handleNavClick('home')}
              className="text-left py-2 font-medium text-[15px] text-[#1a1b22] hover:text-[#9d4229]"
            >
              Staff Selections
            </button>
            <button
              onClick={() => handleNavClick('journal')}
              className="text-left py-2 font-medium text-[15px] text-[#1a1b22] hover:text-[#9d4229]"
            >
              The Folio Journal
            </button>
          </div>
        )}

        {/* Profile Popover */}
        {profileOpen && (
          <div className="absolute right-4 md:right-12 top-24 w-80 bg-white shadow-2xl p-5 border border-[#eeedf7] z-50 animate-in fade-in">
            <div className="flex items-center gap-3 pb-3 border-b border-[#eeedf7]">
              <img
                alt="Profile"
                className="w-12 h-12 rounded-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDK_99i8yY9rKqp9mXHxOWfOM_V4mxasyUB5wtwBzgdR8O_VoGjahfd0NMp4bNnDN7zbT5-eFdWBLm8hofm6FcmRE8QCz7BAyKXhj_YOv-40Q_Q0HPE98nwZwy03jAXd0UqlEinEjcbfK6RY1s67ZWJicflpo8k6SKd9vPHPOy_SeA9NYyqu_Is4ZPj3b_LelO1W6O6P73Rx0WUxNjOGS50TJ763dl9ADxxYpERH5e-YfyJA3GCdE0V0w"
              />
              <div>
                <p className="font-semibold text-sm text-[#1a1b22]">Julian Vance</p>
                <p className="text-xs text-[#77767b]">julian.vance@bloomsbury-society.org</p>
                <span className="inline-block mt-1 px-1.5 py-0.5 bg-[#ffdbd1] text-[#7e2c14] text-[9px] uppercase tracking-wider font-bold">
                  Fellow Member #4402
                </span>
              </div>
            </div>
            <div className="pt-3 space-y-2 text-xs text-[#47464b]">
              <button
                onClick={() => {
                  handleNavClick('cart');
                  setProfileOpen(false);
                }}
                className="w-full text-left py-1.5 hover:text-[#1a1b22] flex items-center justify-between"
              >
                <span>Active Bag Registry</span>
                <span className="font-bold text-[#9d4229]">{cartCount} items</span>
              </button>
              <button
                onClick={() => {
                  handleNavClick('catalog');
                  setProfileOpen(false);
                }}
                className="w-full text-left py-1.5 hover:text-[#1a1b22] flex items-center justify-between"
              >
                <span>Saved Desiderata (Wishlist)</span>
                <span className="font-bold">{wishlistCount}</span>
              </button>
              <div className="pt-2 border-t border-[#eeedf7] flex justify-between items-center text-[11px] text-[#77767b]">
                <span>Bloomsbury Guild Access</span>
                <span className="text-[#9d4229] font-medium">Verified Active</span>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
