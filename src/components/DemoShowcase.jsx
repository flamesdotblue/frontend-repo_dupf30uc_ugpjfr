import React from 'react';

export default function DemoShowcase() {
  return (
    <section id="demo" className="relative bg-zinc-950 py-20 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 max-w-2xl">
          <h2 className="font-manrope text-3xl font-bold md:text-4xl">See it in action</h2>
          <p className="mt-2 text-white/70">A minimal workspace with a code editor, problem panel, and AI visualizer. Press Run to simulate a step-through execution.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left: Problem + Editor mock */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="mb-3 flex items-center justify-between">
                <div className="text-sm font-semibold text-white/80">Two Sum</div>
                <div className="text-xs text-white/50">Easy • Arrays</div>
              </div>
              <p className="text-sm text-white/70">
                Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-xs text-white/60">
                <li>O(n) expected solution</li>
                <li>Use a hash map</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black p-4">
              <div className="mb-3 flex items-center gap-2 text-xs text-white/50">
                <span className="rounded bg-white/10 px-2 py-1">Python</span>
                <span className="rounded bg-white/10 px-2 py-1">Autocomplete</span>
              </div>
              <pre className="overflow-auto rounded-lg bg-zinc-900 p-4 text-xs leading-6 text-emerald-200">
{`def twoSum(nums, target):
    seen = {}
    for i, n in enumerate(nums):
        if target - n in seen:
            return [seen[target - n], i]
        seen[n] = i
    return []`}
              </pre>
              <div className="mt-4 flex items-center gap-3">
                <button className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-black hover:bg-emerald-400">Run</button>
                <button className="rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold hover:bg-white/10">Submit</button>
              </div>
            </div>
          </div>

          {/* Right: Visualizer mock */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="mb-3 flex items-center justify-between">
              <div className="text-sm font-semibold text-white/80">AI Visualizer</div>
              <div className="text-xs text-white/50">Step 2 / 5</div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-white/10 bg-black/40 p-4">
                <div className="text-xs text-white/50">Variables</div>
                <div className="mt-2 space-y-1 text-xs">
                  <div className="flex justify-between"><span>i</span><span className="text-emerald-400">1</span></div>
                  <div className="flex justify-between"><span>n</span><span className="text-emerald-400">7</span></div>
                  <div className="flex justify-between"><span>seen</span><span className="text-emerald-400">{`{2: 0}`}</span></div>
                </div>
              </div>
              <div className="rounded-lg border border-white/10 bg-black/40 p-4">
                <div className="text-xs text-white/50">Explanation</div>
                <p className="mt-2 text-sm text-white/70">
                  At index 1, number is 7. The complement 2 exists in the map at index 0. Return [0, 1].
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="text-xs text-white/50">AI Tutor: O(n) time, O(n) space</div>
              <div className="flex gap-2">
                <button className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs hover:bg-white/10">Prev</button>
                <button className="rounded-lg bg-emerald-500 px-3 py-2 text-xs font-semibold text-black hover:bg-emerald-400">Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
