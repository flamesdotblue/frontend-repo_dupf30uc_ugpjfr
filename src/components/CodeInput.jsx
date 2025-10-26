import React from 'react';

function CodeInput({ code, onChange, language = 'javascript', onLanguageChange }) {
  const placeholderMap = {
    javascript: 'Write JavaScript code here... (supports execution + trace)',
    python: 'Write Python code here... (preview only for now)',
    cpp: 'Write C++ code here... (preview only for now)',
    java: 'Write Java code here... (preview only for now)',
  };

  return (
    <div className="w-full h-full flex flex-col bg-white/5 rounded-xl border border-white/10 overflow-hidden">
      <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-slate-900/60 to-slate-800/40">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-slate-200">Editor</h3>
          <span className="text-xs text-slate-400">{language === 'javascript' ? 'Dynamic visualization supported' : 'Preview only'}</span>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="lang" className="text-xs text-slate-400">Language</label>
          <select
            id="lang"
            value={language}
            onChange={(e) => onLanguageChange && onLanguageChange(e.target.value)}
            className="bg-slate-800/80 border border-white/10 rounded-md text-xs px-2 py-1 text-slate-200 focus:outline-none"
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="cpp">C++</option>
            <option value="java">Java</option>
          </select>
        </div>
      </div>
      <textarea
        value={code}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
        className="flex-1 font-mono text-sm leading-6 p-4 bg-transparent text-slate-100 outline-none resize-none"
        placeholder={placeholderMap[language]}
      />
    </div>
  );
}

export default CodeInput;
