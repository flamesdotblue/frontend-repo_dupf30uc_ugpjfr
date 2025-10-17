import React from 'react';
import HeroSection from './components/HeroSection.jsx';
import HighlightsSection from './components/HighlightsSection.jsx';
import ScheduleSection from './components/ScheduleSection.jsx';
import PrizesSection from './components/PrizesSection.jsx';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Simple top nav */}
      <header className="fixed inset-x-0 top-0 z-20 border-b border-white/10 bg-black/40 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <a href="#home" className="font-manrope text-lg font-extrabold tracking-tight">
            Velocity Cup
          </a>
          <nav className="hidden items-center gap-6 text-sm md:flex">
            <a href="#highlights" className="text-white/80 hover:text-white">Why Join</a>
            <a href="#schedule" className="text-white/80 hover:text-white">Schedule</a>
            <a href="#register" className="text-white/80 hover:text-white">Prizes & Register</a>
          </nav>
          <a
            href="#register"
            className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-emerald-400 md:hidden"
          >
            Register
          </a>
        </div>
      </header>

      {/* Sections */}
      <main className="flex flex-col">
        <div className="pt-14">{/* offset for fixed header */}
          <HeroSection />
        </div>
        <HighlightsSection />
        <ScheduleSection />
        <PrizesSection />
      </main>

      <footer className="border-t border-white/10 bg-black py-8 text-center text-sm text-white/60">
        © {new Date().getFullYear()} Velocity Cup. All rights reserved.
      </footer>
    </div>
  );
}
