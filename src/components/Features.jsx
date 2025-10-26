import React from 'react';
import { Rocket, Code, Brain, Play, BarChart3 } from 'lucide-react';

const features = [
  {
    icon: Code,
    title: 'Multi-language Editor',
    desc: 'Write in Python, C++, Java, or JavaScript with smart autocomplete and linting.',
  },
  {
    icon: Play,
    title: 'Run & Visualize',
    desc: 'Execute code and watch variables, loops, and calls update in real time.',
  },
  {
    icon: Brain,
    title: 'AI Tutor',
    desc: 'Understand the how and why with step-by-step explanations and hints.',
  },
  {
    icon: BarChart3,
    title: 'Insights',
    desc: 'Get complexity analysis, optimization tips, and progress tracking.',
  },
];

export default function Features() {
  return (
    <section id="features" className="relative bg-gradient-to-b from-black to-zinc-950 py-20 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">Core Features</span>
          <h2 className="mt-3 font-manrope text-3xl font-bold md:text-4xl">Everything you need to learn faster</h2>
          <p className="mt-2 text-white/70">A modern workspace that blends a powerful editor, interactive visuals, and an AI tutor.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:translate-y-[-2px] hover:bg-white/10">
              <div className="mb-4 inline-flex rounded-xl bg-emerald-500/10 p-3 text-emerald-400 ring-1 ring-inset ring-emerald-500/30">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="font-semibold">{title}</h3>
              <p className="mt-1 text-sm text-white/70">{desc}</p>
              <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-emerald-500/10 blur-2xl" />
            </div>
          ))}
        </div>

        <div className="mt-12 flex items-center gap-4">
          <a href="#demo" className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-emerald-400">
            <Rocket className="h-4 w-4" />
            Explore Demo
          </a>
          <p className="text-sm text-white/60">No account required</p>
        </div>
      </div>
    </section>
  );
}
