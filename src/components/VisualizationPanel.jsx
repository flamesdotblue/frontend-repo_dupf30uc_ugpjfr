import React from 'react';
import { Activity, PauseCircle } from 'lucide-react';

export default function VisualizationPanel({ steps = [], stdout = '', error = '' }) {
  return (
    <section className="flex h-full flex-col rounded-lg border border-white/10 bg-zinc-950/60 shadow-lg backdrop-blur">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2 text-sm text-white/70">
        <Activity size={16}/> Execution Trace
      </div>
      <div className="grid grid-cols-1 gap-4 p-4 lg:grid-cols-2">
        <div className="rounded-md border border-white/10 bg-black/40 p-3">
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-white/60">Steps</h4>
          <ol className="max-h-64 space-y-2 overflow-auto pr-2 text-xs">
            {steps.length === 0 && (
              <li className="text-white/50">No steps to display yet.</li>
            )}
            {steps.map((s, i) => (
              <li key={i} className="rounded bg-white/5 p-2 text-white/80">
                <div className="flex items-center justify-between text-[11px] text-white/60">
                  <span>Line {s.line ?? '-'} {s.event && <em className="ml-2 rounded bg-white/10 px-1">{s.event}</em>}</span>
                  {s.function && <span>{s.function}</span>}
                </div>
                {s.explanation && <p className="mt-1 text-[12px] text-emerald-300">{s.explanation}</p>}
                {s.locals && (
                  <div className="mt-1 rounded border border-white/10 bg-black/30 p-2">
                    <div className="text-[11px] text-white/50">Locals</div>
                    <pre className="whitespace-pre-wrap break-words text-[12px] text-emerald-200">{JSON.stringify(s.locals, null, 2)}</pre>
                  </div>
                )}
              </li>
            ))}
          </ol>
        </div>
        <div className="rounded-md border border-white/10 bg-black/40 p-3">
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-white/60">Program Output</h4>
          <pre className="max-h-64 overflow-auto text-sm text-emerald-200">{stdout || (error ? '' : 'Run the code to see output...')}</pre>
          {error && (
            <div className="mt-2 rounded-md border border-rose-500/30 bg-rose-500/10 p-2 text-rose-200">
              <div className="mb-1 flex items-center gap-2 text-xs font-semibold"><PauseCircle size={14}/> Error</div>
              <pre className="whitespace-pre-wrap break-words text-xs">{error}</pre>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
