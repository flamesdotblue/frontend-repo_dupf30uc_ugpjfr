import React from 'react';
import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section id="home" className="relative isolate overflow-hidden bg-black text-white">
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-24 md:grid-cols-2 md:py-32">
        {/* Text side */}
        <div className="relative z-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80 backdrop-blur">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            New • AI Code Visualizer
          </span>
          <h1 className="mt-4 font-manrope text-4xl font-extrabold leading-tight md:text-6xl">
            Code. Visualize. Learn.
          </h1>
          <p className="mt-4 max-w-xl text-white/70">
            Write code with an AI tutor, watch it execute step-by-step, and master concepts faster with interactive visualizations.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href="#demo" className="rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-black transition hover:bg-emerald-400">
              Try a Problem
            </a>
            <a href="#features" className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
              Start Coding
            </a>
          </div>
          <div className="mt-6 text-xs text-white/50">Python • C++ • Java • JavaScript</div>
        </div>

        {/* Spline animation */}
        <div className="relative h-[380px] w-full md:h-[520px]">
          <div className="absolute inset-0">
            <Spline
              scene="https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode"
              style={{ width: '100%', height: '100%' }}
            />
          </div>
          {/* Subtle gradient to ensure legibility, doesn't block interaction */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>
      </div>

      {/* Background glow accents */}
      <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />
    </section>
  );
}
