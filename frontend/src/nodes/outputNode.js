// outputNode.js

import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  return (
    <BaseNode id={id} title="Output" inputs={[{ id: 'value' }]}>
      <label className="flex flex-col gap-1">
        <span>Name:</span>
        <input 
          type="text" 
          value={currName} 
          onChange={handleNameChange} 
          className="bg-black/20 border border-white/10 rounded-md text-white px-2 py-1.5 transition-all duration-200 focus:outline-none focus:border-purple-500/80 focus:ring-2 focus:ring-purple-500/20"
        />
      </label>
      <label className="flex flex-col gap-1">
        <span>Type:</span>
        <select 
          value={outputType} 
          onChange={handleTypeChange}
          className="bg-[#1E1E24] border border-white/10 rounded-md text-white px-2 py-1.5 transition-all duration-200 focus:outline-none focus:border-purple-500/80 focus:ring-2 focus:ring-purple-500/20"
        >
          <option value="Text">Text</option>
          <option value="File">Image</option>
        </select>
      </label>
    </BaseNode>
  );
}
