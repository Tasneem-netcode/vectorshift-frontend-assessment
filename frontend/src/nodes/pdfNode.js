import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { FileText, UploadCloud } from 'lucide-react';

export const PDFNode = ({ id, data }) => {
  const [fileName, setFileName] = useState('');
  const [chunkSize, setChunkSize] = useState(data?.chunkSize || '1000');

  return (
    <BaseNode 
      id={id} 
      title={
        <div className="flex items-center gap-2 text-red-400">
          <FileText size={16} />
          <span>PDF Loader</span>
        </div>
      }
      inputs={[]} 
      outputs={[{ id: 'extractedText' }, { id: 'metadata' }]}
    >
      <div className="flex flex-col gap-4 min-w-[220px]">
        {/* Upload Area */}
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-lg p-4 bg-black/10 hover:bg-black/20 hover:border-red-500/50 transition-all duration-200 cursor-pointer group">
          <UploadCloud size={24} className="text-gray-500 group-hover:text-red-400 transition-colors mb-2" />
          <span className="text-xs font-medium text-gray-400 group-hover:text-gray-300">
            {fileName || 'Click to upload PDF'}
          </span>
        </div>

        {/* Chunk Size Dropdown */}
        <label className="flex flex-col gap-1.5">
          <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Chunk Size (Tokens)</span>
          <select 
            value={chunkSize} 
            onChange={(e) => setChunkSize(e.target.value)}
            className="bg-black/20 border border-white/10 rounded-md text-gray-200 px-2 py-1.5 text-sm transition-all duration-200 focus:outline-none focus:border-red-500/80 cursor-pointer"
          >
            <option value="500" className="bg-[#1E1E24]">500 Tokens</option>
            <option value="1000" className="bg-[#1E1E24]">1000 Tokens</option>
            <option value="2000" className="bg-[#1E1E24]">2000 Tokens</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};
