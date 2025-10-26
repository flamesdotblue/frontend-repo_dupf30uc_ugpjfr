import React from 'react';
import { Play, RotateCcw, Zap } from 'lucide-react';

function Controls({ onRun, onReset, isRunning, speed, onSpeedChange }) {
  return (
    <div className="w-full flex items-center justify-between gap-4 p-3 rounded-xl bg-white/5 border border-white/10">
      <div className="flex items-center gap-2">
        <button
          onClick={onRun}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/90 hover:bg-emerald-500 text-white transition"
        >
          <Play size={16} />
          <span>{isRunning ? 'Re-run' : 'Run'}</span>
        </button>
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-700/70 hover:bg-slate-700 text-white transition"
        >
          <RotateCcw size={16} />
          <span>Reset</span>
        </button>
      </div>

      <div className="flex items-center gap-3 text-sm">
        <Zap size={16} className="text-amber-400" />
        <span className="text-slate-300">Speed</span>
        <input
          type="range"
          min={50}
          max={1000}
          step={50}
          value={speed}
          onChange={(e) => onSpeedChange(Number(e.target.value))}
          className="w-40 accent-amber-400"
        />
      </div>
    </div>
  );
}

export default Controls;
