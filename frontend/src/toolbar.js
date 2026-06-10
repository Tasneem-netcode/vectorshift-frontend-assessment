// toolbar.js

import { DraggableNode } from './draggableNode';
import { nodeConfig } from './nodes/nodeConfig';

export const PipelineToolbar = () => {
    return (
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 px-4 py-3 bg-[#1A1A1D] border border-[#333] rounded-2xl shadow-2xl flex gap-3 items-center">
            {nodeConfig.map((node) => (
                <DraggableNode key={node.type} type={node.type} label={node.label} />
            ))}
        </div>
    );
};
