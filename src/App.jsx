import React, { useMemo, useState } from 'react';
import { Rocket } from 'lucide-react';
import ProblemPanel from './components/ProblemPanel.jsx';
import EditorPanel from './components/EditorPanel.jsx';
import VisualizationPanel from './components/VisualizationPanel.jsx';
import ExplanationPanel from './components/ExplanationPanel.jsx';

export default function App() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL || '';

  const defaultProblem = useMemo(() => ({
    id: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Easy',
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.`,
    examples: [
      { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]' },
      { input: 'nums = [3,2,4], target = 6', output: '[1,2]' },
    ],
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists',
    ],
    tags: ['Array', 'Hash Table'],
  }), []);

  const [runResult, setRunResult] = useState({ stdout: '', error: '', steps: [] });
  const [explanation, setExplanation] = useState(null);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top Navigation */}
      <header className="fixed inset-x-0 top-0 z-20 border-b border-white/10 bg-black/40 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <a href="#home" className="font-manrope text-lg font-extrabold tracking-tight">AIViz Judge</a>
          <nav className="hidden items-center gap-6 text-sm md:flex">
            <a href="#problems" className="text-white/80 hover:text-white">Problems</a>
            <a href="#editor" className="text-white/80 hover:text-white">Editor</a>
            <a href="#visualizer" className="text-white/80 hover:text-white">Visualizer</a>
            <a href="#explanation" className="text-white/80 hover:text-white">AI Explain</a>
          </nav>
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-3 py-1 text-sm font-semibold text-black"><Rocket size={16}/> Beta</span>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 pt-16 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <ProblemPanel problem={defaultProblem} />
            <div id="editor">
              <EditorPanel
                problemId={defaultProblem.id}
                backendUrl={backendUrl}
                onRun={(r) => setRunResult(r)}
                onSubmit={(e) => setExplanation(e)}
              />
            </div>
          </div>
          <div className="space-y-4">
            <div id="visualizer">
              <VisualizationPanel steps={runResult.steps} stdout={runResult.stdout} error={runResult.error} />
            </div>
            <div id="explanation">
              <ExplanationPanel explanationData={explanation} />
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-10 border-t border-white/10 bg-zinc-950 py-10 text-sm text-white/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
          <p>© {new Date().getFullYear()} AIViz Judge — Code. Visualize. Learn.</p>
          <div className="flex gap-6">
            <a className="hover:text-white" href="#editor">Editor</a>
            <a className="hover:text-white" href="#visualizer">Visualizer</a>
            <a className="hover:text-white" href="#explanation">AI Explain</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
