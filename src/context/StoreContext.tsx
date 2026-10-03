import React, { createContext, useContext, useState, useEffect } from 'react';
import { Book, CartItem, Currency, PageView } from '../types';
import { BOOKS } from '../data/books';

interface StoreContextType {
  currentPage: PageView;
  setCurrentPage: (page: PageView) => void;
  selectedBook: Book;
  setSelectedBook: (book: Book) => void;
  navigateToBook: (bookId: string) => void;
  cart: CartItem[];
  addToCart: (book: Book, formatName?: string, customPrice?: number) => void;
  removeFromCart: (bookId: string) => void;
  updateQuantity: (bookId: string, delta: number) => void;
  cartCount: number;
  cartSubtotal: number;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (usdAmount: number) => string;
  wishlist: string[];
  toggleWishlist: (bookId: string) => void;
  wishlistCount: number;
  quickLookBook: Book | null;
  openQuickLook: (book: Book) => void;
  closeQuickLook: () => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  archivistOpen: boolean;
  setArchivistOpen: (open: boolean) => void;
  readingClubOpen: boolean;
  setReadingClubOpen: (open: boolean) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  catalogCategory: string;
  setCatalogCategory: (cat: string) => void;
  voucherCode: string;
  setVoucherCode: (code: string) => void;
  isVoucherApplied: boolean;
  applyVoucher: (code: string) => boolean;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedBook, setSelectedBook] = useState<Book>(BOOKS[0]);
  
  // Initial cart populated with the 2 exact items from Screen 3
  const [cart, setCart] = useState<CartItem[]>([
    {
      bookId: 'form-and-silence',
      title: 'Form & Silence',
      author: 'Elena Vane',
      publisher: 'Bloomsbury Press',
      year: '2024',
      price: 48.0,
      format: 'Archival Slipcase · Uncut Edges',
      formatTag: 'Clothbound',
      subCategory: 'Monograph & Poetics',
      coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAGeRMay_oRjeisGXJNdBaLOAQQ8Pi-A5sTh2vuavScFTmMK-Yl49wVypL2KRCcQaTIC378MYfQ8yWGmii94lTnuENtMNGag1HsGphcbUQhVPz7pX_xZghA5gwcnwFsKtf8peU6DvgF2J0jzIR407PpnvtO-hVsyJMiSlcQy1B4tfzfz97smJ2Xu2PGjiNRLSOobGVLmikxFX5u4x-bNyzxZbWBNojKy6OShmgSqdumq-lZP6_psaNJg',
      quantity: 1
    },
    {
      bookId: 'typographic-systems',
      title: 'Typographic Systems',
      author: 'Kimberly Elam',
      publisher: 'Princeton Architectural Press',
      year: '2024',
      price: 36.0,
      format: 'First Edition Impression · Metallic Foil',
      formatTag: 'Hardcover',
      subCategory: 'Architecture of Print',
      coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0fO8SGBYItW6g4JH5GI2P5ObDWTZMtEvrRI_WFOluqGzqnOfKGZl1WtGFJcUkxANb9DkSmW3svl2VmVku7fqGqsuQo-GUUmn4TjM_6kBSCnXgwNBu0_srXRO-XXgFYXAg_eGZ7Tw2A9YNEOTwZZsQA8L6TdFA0wEy2072bBw2H57manlbVyd4H5yqWDgJY-OJIBIdh3Yjl6kz67nZCqNfR8y1cB3gF7o6kE6wdnS3mAYxHsMQT0pRbg',
      quantity: 1
    }
  ]);

  const [wishlist, setWishlist] = useState<string[]>([
    'spatial-cadence',
    'the-weight-of-shadows',
    'the-poetics-of-stone',
    'notes-on-form-and-emptiness'
  ]);

  const [currency, setCurrency] = useState<Currency>('USD');
  const [quickLookBook, setQuickLookBook] = useState<Book | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [archivistOpen, setArchivistOpen] = useState(false);
  const [readingClubOpen, setReadingClubOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [catalogCategory, setCatalogCategory] = useState('All Volumes');
  const [voucherCode, setVoucherCode] = useState('FOLIO25');
  const [isVoucherApplied, setIsVoucherApplied] = useState(true);

  // Shortcut for ⌘K search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const navigateToBook = (bookId: string) => {
    const found = BOOKS.find((b) => b.id === bookId);
    if (found) {
      setSelectedBook(found);
      setCurrentPage('pdp');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const addToCart = (book: Book, formatName?: string, customPrice?: number) => {
    const itemPrice = customPrice ?? book.price;
    setCart((prev) => {
      const existing = prev.find((item) => item.bookId === book.id);
      if (existing) {
        return prev.map((item) =>
          item.bookId === book.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          bookId: book.id,
          title: book.title,
          author: book.author,
          publisher: book.publisher,
          year: book.year || '2024',
          price: itemPrice,
          format: formatName || book.formatDetails || book.format,
          formatTag: book.badge || (book.formatCategory === 'Hardcover' ? 'Hardcover' : 'Clothbound'),
          subCategory: book.discipline,
          coverImage: book.coverImage || BOOKS[0].coverImage,
          quantity: 1
        }
      ];
    });
    showToast(`Added "${book.title}" to bag`);
  };

  const removeFromCart = (bookId: string) => {
    setCart((prev) => prev.filter((item) => item.bookId !== bookId));
  };

  const updateQuantity = (bookId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.bookId === bookId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const toggleWishlist = (bookId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(bookId);
      if (exists) {
        showToast('Removed from saved wishlist');
        return prev.filter((id) => id !== bookId);
      } else {
        showToast('Saved to your collection wishlist');
        return [...prev, bookId];
      }
    });
  };

  const openQuickLook = (book: Book) => {
    setQuickLookBook(book);
  };

  const closeQuickLook = () => {
    setQuickLookBook(null);
  };

  const formatPrice = (usdAmount: number) => {
    if (currency === 'EUR') {
      const eur = usdAmount * 0.92;
      return `€${eur.toFixed(2)}`;
    }
    return `$${usdAmount.toFixed(2)}`;
  };

  const applyVoucher = (code: string) => {
    if (code.trim().toUpperCase() === 'FOLIO25') {
      setIsVoucherApplied(true);
      showToast('Guild Code FOLIO25 active ($0.00 Delivery Fee Applied)');
      return true;
    } else {
      showToast('Invalid voucher code');
      return false;
    }
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const wishlistCount = wishlist.length;

  return (
    <StoreContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        selectedBook,
        setSelectedBook,
        navigateToBook,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartCount,
        cartSubtotal,
        currency,
        setCurrency,
        formatPrice,
        wishlist,
        toggleWishlist,
        wishlistCount,
        quickLookBook,
        openQuickLook,
        closeQuickLook,
        searchOpen,
        setSearchOpen,
        searchQuery,
        setSearchQuery,
        archivistOpen,
        setArchivistOpen,
        readingClubOpen,
        setReadingClubOpen,
        toastMessage,
        showToast,
        catalogCategory,
        setCatalogCategory,
        voucherCode,
        setVoucherCode,
        isVoucherApplied,
        applyVoucher
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
