// inputNode.js

import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  return (
    <BaseNode id={id} title="Input" outputs={[{ id: 'value' }]}>
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
          value={inputType} 
          onChange={handleTypeChange}
          className="bg-[#1E1E24] border border-white/10 rounded-md text-white px-2 py-1.5 transition-all duration-200 focus:outline-none focus:border-purple-500/80 focus:ring-2 focus:ring-purple-500/20"
        >
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </label>
    </BaseNode>
  );
}
