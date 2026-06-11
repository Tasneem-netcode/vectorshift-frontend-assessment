import { Handle, Position } from 'reactflow';

export const BaseNode = ({ 
  id, 
  title, 
  children, 
  inputs = [], 
  outputs = [], 
  selected = false
}) => {

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

  return (
    <div className={`relative min-w-[240px] w-fit max-w-[400px] rounded-[24px] bg-[#222225] border ${selected ? 'border-purple-500 shadow-[0_0_40px_rgba(168,85,247,0.2)] scale-[1.02] z-50' : 'border-[#3F3F46] shadow-2xl hover:border-[#71717A] hover:shadow-[0_8px_30px_rgba(0,0,0,0.6)] hover:-translate-y-0.5'} transition-all duration-300 ease-out group`}>
      
      {/* Exact UI Subtle Glows - only visible on hover or selection for a cleaner default state */}
      {typeof title === 'string' && title.toLowerCase().includes('image') && (
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-6 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 blur-[20px] rounded-full pointer-events-none transition-opacity duration-500 ${selected ? 'opacity-40' : 'opacity-0 group-hover:opacity-20'}`}></div>
      )}
      {typeof title === 'string' && (title.toLowerCase().includes('model') || title.toLowerCase().includes('llm')) && (
        <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-6 bg-yellow-500 blur-[20px] rounded-full pointer-events-none transition-opacity duration-500 ${selected ? 'opacity-30' : 'opacity-0 group-hover:opacity-15'}`}></div>
      )}
      
      <div className="flex flex-col relative h-full rounded-[24px] overflow-visible">
        
        {/* Header */}
        <div className="px-5 pt-5 pb-3 flex items-center gap-3 relative z-10">
          <div className={`w-2.5 h-2.5 rounded-full ${getColorStyle(title)}`}></div>
          <span className="font-bold text-gray-100 text-[15px] tracking-wide whitespace-nowrap">{title}</span>
        </div>

        {/* Inputs & Outputs Area */}
        {(inputs.length > 0 || outputs.length > 0) && (
          <div className="py-2 flex flex-col gap-2 relative z-10">
            {inputs.map((input) => (
              <div key={input.id} className="relative flex items-center px-5 py-1">
                <Handle
                  type="target"
                  position={Position.Left}
                  id={`${id}-${input.id}`}
                  className={`!w-2.5 !h-2.5 !rounded-full !border-none !absolute !left-[18px] !top-1/2 !-translate-y-1/2 !transition-all !duration-200 hover:!scale-150 !z-20 ${getColorStyle(input.id)}`}
                />
                <span className="text-gray-400 text-[13px] font-medium pl-6">{input.label || input.id}</span>
              </div>
            ))}
            {outputs.map((output) => (
              <div key={output.id} className="relative flex items-center justify-end px-5 py-1">
                <span className="text-gray-400 text-[13px] font-medium pr-6">{output.label || output.id}</span>
                <Handle
                  type="source"
                  position={Position.Right}
                  id={`${id}-${output.id}`}
                  className={`!w-2.5 !h-2.5 !rounded-full !border-none !absolute !right-[18px] !top-1/2 !-translate-y-1/2 !transition-all !duration-200 hover:!scale-150 !z-20 ${getColorStyle(output.id)}`}
                />
              </div>
            ))}
          </div>
        )}

        {/* Custom Content Area */}
        <div className="px-5 pb-5 pt-3 flex flex-col gap-4 text-[14px] text-gray-300 relative z-10">
          {children}
        </div>

      </div>
    </div>
  );
};
