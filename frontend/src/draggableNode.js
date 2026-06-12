import { Box, FileText, Terminal, ArrowRightSquare, ArrowLeftSquare, Sparkles, Image as ImageIcon, Send, Network } from 'lucide-react';

const getIconForType = (titleText) => {
    const t = typeof titleText === 'string' ? titleText.toLowerCase() : '';
    if (t.includes('input')) return ArrowRightSquare;
    if (t.includes('output')) return ArrowLeftSquare;
    if (t.includes('llm')) return Terminal;
    if (t.includes('text')) return FileText;
    if (t.includes('image')) return ImageIcon;
    if (t.includes('optimiz')) return Sparkles;
    if (t.includes('email')) return Send;
    if (t.includes('pdf')) return FileText;
    if (t.includes('api') || t.includes('fetch')) return Network;
    return Box;
};

export const DraggableNode = ({ type, label }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };

    const Icon = getIconForType(label);
  
    return (
      <div
        className="flex items-center gap-2 px-3.5 py-2 rounded-[14px] cursor-grab active:cursor-grabbing bg-transparent border border-transparent text-gray-400 transition-all duration-200 hover:bg-white/5 hover:text-white hover:border-white/10 hover:shadow-sm group font-['Satoshi']"
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        draggable
      >
          <Icon size={15} className="opacity-70 group-hover:opacity-100 transition-opacity" strokeWidth={2} />
          <span className="font-medium text-[14px] tracking-wide">{label}</span>
      </div>
    );
};