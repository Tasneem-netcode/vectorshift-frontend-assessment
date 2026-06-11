import { useState } from 'react';
import { Play, CheckCircle2, AlertTriangle, X, Component, GitMerge, Zap } from 'lucide-react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

export const SubmitButton = () => {
    const { nodes, edges } = useStore((state) => ({
        nodes: state.nodes,
        edges: state.edges,
    }), shallow);

    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleSubmit = async () => {
        setIsLoading(true);
        setResult(null);

        try {
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nodes, edges }),
            });

            if (!response.ok) throw new Error('Failed to analyze pipeline');

            const data = await response.json();
            
            // Artificial delay to show off the beautiful loading state (UX psychological principle)
            setTimeout(() => {
                setResult(data);
                setIsLoading(false);
            }, 800);
            
        } catch (error) {
            console.error('Submission error:', error);
            alert('Failed to connect to backend. Is FastAPI running on port 8000?');
            setIsLoading(false);
        }
    };

    return (
        <>
            <button 
              onClick={handleSubmit}
              disabled={isLoading}
              className={`flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold py-2.5 px-6 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all duration-300 ${isLoading ? 'opacity-90 cursor-wait scale-[0.98]' : 'hover:scale-[1.02] border border-white/10 hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]'}`}
            >
              <Play size={16} className={`fill-white ${isLoading ? 'animate-pulse' : ''}`} />
              <span className="tracking-wide text-[14px]">{isLoading ? 'Validating Graph...' : 'Deploy Pipeline'}</span>
            </button>

            {/* Premium Result Modal */}
            {result && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#09090B]/80 backdrop-blur-md transition-opacity animate-in fade-in duration-300">
                    <div className="relative bg-[#121214] border border-[#27272A] rounded-3xl shadow-[0_0_80px_rgba(0,0,0,0.8)] p-1 w-full max-w-md transform transition-all animate-in zoom-in-95 slide-in-from-bottom-8 duration-500 ease-out">
                        
                        {/* Outer Glowing Border Ring */}
                        <div className={`absolute inset-0 rounded-3xl opacity-20 blur-xl transition-colors duration-1000 ${result.is_dag ? 'bg-emerald-500' : 'bg-red-500'}`}></div>

                        <div className="relative bg-[#18181B] border border-[#27272A] rounded-[22px] p-8 overflow-hidden">
                            {/* Top right close button */}
                            <button 
                                onClick={() => setResult(null)}
                                className="absolute top-5 right-5 text-gray-500 hover:text-white transition-colors bg-[#222225] p-1.5 rounded-full hover:bg-[#27272A]"
                            >
                                <X size={16} />
                            </button>

                            <div className="flex flex-col items-center text-center">
                                {/* Animated Status Icon */}
                                <div className="relative flex items-center justify-center mb-6">
                                    {result.is_dag ? (
                                        <>
                                            <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl animate-pulse"></div>
                                            <div className="relative w-16 h-16 rounded-full bg-gradient-to-b from-emerald-400/20 to-emerald-500/5 border border-emerald-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                                                <CheckCircle2 size={32} className="text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl animate-pulse"></div>
                                            <div className="relative w-16 h-16 rounded-full bg-gradient-to-b from-red-400/20 to-red-500/5 border border-red-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.2)]">
                                                <AlertTriangle size={32} className="text-red-400 drop-shadow-[0_0_8px_rgba(248,113,113,0.8)]" />
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* Text Content */}
                                <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">
                                    {result.is_dag ? 'Pipeline Validated' : 'Deployment Blocked'}
                                </h2>
                                <p className="text-[14px] leading-relaxed text-gray-400 mb-8 px-2">
                                    {result.is_dag 
                                        ? 'Your directed acyclic graph is mathematically sound and ready for production deployment.' 
                                        : 'A cycle was detected in your workflow. AI models cannot resolve infinite loops. Please fix your connections.'}
                                </p>

                                {/* Statistics Grid */}
                                <div className="grid grid-cols-2 gap-3 w-full mb-8">
                                    <div className="flex flex-col items-center bg-[#222225] rounded-2xl p-4 border border-[#3F3F46] shadow-inner">
                                        <Component size={18} className="text-gray-400 mb-2" />
                                        <div className="text-3xl font-bold text-white tracking-tight mb-1">{result.num_nodes}</div>
                                        <div className="text-[11px] font-bold tracking-widest text-gray-500 uppercase">Nodes</div>
                                    </div>
                                    <div className="flex flex-col items-center bg-[#222225] rounded-2xl p-4 border border-[#3F3F46] shadow-inner">
                                        <GitMerge size={18} className="text-gray-400 mb-2" />
                                        <div className="text-3xl font-bold text-white tracking-tight mb-1">{result.num_edges}</div>
                                        <div className="text-[11px] font-bold tracking-widest text-gray-500 uppercase">Edges</div>
                                    </div>
                                </div>
                                
                                {/* Action Button */}
                                <button 
                                    onClick={() => setResult(null)}
                                    className={`w-full py-3.5 rounded-xl font-semibold tracking-wide transition-all duration-300 flex items-center justify-center gap-2 ${
                                        result.is_dag 
                                            ? 'bg-white text-black hover:bg-gray-200 hover:scale-[1.02] shadow-[0_0_20px_rgba(255,255,255,0.2)]' 
                                            : 'bg-[#27272A] text-white hover:bg-[#3F3F46] border border-[#3F3F46]'
                                    }`}
                                >
                                    {result.is_dag ? (
                                        <>
                                            <Zap size={16} className="fill-black" /> Deploy to Production
                                        </>
                                    ) : (
                                        'Return to Canvas'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
