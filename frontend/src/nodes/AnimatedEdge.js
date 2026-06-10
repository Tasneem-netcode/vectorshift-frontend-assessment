import React from 'react';
import { BaseEdge, getBezierPath } from 'reactflow';

export const AnimatedEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}) => {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      {/* 1. Pipe Outer Shell (The visible border of the tube) */}
      <BaseEdge 
        path={edgePath} 
        style={{ stroke: 'rgba(255, 255, 255, 0.12)', strokeWidth: 6, strokeLinecap: 'round' }} 
      />

      {/* 2. Pipe Inner Hollow Core (The dark inside of the tube) */}
      <BaseEdge 
        path={edgePath} 
        style={{ stroke: '#121214', strokeWidth: 4, strokeLinecap: 'round' }} 
      />
      
      {/* 3. The Flowing Data Pill (Moving through the center) */}
      <g>
        <rect x="-8" y="-1.5" width="16" height="3" rx="1.5" fill="#a855f7" filter="drop-shadow(0 0 2px rgba(168,85,247,0.8))">
          <animateMotion dur="2.5s" repeatCount="indefinite" path={edgePath} rotate="auto" />
        </rect>
      </g>

      {/* 4. Pipe Frosted Overlay (Covers the pill so it looks inside dark glass) */}
      <BaseEdge 
        path={edgePath} 
        style={{ stroke: 'rgba(18, 18, 20, 0.65)', strokeWidth: 4, strokeLinecap: 'round' }} 
        markerEnd={markerEnd}
      />
    </>
  );
};
