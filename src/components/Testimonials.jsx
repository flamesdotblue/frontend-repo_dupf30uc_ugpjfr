import React from 'react';
import { Star } from 'lucide-react';

const items = [
  {
    name: 'Ava M.',
    role: 'Student, Algorithms',
    quote:
      'The AI explanations turned confusing loops into simple steps. I finally grasped two pointers and recursion.',
  },
  {
    name: 'Noah T.',
    role: 'Bootcamp Grad',
    quote:
      'The visualizer is a game changer. Seeing variables change in real-time beats any static tutorial.',
  },
  {
    name: 'Liam R.',
    role: 'Frontend Engineer',
    quote:
      'Clean, fast, and focused. I jump in, run code, and the insights help me optimize quickly.',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative bg-black py-20 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 text-center">
          <h2 className="font-manrope text-3xl font-bold md:text-4xl">Loved by learners</h2>
          <p className="mt-2 text-white/70">Feedback from people improving their skills every day.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {items.map((t) => (
            <figure key={t.name} className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="mb-3 flex text-emerald-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-emerald-400" />
                ))}
              </div>
              <blockquote className="text-sm text-white/80">“{t.quote}”</blockquote>
              <figcaption className="mt-4 text-sm text-white/60">
                <span className="font-medium text-white">{t.name}</span> • {t.role}
              </figcaption>
              <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-emerald-500/10 blur-2xl" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
