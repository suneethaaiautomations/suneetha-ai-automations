import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';
import { PageId } from '../types';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

const DESKTOP_LINKS: { id: PageId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

const MOBILE_LINKS: { id: PageId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'portfolio', label: 'Portfolio / Gallery' },
  { id: 'about', label: 'About Us' },
  { id: 'book', label: 'Book Appointment' },
  { id: 'contact', label: 'Contact' },
];

export function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSelect = (page: PageId) => {
    onNavigate(page);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#080B18]/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single-line brand wordmark */}
        <button
          type="button"
          onClick={() => handleSelect('home')}
          className="font-display text-lg font-bold tracking-tight text-[#F8FAFC] whitespace-nowrap shrink-0 hover:text-[#22D3EE] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#22D3EE] cursor-pointer"
        >
          {BUSINESS_CONFIG.displayName}
        </button>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-6">
          {DESKTOP_LINKS.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item.id)}
                className={`relative py-1 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#22D3EE] cursor-pointer ${
                  isActive ? 'text-[#F8FAFC]' : 'text-[#CBD5E1] hover:text-[#F8FAFC]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE]"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Single Primary Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleSelect('book')}
            className="hidden sm:inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] px-4 py-2 text-sm font-semibold text-[#F8FAFC] whitespace-nowrap shrink-0 shadow-sm hover:from-[#9D74F7] hover:to-[#7C3AED] transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#22D3EE] cursor-pointer"
          >
            Book Appointment
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex lg:hidden items-center justify-center w-11 h-11 rounded-xl border border-white/10 bg-[#172036]/70 text-[#F8FAFC] hover:border-[#22D3EE]/50 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#22D3EE] cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-white/10 bg-[#080B18]/95 backdrop-blur-lg">
          <nav aria-label="Mobile navigation" className="mx-auto max-w-7xl px-4 py-4 flex flex-col gap-1">
            {MOBILE_LINKS.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelect(item.id)}
                  className={`flex items-center justify-between w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-[#172036] text-[#F8FAFC] border border-[#8B5CF6]/40'
                      : 'text-[#CBD5E1] hover:bg-[#172036]/60 hover:text-[#F8FAFC]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="text-xs text-[#22D3EE]">Active</span>}
                </button>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
