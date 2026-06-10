import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { Sparkles, Zap } from 'lucide-react';

export const PromptOptimizerNode = ({ id, data }) => {
  const [style, setStyle] = useState(data?.style || 'Professional');
  const [creativity, setCreativity] = useState(data?.creativity || 50);

  const calculateScore = () => {
    return Math.floor((creativity / 100) * 40 + 60); 
  };

  return (
    <BaseNode 
      id={id} 
      title={
        <div className="flex items-center gap-2 text-purple-400">
          <Sparkles size={16} />
          <span>Prompt Optimizer</span>
        </div>
      }
      inputs={[{ id: 'rawPrompt' }]} 
      outputs={[{ id: 'optimizedPrompt' }]}
    >
      <div className="flex flex-col gap-4 min-w-[220px]">
        
        {/* Style Dropdown */}
        <label className="flex flex-col gap-1.5">
          <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Tone Style</span>
          <select 
            value={style} 
            onChange={(e) => setStyle(e.target.value)}
            className="bg-black/20 border border-white/10 rounded-md text-gray-200 px-2 py-1.5 text-sm transition-all duration-200 focus:outline-none focus:border-purple-500/80 focus:ring-2 focus:ring-purple-500/20"
          >
            <option value="Professional" className="bg-[#1E1E24]">Professional</option>
            <option value="Creative" className="bg-[#1E1E24]">Creative</option>
            <option value="Technical" className="bg-[#1E1E24]">Technical</option>
            <option value="Concise" className="bg-[#1E1E24]">Concise</option>
          </select>
        </label>

        {/* Creativity Slider */}
        <label className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Creativity</span>
            <span className="text-xs text-purple-400 font-mono font-medium">{creativity}%</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={creativity}
            onChange={(e) => setCreativity(e.target.value)}
            className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
          />
        </label>

        {/* Quality Score Indicator */}
        <div className="mt-1 pt-3 border-t border-white/10 flex items-center justify-between">
          <span className="text-xs text-gray-400">Expected Quality</span>
          <div className="flex items-center gap-1.5 bg-green-500/10 text-green-400 px-2 py-1 rounded-full text-[11px] font-semibold border border-green-500/20">
            <Zap size={12} className="fill-green-400" />
            <span>{calculateScore()}/100</span>
          </div>
        </div>

      </div>
    </BaseNode>
  );
}
