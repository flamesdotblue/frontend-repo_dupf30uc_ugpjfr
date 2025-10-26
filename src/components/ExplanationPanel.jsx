import React from 'react';
import { Lightbulb, Gauge } from 'lucide-react';

export default function ExplanationPanel({ explanationData }) {
  const { explanation, complexity, optimizations } = explanationData || {};
  return (
    <section className="rounded-lg border border-white/10 bg-zinc-950/60 p-5 shadow-lg backdrop-blur">
      <div className="mb-3 flex items-center gap-2 text-sm text-white/70">
        <Lightbulb size={16}/> AI Explanation
      </div>
      {explanation ? (
        <div className="space-y-4 text-sm">
          <p className="leading-relaxed text-white/80 whitespace-pre-wrap">{explanation}</p>
          {complexity && (
            <div className="rounded-md border border-white/10 bg-black/40 p-3">
              <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-white/60"><Gauge size={14}/> Estimated Complexity</div>
              <div className="text-white/80">Time: <span className="text-emerald-300">{complexity.time}</span> • Space: <span className="text-emerald-300">{complexity.space}</span></div>
            </div>
          )}
          {optimizations && optimizations.length > 0 && (
            <div>
              <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-white/60">Suggested Optimizations</div>
              <ul className="list-inside list-disc text-white/80">
                {optimizations.map((o, i) => (
                  <li key={i}>{o}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <div className="text-sm text-white/60">Submit your code to receive an AI-powered explanation with complexity analysis and optimization tips.</div>
      )}
    </section>
  );
}
