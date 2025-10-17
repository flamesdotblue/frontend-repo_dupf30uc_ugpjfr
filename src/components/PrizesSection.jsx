import React from 'react';

export default function PrizesSection() {
  return (
    <section id="register" className="relative bg-gradient-to-b from-zinc-950 to-black py-20 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-manrope text-3xl font-bold md:text-4xl">Prizes & Rewards</h2>
            <p className="mt-3 text-white/70">
              Champions take home cash, premium gear, and spotlight features across partner channels. Runner-ups and MVPs are rewarded too.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-white/80">
              <li className="flex items-center gap-3"><span className="inline-block h-2 w-2 rounded-full bg-emerald-400" /> 1st: $10,000 + Pro Gear Pack</li>
              <li className="flex items-center gap-3"><span className="inline-block h-2 w-2 rounded-full bg-emerald-400" /> 2nd: $3,000 + Performance Peripherals</li>
              <li className="flex items-center gap-3"><span className="inline-block h-2 w-2 rounded-full bg-emerald-400" /> 3rd: $1,000 + Merch Bundle</li>
              <li className="flex items-center gap-3"><span className="inline-block h-2 w-2 rounded-full bg-emerald-400" /> MVP: $1,000 + Feature Article</li>
            </ul>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8">
            <h3 className="text-xl font-semibold">Team Registration</h3>
            <p className="mt-2 text-sm text-white/70">
              Teams of 5 players + 2 subs. Limited slots available — secure your spot now.
            </p>
            <form
              className="mt-6 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                alert('Thanks! We\'ll reach out with next steps.');
              }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <input className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-sm outline-none placeholder:text-white/40 focus:border-emerald-400" placeholder="Team Name" required />
                <input className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-sm outline-none placeholder:text-white/40 focus:border-emerald-400" placeholder="Captain Email" type="email" required />
              </div>
              <input className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-sm outline-none placeholder:text-white/40 focus:border-emerald-400" placeholder="Game/Division" />
              <button type="submit" className="w-full rounded-lg bg-emerald-500 px-4 py-3 text-sm font-semibold text-black transition hover:bg-emerald-400">
                Submit Registration
              </button>
              <p className="text-xs text-white/50">By registering you agree to the event rules and code of conduct.</p>
            </form>

            <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-emerald-500/10 blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
