import React from 'react';

function CodeInput({ code, onChange }) {
  return (
    <div className="w-full h-full flex flex-col bg-white/5 rounded-xl border border-white/10 overflow-hidden">
      <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-slate-900/60 to-slate-800/40">
        <h3 className="text-sm font-semibold text-slate-200">Code (JavaScript)</h3>
        <span className="text-xs text-slate-400">Dynamic visualization is supported for JS</span>
      </div>
      <textarea
        value={code}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
        className="flex-1 font-mono text-sm leading-6 p-4 bg-transparent text-slate-100 outline-none resize-none"
        placeholder="Write JavaScript code here..."
      />
    </div>
  );
}

export default CodeInput;
