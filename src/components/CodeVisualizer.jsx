import React from 'react';

function CodeVisualizer({ code, currentLine, steps }) {
  const lines = code.split('\n');
  return (
    <div className="w-full h-full flex flex-col bg-white/5 rounded-xl border border-white/10 overflow-hidden">
      <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-slate-900/60 to-slate-800/40">
        <h3 className="text-sm font-semibold text-slate-200">Visualization</h3>
        <span className="text-xs text-slate-400">{steps.length} steps</span>
      </div>
      <pre className="flex-1 overflow-auto p-4 text-sm leading-6">
        {lines.map((line, idx) => {
          const ln = idx + 1;
          const isActive = currentLine === ln;
          return (
            <div key={idx} className={`flex gap-4 items-start rounded-md px-2 ${isActive ? 'bg-amber-400/10' : ''}`}>
              <span className={`select-none w-10 text-right pr-2 ${isActive ? 'text-amber-400 font-semibold' : 'text-slate-500'}`}>{ln}</span>
              <code className={`font-mono flex-1 ${isActive ? 'text-slate-100' : 'text-slate-300'}`}>{line || ' '}</code>
            </div>
          );
        })}
      </pre>
    </div>
  );
}

export default CodeVisualizer;
