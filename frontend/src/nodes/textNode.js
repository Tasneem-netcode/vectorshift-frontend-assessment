// textNode.js

import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  return (
    <BaseNode id={id} title="Text" outputs={[{ id: 'output' }]}>
      <label className="flex flex-col gap-1">
        <span>Text:</span>
        <input 
          type="text" 
          value={currText} 
          onChange={handleTextChange} 
          className="bg-black/20 border border-white/10 rounded-md text-white px-2 py-1.5 transition-all duration-200 focus:outline-none focus:border-purple-500/80 focus:ring-2 focus:ring-purple-500/20"
        />
      </label>
    </BaseNode>
  );
}
