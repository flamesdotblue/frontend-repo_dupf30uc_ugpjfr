import React from 'react';
import { Terminal, AlertTriangle } from 'lucide-react';

function OutputPanel({ logs, error }) {
  return (
    <div className="w-full h-full flex flex-col bg-white/5 rounded-xl border border-white/10 overflow-hidden">
      <div className="px-4 py-3 border-b border-white/10 flex items-center gap-2 bg-gradient-to-r from-slate-900/60 to-slate-800/40">
        <Terminal size={16} className="text-emerald-400" />
        <h3 className="text-sm font-semibold text-slate-200">Output</h3>
      </div>
      <div className="flex-1 overflow-auto p-4 space-y-2">
        {error ? (
          <div className="flex items-start gap-2 text-red-300 bg-red-500/10 border border-red-500/30 rounded-md p-3">
            <AlertTriangle size={18} className="mt-0.5" />
            <pre className="whitespace-pre-wrap text-sm">{String(error)}</pre>
          </div>
        ) : logs.length === 0 ? (
          <p className="text-sm text-slate-400">Run your code to see output here.</p>
        ) : (
          logs.map((l, i) => (
            <div key={i} className="text-sm text-slate-200 font-mono">{l}</div>
          ))
        )}
      </div>
    </div>
  );
}

export default OutputPanel;
