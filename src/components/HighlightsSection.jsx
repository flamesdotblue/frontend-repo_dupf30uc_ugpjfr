import React from 'react';
import { Trophy, Users, Shield, Bolt } from 'lucide-react';

const highlights = [
  {
    icon: Trophy,
    title: 'Grand Prize',
    desc: '$10,000 and pro gear for the champions',
  },
  {
    icon: Users,
    title: '64 Teams',
    desc: 'Open bracket with seeded qualifiers',
  },
  {
    icon: Shield,
    title: 'Fair Play',
    desc: 'Anti-cheat, referees, and strict rulebook',
  },
  {
    icon: Bolt,
    title: 'High Energy',
    desc: 'Fast rounds, highlight reels, and live casting',
  },
];

export default function HighlightsSection() {
  return (
    <section id="highlights" className="relative bg-gradient-to-b from-black to-zinc-950 py-20 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="font-manrope text-3xl font-bold md:text-4xl">Why Join</h2>
            <p className="mt-2 text-white/70">Designed for competitive play and an unforgettable spectator experience.</p>
          </div>
          <a
            href="#register"
            className="hidden rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10 md:inline-block"
          >
            Register Now
          </a>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:translate-y-[-2px] hover:bg-white/10"
            >
              <div className="mb-4 inline-flex rounded-xl bg-emerald-500/10 p-3 text-emerald-400 ring-1 ring-inset ring-emerald-500/30">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="font-semibold">{title}</h3>
              <p className="mt-1 text-sm text-white/70">{desc}</p>
              <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-emerald-500/10 blur-2xl" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
