import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Brain, Code2 } from 'lucide-react';
import CodeInput from './components/CodeInput.jsx';
import Controls from './components/Controls.jsx';
import CodeVisualizer from './components/CodeVisualizer.jsx';
import OutputPanel from './components/OutputPanel.jsx';

export default function App() {
  const [code, setCode] = useState(() => `// Example: Fibonacci and logging\nfunction fib(n){\n  if(n <= 1) return n;\n  return fib(n-1) + fib(n-2);\n}\n\nconsole.log('fib(6)=', fib(6));\n\n// Try editing and press Run!`);
  const [steps, setSteps] = useState([]); // { type: 'step', line: number }
  const [logs, setLogs] = useState([]); // strings
  const [error, setError] = useState('');
  const [currentLine, setCurrentLine] = useState(null);
  const [speed, setSpeed] = useState(200);
  const [isRunning, setIsRunning] = useState(false);
  const playTimer = useRef(null);

  const reset = useCallback(() => {
    if (playTimer.current) {
      clearInterval(playTimer.current);
      playTimer.current = null;
    }
    setIsRunning(false);
    setSteps([]);
    setLogs([]);
    setError('');
    setCurrentLine(null);
  }, []);

  const instrumentAndRun = useCallback(() => {
    reset();

    // Very lightweight line-based tracer for JavaScript.
    // It injects a trace call before each line and captures console.log output.
    const lines = code.split('\n');
    const header = `const __events = [];\nconst __trace = (ln) => { __events.push({ type: 'step', line: ln }); };\nconst __logs = [];\nconst __origLog = console.log;\nconsole.log = (...args) => { try { __logs.push(args.map(a => typeof a === 'string' ? a : JSON.stringify(a)).join(' ')); } catch(_) { __logs.push(args.map(String).join(' ')); } __origLog(...args); };\n`;

    const body = lines
      .map((l, i) => `__trace(${i + 1});\n${l}`)
      .join('\n');

    const footer = `\nreturn { events: __events, logs: __logs };`;

    let result;
    try {
      // Wrap into a function to avoid leaking variables to global scope
      // eslint-disable-next-line no-new-func
      const runner = new Function(header + body + footer);
      result = runner();
      const ev = Array.isArray(result?.events) ? result.events : [];
      const lg = Array.isArray(result?.logs) ? result.logs : [];
      setSteps(ev);
      setLogs(lg);
      setError('');
      // Playback visualization after code execution has produced the trace
      if (ev.length > 0) {
        setIsRunning(true);
        let i = 0;
        setCurrentLine(ev[0].line);
        playTimer.current = setInterval(() => {
          i += 1;
          if (i >= ev.length) {
            clearInterval(playTimer.current);
            playTimer.current = null;
            setIsRunning(false);
            return;
          }
          setCurrentLine(ev[i].line);
        }, Math.max(50, speed));
      } else {
        setCurrentLine(null);
      }
    } catch (e) {
      setError(e?.stack || String(e));
      setSteps([]);
      setLogs([]);
      setCurrentLine(null);
    }
  }, [code, reset, speed]);

  useEffect(() => () => { if (playTimer.current) clearInterval(playTimer.current); }, []);

  const headerTitle = useMemo(() => 'Code Visualizer', []);

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
            <Code2 size={14} /> JavaScript Only • Dynamic Line Trace
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <CodeInput code={code} onChange={setCode} />
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
                <li>We insert a hidden trace call before each line to record execution order.</li>
                <li>Your code runs once, then we replay the trace to animate highlighting.</li>
                <li>console.log output is captured and shown in the output panel.</li>
              </ul>
              <p className="mt-2 text-slate-400">Note: This is a lightweight visualizer—side effects in code will still occur during a run.</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-6 border-t border-white/10 bg-slate-950/60 py-6 text-sm text-white/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <p>© {new Date().getFullYear()} Code Visualizer</p>
          <p className="hidden md:block">Edit the code and press Run to see the dynamic line-by-line animation.</p>
        </div>
      </footer>
    </div>
  );
}
