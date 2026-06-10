import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { Mail } from 'lucide-react';

export const EmailNode = ({ id, data }) => {
  const [recipient, setRecipient] = useState(data?.recipient || '');
  const [subject, setSubject] = useState(data?.subject || 'Workflow Alert');
  const [provider, setProvider] = useState(data?.provider || 'Gmail');

  return (
    <BaseNode 
      id={id} 
      title={
        <div className="flex items-center gap-2 text-emerald-400">
          <Mail size={16} />
          <span>Send Email</span>
        </div>
      }
      inputs={[{ id: 'messageContent' }]} 
      outputs={[{ id: 'deliveryStatus' }]}
    >
      <div className="flex flex-col gap-3 min-w-[220px]">
        {/* Provider */}
        <div className="flex justify-between items-center bg-black/20 p-1.5 rounded-md border border-white/5">
          <span className="text-xs font-medium text-gray-400 px-2">Provider</span>
          <select 
            value={provider} 
            onChange={(e) => setProvider(e.target.value)}
            className="bg-transparent border-none text-emerald-400 font-medium px-2 py-0.5 text-xs focus:outline-none cursor-pointer"
          >
            <option value="Gmail" className="bg-[#1E1E24]">Gmail</option>
            <option value="Outlook" className="bg-[#1E1E24]">Outlook</option>
            <option value="SMTP" className="bg-[#1E1E24]">SMTP</option>
          </select>
        </div>

        {/* To Input */}
        <label className="flex flex-col gap-1">
          <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide">To:</span>
          <input 
            type="email" 
            placeholder="user@example.com"
            value={recipient} 
            onChange={(e) => setRecipient(e.target.value)}
            className="bg-black/20 border border-white/10 rounded-md text-gray-200 px-2 py-1.5 text-xs transition-all duration-200 focus:outline-none focus:border-emerald-500/80"
          />
        </label>

        {/* Subject Input */}
        <label className="flex flex-col gap-1">
          <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide">Subject:</span>
          <input 
            type="text" 
            value={subject} 
            onChange={(e) => setSubject(e.target.value)}
            className="bg-black/20 border border-white/10 rounded-md text-gray-200 px-2 py-1.5 text-xs transition-all duration-200 focus:outline-none focus:border-emerald-500/80"
          />
        </label>
      </div>
    </BaseNode>
  );
};
