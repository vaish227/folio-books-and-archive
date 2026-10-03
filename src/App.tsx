import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { QuickLookModal } from './components/QuickLookModal';
import { ArchivistModal } from './components/ArchivistModal';
import { Toast } from './components/Toast';

import { HomeScreen } from './screens/HomeScreen';
import { CatalogScreen } from './screens/CatalogScreen';
import { ProductDetailScreen } from './screens/ProductDetailScreen';
import { CheckoutScreen } from './screens/CheckoutScreen';
import { JournalScreen } from './screens/JournalScreen';

const MainContent: React.FC = () => {
  const { currentPage } = useStore();

  return (
    <main className="w-full pt-28 bg-[#fbf8ff] min-h-screen">
      {currentPage === 'home' && <HomeScreen />}
      {currentPage === 'catalog' && <CatalogScreen />}
      {currentPage === 'pdp' && <ProductDetailScreen />}
      {currentPage === 'cart' && <CheckoutScreen />}
      {currentPage === 'journal' && <JournalScreen />}
    </main>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <div className="min-h-screen flex flex-col bg-[#fbf8ff] text-[#1a1b22]">
        <Header />
        <MainContent />
        <Footer />

        {/* Global Modals & Notifications */}
        <SearchModal />
        <QuickLookModal />
        <ArchivistModal />
        <Toast />
      </div>
    </StoreProvider>
  );
}
