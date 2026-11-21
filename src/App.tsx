import { useEffect, useState } from 'react';
import { FloatingEmail } from './components/FloatingEmail';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { AboutPage } from './pages/AboutPage';
import { BookAppointmentPage } from './pages/BookAppointmentPage';
import { ContactPage } from './pages/ContactPage';
import { HomePage } from './pages/HomePage';
import { PortfolioPage } from './pages/PortfolioPage';
import { PricingPage } from './pages/PricingPage';
import { ServicesPage } from './pages/ServicesPage';
import { PageId, ServiceOptionLabel } from './types';

const VALID_PAGES: PageId[] = [
  'home',
  'services',
  'pricing',
  'portfolio',
  'about',
  'book',
  'contact',
];

function getInitialPage(): PageId {
  const hash = window.location.hash.replace('#', '') as PageId;
  return VALID_PAGES.includes(hash) ? hash : 'home';
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>(getInitialPage);
  const [preselectedService, setPreselectedService] = useState<ServiceOptionLabel | undefined>(
    undefined
  );

  useEffect(() => {
    const handleHashChange = () => {
      const next = getInitialPage();
      setCurrentPage(next);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: PageId, service?: ServiceOptionLabel) => {
    if (service) {
      setPreselectedService(service);
    } else if (page !== 'book') {
      setPreselectedService(undefined);
    }

    setCurrentPage(page);
    if (window.location.hash !== `#${page}`) {
      window.location.hash = page;
    }

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#080B18] text-[#F8FAFC]">
      <Navbar currentPage={currentPage} onNavigate={(page) => handleNavigate(page)} />

      <main className="flex-1">
        {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
        {currentPage === 'services' && <ServicesPage onNavigate={handleNavigate} />}
        {currentPage === 'pricing' && <PricingPage onNavigate={handleNavigate} />}
        {currentPage === 'portfolio' && <PortfolioPage onNavigate={handleNavigate} />}
        {currentPage === 'about' && <AboutPage onNavigate={handleNavigate} />}
        {currentPage === 'book' && (
          <BookAppointmentPage preselectedService={preselectedService} />
        )}
        {currentPage === 'contact' && <ContactPage onNavigate={handleNavigate} />}
      </main>

      <Footer onNavigate={(page) => handleNavigate(page)} />
      <FloatingEmail />
      <FloatingWhatsApp  />
    </div>
  );
}
