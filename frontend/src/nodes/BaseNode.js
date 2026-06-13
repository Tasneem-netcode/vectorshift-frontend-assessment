import { Handle, Position } from 'reactflow';
import { Box, FileText, Terminal, ArrowRightSquare, ArrowLeftSquare, Sparkles, Image as ImageIcon } from 'lucide-react';
import { useStore } from '../store';

export const BaseNode = ({
  id,
  title,
  children,
  inputs = [],
  outputs = [],
  selected = false
}) => {
  const isExecuting = useStore(state => state.isExecuting);

  // Universal Color System for Nodes & Handles
  const getColorStyle = (name) => {
    const lower = (typeof name === 'string' ? name : '').toLowerCase();

    if (lower.includes('input') || lower.includes('value')) return '!bg-[#e4e4e7] shadow-[0_0_10px_rgba(228,228,231,0.4)]'; // White
    if (lower.includes('output') || lower.includes('response') || lower.includes('result')) return '!bg-[#71717a] shadow-[0_0_10px_rgba(113,113,122,0.4)]'; // Gray
    if (lower.includes('llm') || lower.includes('model') || lower.includes('system')) return '!bg-[#14b8a6] shadow-[0_0_10px_rgba(20,184,166,0.6)]'; // Teal
    if (lower.includes('text') || lower.includes('prompt')) return '!bg-[#a855f7] shadow-[0_0_10px_rgba(168,85,247,0.6)]'; // Purple
    if (lower.includes('email') || lower.includes('message') || lower.includes('pos')) return '!bg-[#22c55e] shadow-[0_0_10px_rgba(34,197,94,0.6)]'; // Green
    if (lower.includes('pdf') || lower.includes('doc') || lower.includes('neg')) return '!bg-[#ef4444] shadow-[0_0_10px_rgba(239,68,68,0.6)]'; // Red
    if (lower.includes('api') || lower.includes('fetch')) return '!bg-[#3b82f6] shadow-[0_0_10px_rgba(59,130,246,0.6)]'; // Blue
    if (lower.includes('optimizer') || lower.includes('optimize')) return '!bg-[#f59e0b] shadow-[0_0_10px_rgba(245,158,11,0.6)]'; // Amber
    if (lower.includes('image') || lower.includes('gen')) return '!bg-[#ec4899] shadow-[0_0_10px_rgba(236,72,153,0.6)]'; // Pink

    return '!bg-[#9ca3af] shadow-[0_0_10px_rgba(156,163,175,0.4)]'; // Default slate
  };

  const getNodeMetadata = (titleText) => {
    const t = typeof titleText === 'string' ? titleText.toLowerCase() : '';
    if (t.includes('input')) return { color: 'text-blue-400', glow: 'rgba(96,165,250,0.5)', icon: ArrowRightSquare, bg: 'bg-blue-400/10' };
    if (t.includes('output')) return { color: 'text-emerald-400', glow: 'rgba(52,211,153,0.5)', icon: ArrowLeftSquare, bg: 'bg-emerald-400/10' };
    if (t.includes('llm')) return { color: 'text-violet-400', glow: 'rgba(167,139,250,0.5)', icon: Terminal, bg: 'bg-violet-400/10' };
    if (t.includes('text')) return { color: 'text-amber-400', glow: 'rgba(251,191,36,0.5)', icon: FileText, bg: 'bg-amber-400/10' };
    if (t.includes('image')) return { color: 'text-pink-400', glow: 'rgba(244,114,182,0.5)', icon: ImageIcon, bg: 'bg-pink-400/10' };
    if (t.includes('optimiz')) return { color: 'text-fuchsia-400', glow: 'rgba(232,121,249,0.5)', icon: Sparkles, bg: 'bg-fuchsia-400/10' };
    return { color: 'text-gray-300', glow: 'rgba(255,255,255,0.3)', icon: Box, bg: 'bg-gray-400/10' };
  };

  const meta = getNodeMetadata(title);
  const Icon = meta.icon;

  const executionGlow = isExecuting ? `shadow-[0_0_30px_${meta.glow}] border-white/30 animate-pulse` : '';

  return (
    <div className={`relative min-w-[300px] w-fit max-w-[420px] rounded-[32px] bg-[#1E1E24]/40 backdrop-blur-3xl border ${selected ? 'border-purple-500 shadow-[0_0_40px_rgba(168,85,247,0.2)] z-50 scale-[1.02]' : 'border-white/5 shadow-2xl hover:border-white/20 hover:shadow-[0_15px_40px_rgba(0,0,0,0.8)] hover:-translate-y-1 hover:scale-[1.01]'} ${executionGlow} transition-all duration-300 ease-out group overflow-hidden font-['Satoshi']`}>

      {/* Top Ambient Glow matching the node type */}
      <div className={`absolute top-0 left-0 w-full h-32 opacity-30 pointer-events-none mix-blend-screen transition-opacity duration-500 ${selected || isExecuting ? 'opacity-60' : 'group-hover:opacity-50'}`}
           style={{ background: `radial-gradient(ellipse at top, ${meta.glow}, transparent 70%)` }}>
      </div>

      <div className="flex flex-col relative h-full rounded-[32px] overflow-visible p-2">

        {/* Outer Header */}
        <div className="px-4 pt-3 pb-3 flex items-center gap-2.5 relative z-10">
          <div className={`flex items-center justify-center p-1.5 rounded-lg ${meta.bg} shadow-inner border border-white/5`}>
             <Icon size={14} className={`${meta.color} drop-shadow-md`} strokeWidth={2.5} />
          </div>
          <span className={`font-bold text-[17px] tracking-wide whitespace-nowrap drop-shadow-md ${meta.color}`}>{title}</span>
        </div>

        {/* Inner Data Card */}
        <div className="bg-[#1C1C1F]/90 rounded-[24px] border border-white/5 w-full flex flex-col relative z-10 overflow-hidden shadow-inner">
          
          {/* Inputs & Outputs Top Row */}
          {(inputs.length > 0 || outputs.length > 0) && (
            <div className="flex justify-between w-full p-4 pb-2">
              
              {/* Left Column (Inputs) */}
              <div className="flex flex-col gap-3">
                {inputs.map((input) => (
                  <div key={input.id} className="relative flex items-center group/handle">
                    <Handle
                      type="target"
                      position={Position.Left}
                      id={`${id}-${input.id}`}
                      className={`!w-2 !h-2 !min-w-[8px] !min-h-[8px] !rounded-full !border-none !relative !transform-none !left-0 !top-0 !mr-2.5 !transition-all !duration-300 hover:!scale-[1.8] hover:!ring-4 hover:!ring-white/20 !z-20 ${getColorStyle(input.id)} ${isExecuting ? 'animate-pulse' : ''}`}
                    />
                    <span className="text-[#A1A1AA] text-[14px] font-medium tracking-wide drop-shadow-sm transition-colors group-hover/handle:text-white">{input.label || input.id}</span>
                  </div>
                ))}
              </div>

              {/* Right Column (Outputs) */}
              <div className="flex flex-col gap-3 items-end">
                {outputs.map((output) => (
                  <div key={output.id} className="relative flex items-center justify-end group/handle">
                    <span className="text-[#A1A1AA] text-[14px] font-medium tracking-wide mr-2.5 drop-shadow-sm transition-colors group-hover/handle:text-white">{output.label || output.id}</span>
                    <Handle
                      type="source"
                      position={Position.Right}
                      id={`${id}-${output.id}`}
                      className={`!w-2 !h-2 !min-w-[8px] !min-h-[8px] !rounded-full !border-none !relative !transform-none !right-0 !top-0 !transition-all !duration-300 hover:!scale-[1.8] hover:!ring-4 hover:!ring-white/20 !z-20 ${getColorStyle(output.id)} ${isExecuting ? 'animate-pulse' : ''}`}
                    />
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* Children Content Area */}
          <div className={`px-4 pb-4 ${inputs.length === 0 && outputs.length === 0 ? 'pt-4' : 'pt-2'} flex flex-col gap-3 text-[15px] text-gray-300 relative z-10`}>
            {children}
          </div>

        </div>
      </div>
    </div>
  );
};
