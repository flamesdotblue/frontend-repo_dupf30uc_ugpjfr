import React from 'react';

const schedule = [
  {
    date: 'June 1',
    title: 'Open Qualifiers',
    desc: 'Swiss format. Best-of-1. Top 16 advance.',
  },
  {
    date: 'June 8',
    title: 'Group Stage',
    desc: '4 Groups, double round-robin. Top 2 per group advance.',
  },
  {
    date: 'June 15',
    title: 'Playoffs',
    desc: 'Single elimination. Best-of-3.',
  },
  {
    date: 'June 22',
    title: 'Grand Finals',
    desc: 'Best-of-5 on LAN with live audience & casting.',
  },
];

export default function ScheduleSection() {
  return (
    <section id="schedule" className="relative bg-zinc-950 py-20 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="font-manrope text-3xl font-bold md:text-4xl">Event Schedule</h2>
        <p className="mt-2 max-w-2xl text-white/70">
          A clear, competitive path from open qualifiers to a high-energy final.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {schedule.map((item) => (
            <div
              key={item.title}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6"
            >
              <div className="text-sm font-semibold text-emerald-400">{item.date}</div>
              <h3 className="mt-1 text-lg font-semibold">{item.title}</h3>
              <p className="mt-1 text-sm text-white/70">{item.desc}</p>
              <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-emerald-500/10 blur-2xl" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
