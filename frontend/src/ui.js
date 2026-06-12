// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, ControlButton, Background, MiniMap, ConnectionMode } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { nodeTypes } from './nodes/nodeConfig';
import { AnimatedEdge } from './nodes/AnimatedEdge';
import { Trash } from 'lucide-react';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };

const edgeTypes = {
  default: AnimatedEdge,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  clearGraph: state.clearGraph,
});

export const PipelineUI = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const {
      nodes,
      edges,
      getNodeID,
      addNode,
      onNodesChange,
      onEdgesChange,
      onConnect,
      clearGraph
    } = useStore(selector, shallow);

    const getInitNodeData = (nodeID, type) => {
      let nodeData = { id: nodeID, nodeType: `${type}` };
      return nodeData;
    }

    const onDrop = useCallback(
        (event) => {
          event.preventDefault();
    
          const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
          if (event?.dataTransfer?.getData('application/reactflow')) {
            const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
            const type = appData?.nodeType;
      
            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
              return;
            }
      
            const position = reactFlowInstance.project({
              x: event.clientX - reactFlowBounds.left,
              y: event.clientY - reactFlowBounds.top,
            });

            const nodeID = getNodeID(type);
            const newNode = {
              id: nodeID,
              type,
              position,
              data: getInitNodeData(nodeID, type),
            };
      
            addNode(newNode);
          }
        },
        [reactFlowInstance, addNode, getNodeID]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);
    return (
        <div ref={reactFlowWrapper} className="w-full h-full bg-[#09090B] relative overflow-hidden">
            
            {/* Cinematic Background Depth - Floating Blobs */}
            <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-cyan-900/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen transform translate-x-1/4 translate-y-1/4"></div>

            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onInit={setReactFlowInstance}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                proOptions={proOptions}
                snapGrid={[gridSize, gridSize]}
                connectionMode={ConnectionMode.Loose}
                connectionLineType='default'
                defaultEdgeOptions={{
                    style: { strokeWidth: 1.5, stroke: 'rgba(255,255,255,0.25)' },
                }}
            >
                <Background color="#ffffff" variant="dots" gap={40} size={1.5} opacity={0.12} />
                <Controls className="fill-white border border-white/5 bg-[#18181B] shadow-2xl rounded-2xl overflow-hidden [&>button]:border-b-white/5 [&>button]:hover:bg-white/5 [&>button]:bg-[#18181B] [&>button>svg]:fill-gray-400 [&>button>svg]:hover:fill-white">
                    <ControlButton onClick={clearGraph} title="Clear Canvas" className="hover:!bg-red-500/10 hover:!fill-red-400 group transition-colors">
                        <Trash size={14} className="group-hover:text-red-400 group-hover:fill-none transition-colors" />
                    </ControlButton>
                </Controls>
                <MiniMap 
                    nodeColor={() => '#a855f7'} // Premium glowing purple nodes in minimap
                    maskColor="rgba(9, 9, 11, 0.85)"
                    style={{
                        backgroundColor: '#18181B',
                        border: '1px solid rgba(255,255,255,0.05)',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
                    }}
                />
                
                {/* Premium Empty State */}
                {nodes.length === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                        <div className="flex flex-col items-center gap-5 opacity-40 animate-in fade-in zoom-in-95 duration-1000 slide-in-from-bottom-4">
                            <div className="w-20 h-20 rounded-[24px] border border-dashed border-white/20 bg-white/5 flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.02)] backdrop-blur-md">
                                <span className="text-white/40 text-3xl font-light">+</span>
                            </div>
                            <div className="flex flex-col items-center gap-1.5">
                                <span className="text-gray-300 font-semibold tracking-wide text-lg font-['Satoshi'] drop-shadow-md">Start building your AI workflow</span>
                                <span className="text-gray-500 text-[13px] font-medium tracking-wide">Drag nodes into the canvas to create intelligent automation pipelines.</span>
                            </div>
                        </div>
                    </div>
                )}
            </ReactFlow>

            {/* Vignette Edge Darkening */}
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.8)] z-50"></div>
        </div>
    );
};
