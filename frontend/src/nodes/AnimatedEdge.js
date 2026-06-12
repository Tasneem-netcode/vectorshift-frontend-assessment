import React from 'react';
import { BaseEdge, getBezierPath } from 'reactflow';
import { useStore } from '../store';

const getEdgeColor = (nodeType) => {
  const t = typeof nodeType === 'string' ? nodeType.toLowerCase() : '';
  if (t.includes('input')) return '#60A5FA'; // blue-400
  if (t.includes('output')) return '#34D399'; // emerald-400
  if (t.includes('llm')) return '#A78BFA'; // violet-400
  if (t.includes('text')) return '#FBBF24'; // amber-400
  if (t.includes('image')) return '#F472B6'; // pink-400
  if (t.includes('optimiz')) return '#E879F9'; // fuchsia-400
  if (t.includes('email')) return '#4ADE80'; // green-400
  if (t.includes('pdf')) return '#F87171'; // red-400
  if (t.includes('api')) return '#22D3EE'; // cyan-400
  return '#A1A1AA'; // zinc-400
};

export const AnimatedEdge = ({
  id,
  source,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}) => {
  const isGraphInvalid = useStore(state => state.isGraphInvalid);
  const isExecuting = useStore(state => state.isExecuting);
  const nodes = useStore(state => state.nodes);

  // Look up source node type
  const sourceNode = nodes.find(n => n.id === source);
  const sourceType = sourceNode?.data?.nodeType || '';
  const edgeColor = isGraphInvalid ? '#ef4444' : getEdgeColor(sourceType);

  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <g className={isGraphInvalid ? 'animate-pulse' : ''}>
      {/* 1. Pipe Outer Shell - Faint Trail */}
      <BaseEdge 
        path={edgePath} 
        style={{ 
          stroke: isGraphInvalid ? 'rgba(239, 68, 68, 0.4)' : 'rgba(255, 255, 255, 0.08)', 
          strokeWidth: isGraphInvalid ? 8 : 6, 
          strokeLinecap: 'round',
          transition: 'all 0.5s ease'
        }} 
      />

      {/* 2. Pipe Inner Hollow Core */}
      <BaseEdge 
        path={edgePath} 
        style={{ stroke: '#121214', strokeWidth: 4, strokeLinecap: 'round' }} 
      />
      
      {/* 3. The Flowing Data Pill */}
      <g>
        <rect 
          x="-8" y="-1.5" width="16" height="3" rx="1.5" 
          fill={edgeColor} 
          filter={`drop-shadow(0 0 3px ${edgeColor})`}
          style={{ transition: 'all 0.5s ease' }}
        >
          <animateMotion 
            dur={isExecuting ? "0.4s" : isGraphInvalid ? "0.8s" : "3s"} 
            repeatCount="indefinite" 
            path={edgePath} 
            rotate="auto" 
          />
        </rect>
      </g>

      {/* 4. Pipe Frosted Overlay */}
      <BaseEdge 
        path={edgePath} 
        style={{ 
          stroke: isGraphInvalid ? 'rgba(239, 68, 68, 0.15)' : 'rgba(18, 18, 20, 0.65)', 
          strokeWidth: 4, 
          strokeLinecap: 'round',
          transition: 'all 0.5s ease'
        }} 
        markerEnd={markerEnd}
      />
    </g>
  );
};
