// submit.js
import { Play } from 'lucide-react';

export const SubmitButton = () => {
    return (
        <button 
          type="submit"
          className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold py-3 px-6 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-300 hover:scale-105 border border-white/10"
        >
          <Play size={18} className="fill-white" />
          <span>Deploy Pipeline</span>
        </button>
    );
}
