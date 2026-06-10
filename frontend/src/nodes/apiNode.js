import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { Globe, Shield } from 'lucide-react';

export const APINode = ({ id, data }) => {
  const [url, setUrl] = useState(data?.url || 'https://api.example.com');
  const [method, setMethod] = useState(data?.method || 'GET');
  const [authEnabled, setAuthEnabled] = useState(data?.authEnabled || false);

  return (
    <BaseNode 
      id={id} 
      title={
        <div className="flex items-center gap-2 text-blue-400">
          <Globe size={16} />
          <span>API Request</span>
        </div>
      }
      inputs={[{ id: 'requestBody' }]} 
      outputs={[{ id: 'responseData' }]}
    >
      <div className="flex flex-col gap-4 min-w-[220px]">
        {/* Method & URL */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Endpoint</span>
          <div className="flex gap-2">
            <select 
              value={method} 
              onChange={(e) => setMethod(e.target.value)}
              className="bg-black/20 border border-white/10 rounded-md text-blue-400 font-bold px-2 py-1.5 text-xs transition-all duration-200 focus:outline-none focus:border-blue-500/80 w-24 cursor-pointer"
            >
              <option value="GET" className="bg-[#1E1E24]">GET</option>
              <option value="POST" className="bg-[#1E1E24]">POST</option>
              <option value="PUT" className="bg-[#1E1E24]">PUT</option>
            </select>
            <input 
              type="text" 
              value={url} 
              onChange={(e) => setUrl(e.target.value)}
              className="w-full bg-black/20 border border-white/10 rounded-md text-gray-200 px-2 py-1.5 text-xs transition-all duration-200 focus:outline-none focus:border-blue-500/80"
            />
          </div>
        </div>

        {/* Auth Toggle */}
        <div className="flex items-center justify-between bg-black/10 p-2 rounded-md border border-white/5">
          <div className="flex items-center gap-2">
            <Shield size={14} className={authEnabled ? 'text-blue-400' : 'text-gray-500'} />
            <span className="text-xs font-medium text-gray-300">Authorization</span>
          </div>
          <button 
            onClick={() => setAuthEnabled(!authEnabled)}
            className={`w-8 h-4 rounded-full transition-colors duration-200 flex items-center cursor-pointer ${authEnabled ? 'bg-blue-500' : 'bg-gray-600'}`}
          >
            <div className={`w-3 h-3 bg-white rounded-full mx-0.5 shadow-sm transition-transform duration-200 ${authEnabled ? 'translate-x-4' : 'translate-x-0'}`} />
          </button>
        </div>
      </div>
    </BaseNode>
  );
};
