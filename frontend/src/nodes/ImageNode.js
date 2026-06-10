import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { Image as ImageIcon, ImagePlus } from 'lucide-react';

export const ImageNode = ({ id, data }) => {
  const [resolution, setResolution] = useState(data?.resolution || '1024x1024');
  const [style, setStyle] = useState(data?.style || 'Photorealistic');

  return (
    <BaseNode 
      id={id} 
      title={
        <div className="flex items-center gap-2 text-pink-400">
          <ImageIcon size={16} />
          <span>Image Generation</span>
        </div>
      }
      inputs={[{ id: 'prompt' }]} 
      outputs={[{ id: 'imageData' }]}
    >
      <div className="flex flex-col gap-4 min-w-[220px]">
        {/* Placeholder Preview Grid */}
        <div className="w-full h-24 bg-gradient-to-br from-pink-500/5 to-purple-500/10 border border-white/10 rounded-lg flex items-center justify-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center cursor-pointer">
            <span className="text-xs text-white font-medium flex items-center gap-1">
              <ImagePlus size={14}/> Generate Preview
            </span>
          </div>
          <ImageIcon size={32} className="text-pink-500/20" />
        </div>

        {/* Resolution & Style Selectors */}
        <div className="flex gap-2">
          <label className="flex flex-col gap-1.5 flex-1">
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Size</span>
            <select 
              value={resolution} 
              onChange={(e) => setResolution(e.target.value)}
              className="w-full bg-black/20 border border-white/10 rounded-md text-gray-200 px-2 py-1.5 text-xs transition-all duration-200 focus:outline-none focus:border-pink-500/80 cursor-pointer"
            >
              <option value="512x512" className="bg-[#1E1E24]">512x512</option>
              <option value="1024x1024" className="bg-[#1E1E24]">1024x1024</option>
            </select>
          </label>

          <label className="flex flex-col gap-1.5 flex-1">
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Style</span>
            <select 
              value={style} 
              onChange={(e) => setStyle(e.target.value)}
              className="w-full bg-black/20 border border-white/10 rounded-md text-gray-200 px-2 py-1.5 text-xs transition-all duration-200 focus:outline-none focus:border-pink-500/80 cursor-pointer"
            >
              <option value="Photorealistic" className="bg-[#1E1E24]">Realistic</option>
              <option value="Anime" className="bg-[#1E1E24]">Anime</option>
              <option value="Digital Art" className="bg-[#1E1E24]">Digital</option>
            </select>
          </label>
        </div>
      </div>
    </BaseNode>
  );
};
