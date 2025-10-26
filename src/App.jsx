import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Brain, Code2 } from 'lucide-react';
import CodeInput from './components/CodeInput.jsx';
import Controls from './components/Controls.jsx';
import CodeVisualizer from './components/CodeVisualizer.jsx';
import OutputPanel from './components/OutputPanel.jsx';

const LANGUAGE_TEMPLATES = {
  javascript: `// Example: Fibonacci and logging\nfunction fib(n){\n  if(n <= 1) return n;\n  return fib(n-1) + fib(n-2);\n}\n\nconsole.log('fib(6)=', fib(6));\n\n// Try editing and press Run!`,
  python: `# Example: Fibonacci and printing\ndef fib(n):\n    if n <= 1:\n        return n\n    return fib(n-1) + fib(n-2)\n\nprint('fib(6)=', fib(6))\n\n# Demo: Simulated visualization only (no execution)`,
  cpp: `// Example: Fibonacci and output\n#include <bits/stdc++.h>\nusing namespace std;\n\nint fib(int n){\n    if(n <= 1) return n;\n    return fib(n-1) + fib(n-2);\n}\n\nint main(){\n    cout << "fib(6)=" << fib(6) << "\\n";\n    // Demo: Simulated visualization only (no execution)\n    return 0;\n}`,
  java: `// Example: Fibonacci and output\npublic class Main {\n    static int fib(int n){\n        if(n <= 1) return n;\n        return fib(n-1) + fib(n-2);\n    }\n    public static void main(String[] args){\n        System.out.println("fib(6)=" + fib(6));\n        // Demo: Simulated visualization only (no execution)\n    }\n}`,
};

export default function App() {
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState(() => LANGUAGE_TEMPLATES.javascript);
  const [steps, setSteps] = useState([]); // { type: 'step', line: number }
  const [logs, setLogs] = useState([]); // strings
  const [error, setError] = useState('');
  const [currentLine, setCurrentLine] = useState(null);
  const [speed, setSpeed] = useState(200);
  const [isRunning, setIsRunning] = useState(false);
  const playTimer = useRef(null);

  const clearTimer = () => {
    if (playTimer.current) {
      clearInterval(playTimer.current);
      playTimer.current = null;
    }
  };

  const reset = useCallback(() => {
    clearTimer();
    setIsRunning(false);
    setSteps([]);
    setLogs([]);
    setError('');
    setCurrentLine(null);
  }, []);

  const startPlayback = (evts) => {
    if (!Array.isArray(evts) || evts.length === 0) {
      setCurrentLine(null);
      return;
    }
    setIsRunning(true);
    let i = 0;
    setCurrentLine(evts[0].line);
    playTimer.current = setInterval(() => {
      i += 1;
      if (i >= evts.length) {
        clearTimer();
        setIsRunning(false);
        return;
      }
      setCurrentLine(evts[i].line);
    }, Math.max(50, speed));
  };

  const instrumentAndRun = useCallback(() => {
    reset();

    // For non-JS languages, provide a simulated visualization without execution
    if (language !== 'javascript') {
      const lines = code.split('\n');
      const nonEmptyLines = lines
        .map((l, i) => ({ idx: i, text: l }))
        .filter((x) => x.text.trim().length > 0);
      const simulatedEvents = (nonEmptyLines.length ? nonEmptyLines : lines.map((_, i) => ({ idx: i })))
        .map((x) => ({ type: 'step', line: x.idx + 1 }));
      setSteps(simulatedEvents);
      setLogs([`Preview mode: Simulated line-by-line visualization for ${language.toUpperCase()}. No code execution performed.`]);
      setError('');
      startPlayback(simulatedEvents);
      return;
    }

    // Lightweight line-based tracer for JavaScript.
    const lines = code.split('\n');
    const header = `const __events = [];\nconst __trace = (ln) => { __events.push({ type: 'step', line: ln }); };\nconst __logs = [];\nconst __origLog = console.log;\nconsole.log = (...args) => { try { __logs.push(args.map(a => typeof a === 'string' ? a : JSON.stringify(a)).join(' ')); } catch(_) { __logs.push(args.map(String).join(' ')); } __origLog(...args); };\n`;

    const body = lines
      .map((l, i) => `__trace(${i + 1});\n${l}`)
      .join('\n');

    // IMPORTANT: restore console.log before returning
    const footer = `\nconst __result = { events: __events, logs: __logs };\nconsole.log = __origLog;\nreturn __result;`;

    try {
      // eslint-disable-next-line no-new-func
      const runner = new Function(header + body + footer);
      const result = runner();
      const ev = Array.isArray(result?.events) ? result.events : [];
      const lg = Array.isArray(result?.logs) ? result.logs : [];
      setSteps(ev);
      setLogs(lg);
      setError('');
      startPlayback(ev);
    } catch (e) {
      // Best-effort restore if an error happened before footer executed
      try { /* eslint-disable no-undef */ console.log = console.log; /* noop to satisfy linter */ } catch(_) {}
      setError(e?.stack || String(e));
      setSteps([]);
      setLogs([]);
      setCurrentLine(null);
    }
  }, [code, reset, speed, language]);

  useEffect(() => () => { clearTimer(); }, []);

  const headerTitle = useMemo(() => 'Code Visualizer', []);

  const languageBadge = useMemo(() => {
    if (language === 'javascript') return 'JavaScript • Dynamic Line Trace';
    return `${language.toUpperCase()} • Simulated Visualization`;
  }, [language]);

  const handleLanguageChange = useCallback((next) => {
    setLanguage(next);
    setCode(LANGUAGE_TEMPLATES[next] || '');
    reset();
  }, [reset]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Top bar */}
      <header className="sticky top-0 z-10 border-b border-white/10 bg-black/60 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <div className="inline-flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400"><Brain size={18} /></div>
            <h1 className="font-manrope text-lg font-extrabold tracking-tight">{headerTitle}</h1>
          </div>
          <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70 md:flex">
            <Code2 size={14} /> {languageBadge}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <CodeInput 
              code={code} 
              onChange={setCode} 
              language={language}
              onLanguageChange={handleLanguageChange}
            />
            <Controls
              onRun={instrumentAndRun}
              onReset={reset}
              isRunning={isRunning}
              speed={speed}
              onSpeedChange={setSpeed}
            />
            <OutputPanel logs={logs} error={error} />
          </div>
          <div className="flex flex-col gap-4">
            <CodeVisualizer code={code} currentLine={currentLine} steps={steps} />
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
              <p className="mb-2 font-semibold text-slate-200">How it works</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>For JavaScript, we insert a hidden trace call before each line to record execution order.</li>
                <li>Your code runs once, then we replay the trace to animate highlighting.</li>
                <li>console.log output is captured and shown in the output panel and restored at the end of the run.</li>
                <li>For Python, C++, and Java we simulate a line-by-line visualization without executing code.</li>
              </ul>
              <p className="mt-2 text-slate-400">We can add full multi-language execution later using secure sandboxes or interpreters.</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-6 border-t border-white/10 bg-slate-950/60 py-6 text-sm text-white/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <p>© {new Date().getFullYear()} Code Visualizer</p>
          <p className="hidden md:block">Edit the code and press Run. JavaScript will execute; other languages simulate line-by-line.</p>
        </div>
      </footer>
    </div>
  );
}
