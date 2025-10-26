import React from 'react';
import { Bookmark, Flame, Timer, ListChecks } from 'lucide-react';

export default function ProblemPanel({ problem, onChangeProblem }) {
  const { title, difficulty, description, examples, constraints, tags } = problem;

  const diffColor = {
    Easy: 'text-emerald-400',
    Medium: 'text-amber-400',
    Hard: 'text-rose-400',
  }[difficulty] || 'text-white';

  return (
    <section className="rounded-lg border border-white/10 bg-zinc-950/60 p-5 shadow-lg backdrop-blur">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h2 className="font-manrope text-xl font-bold tracking-tight text-white">{title}</h2>
          <div className="mt-1 flex items-center gap-3 text-xs text-white/60">
            <span className={`${diffColor} font-semibold`}>{difficulty}</span>
            <span className="inline-flex items-center gap-1"><Timer size={14}/> 1s time limit</span>
            <span className="inline-flex items-center gap-1"><Flame size={14}/> 128MB memory</span>
          </div>
        </div>
        <button className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-xs text-white/80 transition hover:border-white/20 hover:text-white">
          <Bookmark size={14}/> Save
        </button>
      </div>
      <p className="mb-4 whitespace-pre-wrap text-sm leading-relaxed text-white/80">{description}</p>
      <div className="mb-4 space-y-3">
        <div>
          <h3 className="mb-1 font-semibold text-white">Examples</h3>
          <div className="space-y-2">
            {examples.map((ex, i) => (
              <div key={i} className="rounded-md border border-white/10 bg-black/30 p-3 text-sm">
                <div className="text-white/70">Input: <code className="text-emerald-300">{ex.input}</code></div>
                <div className="text-white/70">Output: <code className="text-emerald-300">{ex.output}</code></div>
                {ex.explanation && (
                  <div className="text-white/60">Explanation: {ex.explanation}</div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-1 font-semibold text-white">Constraints</h3>
          <ul className="list-inside list-disc text-sm text-white/70">
            {constraints.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>
      </div>
      {tags?.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((t) => (
            <span key={t} className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-white/70">{t}</span>
          ))}
        </div>
      )}
    </section>
  );
}
