import React, { useEffect, useMemo, useState } from 'react';
import { Play, Send, Code2, ChevronDown } from 'lucide-react';

const STARTER_SNIPPETS = {
  javascript: `// Two Sum
// Return indices of the two numbers such that they add up to target
function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) return [map.get(complement), i];
    map.set(nums[i], i);
  }
  return [];
}

console.log(twoSum([2,7,11,15], 9));`,
  python: `# Two Sum
# Return indices of the two numbers such that they add up to target
from typing import List

def twoSum(nums: List[int], target: int) -> List[int]:
    m = {}
    for i, n in enumerate(nums):
        c = target - n
        if c in m:
            return [m[c], i]
        m[n] = i
    return []

print(twoSum([2,7,11,15], 9))`,
  cpp: `// Two Sum
#include <bits/stdc++.h>
using namespace std;
vector<int> twoSum(vector<int>& nums, int target){
  unordered_map<int,int> m;
  for(int i=0;i<nums.size();++i){
    int c = target - nums[i];
    if(m.count(c)) return {m[c], i};
    m[nums[i]] = i;
  }
  return {};
}
int main(){ vector<int> a{2,7,11,15}; auto ans=twoSum(a,9); cout<<"["<<ans[0]<<","<<ans[1]<<"]\n"; }`,
  java: `// Two Sum
import java.util.*;
class Main{
  public static int[] twoSum(int[] nums, int target){
    Map<Integer,Integer> m = new HashMap<>();
    for(int i=0;i<nums.length;i++){
      int c = target - nums[i];
      if(m.containsKey(c)) return new int[]{m.get(c), i};
      m.put(nums[i], i);
    }
    return new int[]{};
  }
  public static void main(String[] args){
    int[] ans = twoSum(new int[]{2,7,11,15}, 9);
    System.out.println("["+ans[0]+","+ans[1]+"]");
  }
}`,
};

export default function EditorPanel({ problemId, onRun, onSubmit, backendUrl }) {
  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState(STARTER_SNIPPETS['python']);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    setCode(STARTER_SNIPPETS[language]);
  }, [language]);

  const canCallBackend = Boolean(backendUrl);

  const handleRun = async () => {
    setRunning(true);
    try {
      if (!canCallBackend) {
        // graceful fallback
        onRun({ stdout: 'Backend not configured. Set VITE_BACKEND_URL to enable execution.', steps: [] });
        return;
      }
      const res = await fetch(`${backendUrl}/execute`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language, code, problemId }),
      });
      const data = await res.json();
      onRun(data);
    } catch (e) {
      onRun({ stdout: '', error: e.message, steps: [] });
    } finally {
      setRunning(false);
    }
  };

  const handleSubmit = async () => {
    setRunning(true);
    try {
      // First run to get steps/output
      await handleRun();
      if (canCallBackend) {
        const res = await fetch(`${backendUrl}/explain`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ language, code, problemId }),
        });
        const data = await res.json();
        onSubmit(data);
      } else {
        onSubmit({ explanation: 'Connect backend to receive AI explanations.', complexity: { time: 'O(n)', space: 'O(n)' }, optimizations: ['Use a hash map to store seen values.'] });
      }
    } catch (e) {
      onSubmit({ explanation: e.message, complexity: { time: '-', space: '-' }, optimizations: [] });
    } finally {
      setRunning(false);
    }
  };

  return (
    <section className="flex h-full flex-col rounded-lg border border-white/10 bg-zinc-950/60 shadow-lg backdrop-blur">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
        <div className="flex items-center gap-2 text-sm text-white/70">
          <Code2 size={16}/>
          <span>Editor</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <select value={language} onChange={(e)=>setLanguage(e.target.value)} className="appearance-none rounded-md border border-white/10 bg-black/40 px-3 py-1 pr-8 text-sm text-white outline-none">
              <option value="python">Python</option>
              <option value="javascript">JavaScript</option>
              <option value="cpp">C++</option>
              <option value="java">Java</option>
            </select>
            <ChevronDown size={14} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-white/70"/>
          </div>
          <button onClick={handleRun} disabled={running} className="inline-flex items-center gap-2 rounded-md bg-emerald-500 px-3 py-1.5 text-sm font-semibold text-black shadow transition hover:bg-emerald-400 disabled:opacity-60">
            <Play size={16}/> Run
          </button>
          <button onClick={handleSubmit} disabled={running} className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-white/10 disabled:opacity-60">
            <Send size={16}/> Submit
          </button>
        </div>
      </div>
      <div className="flex-1">
        {/* Lightweight editor fallback (Monaco can be integrated later) */}
        <textarea value={code} onChange={(e)=>setCode(e.target.value)} spellCheck={false}
          className="h-[420px] w-full resize-none bg-black/60 p-4 font-mono text-sm text-emerald-100 outline-none" />
      </div>
      {!canCallBackend && (
        <div className="border-t border-amber-400/20 bg-amber-400/10 px-4 py-2 text-xs text-amber-200">
          Tip: Set VITE_BACKEND_URL to enable server-side execution and AI explanations.
        </div>
      )}
    </section>
  );
}
