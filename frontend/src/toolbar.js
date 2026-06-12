// toolbar.js

import { DraggableNode } from './draggableNode';
import { nodeConfig } from './nodes/nodeConfig';

export const PipelineToolbar = () => {
    return (
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-[100] px-3 py-2.5 bg-[#0A0A0B]/80 backdrop-blur-2xl border border-white/10 rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.6)] flex gap-2 items-center animate-in fade-in slide-in-from-top-8 duration-500">
            {nodeConfig.map((node) => (
                <DraggableNode key={node.type} type={node.type} label={node.label} />
            ))}
        </div>
    );
};
