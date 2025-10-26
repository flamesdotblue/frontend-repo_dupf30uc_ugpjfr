import React from 'react';
import Hero from './components/Hero.jsx';
import Features from './components/Features.jsx';
import DemoShowcase from './components/DemoShowcase.jsx';
import Testimonials from './components/Testimonials.jsx';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top Navigation */}
      <header className="fixed inset-x-0 top-0 z-20 border-b border-white/10 bg-black/40 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <a href="#home" className="font-manrope text-lg font-extrabold tracking-tight">AIViz</a>
          <nav className="hidden items-center gap-6 text-sm md:flex">
            <a href="#features" className="text-white/80 hover:text-white">Features</a>
            <a href="#demo" className="text-white/80 hover:text-white">Demo</a>
            <a href="#testimonials" className="text-white/80 hover:text-white">Testimonials</a>
          </nav>
          <a href="#demo" className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-emerald-400 md:hidden">Try Now</a>
        </div>
      </header>

      {/* Sections */}
      <main className="flex flex-col">
        <div className="pt-14">{/* offset for fixed header */}
          <Hero />
        </div>
        <Features />
        <DemoShowcase />
        <Testimonials />
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-zinc-950 py-10 text-sm text-white/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
          <p>© {new Date().getFullYear()} AIViz — Code. Visualize. Learn.</p>
          <div className="flex gap-6">
            <a className="hover:text-white" href="#features">Features</a>
            <a className="hover:text-white" href="#demo">Demo</a>
            <a className="hover:text-white" href="#home">Top</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
