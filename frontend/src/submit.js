import { useState } from 'react';
import { Play, CheckCircle2, AlertTriangle, X, Component, GitMerge, Zap } from 'lucide-react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

export const SubmitButton = () => {
    const { nodes, edges, setGraphInvalid, setExecuting } = useStore((state) => ({
        nodes: state.nodes,
        edges: state.edges,
        setGraphInvalid: state.setGraphInvalid,
        setExecuting: state.setExecuting
    }), shallow);

    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleSubmit = async () => {
        setIsLoading(true);
        setResult(null);
        setGraphInvalid(false); // Reset validation state
        setExecuting(true);     // Trigger execution animation simulation

        try {
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nodes, edges }),
            });

            if (!response.ok) throw new Error('Failed to analyze pipeline');

            const data = await response.json();

            // Cinematic Execution Simulation: 1.5s artificial delay for psychological effect
            setTimeout(() => {
                setExecuting(false);
                setResult(data);
                setIsLoading(false);
                // Dispatch global error state to trigger red edges on the canvas
                if (!data.is_dag) {
                    setGraphInvalid(true);
                }
            }, 1500); 

        } catch (error) {
            console.error('Submission error:', error);
            alert('Failed to connect to backend. Is FastAPI running on port 8000?');
            setIsLoading(false);
            setExecuting(false);
        }
    };

    return (
        <>
            <button
                onClick={handleSubmit}
                disabled={isLoading}
                className={`flex items-center gap-2.5 bg-white hover:bg-gray-200 text-black font-semibold py-2.5 px-6 rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-300 border border-white/20 ${isLoading ? 'opacity-80 cursor-wait scale-[0.98]' : 'hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,255,255,0.25)]'}`}
            >
                {isLoading ? (
                    <div className="w-4 h-4 rounded-full border-2 border-black/20 border-t-black animate-spin"></div>
                ) : (
                    <Play size={14} className="fill-black" />
                )}
                <span className="tracking-wide text-[14px] font-['Satoshi']">Submit Workflow</span>
            </button>

            {/* Minimalist Loading State */}
            {isLoading && !result && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505]/40 backdrop-blur-[4px] transition-opacity animate-in fade-in duration-300">
                    <div className="flex items-center gap-4 bg-[#18181B] border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.8)] rounded-2xl px-6 py-4 animate-in slide-in-from-bottom-4 duration-300">
                        <div className="w-5 h-5 rounded-full border-[2px] border-white/20 border-t-white animate-spin"></div>
                        <span className="text-gray-200 font-medium text-[14px] tracking-wide font-['Satoshi']">Analyzing workflow...</span>
                    </div>
                </div>
            )}

            {/* Premium Horizontal AI Deployment Status Card */}
            {result && (
                <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] transition-opacity animate-in fade-in slide-in-from-bottom-12 duration-500">
                    <div className="w-[520px] bg-[#0A0A0B]/80 backdrop-blur-2xl border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.8)] rounded-3xl p-5 flex items-center justify-between gap-5 relative overflow-hidden group">
                        
                        {/* Soft Background Gradient Glow */}
                        <div className={`absolute top-1/2 left-0 -translate-y-1/2 w-48 h-48 blur-[80px] opacity-20 pointer-events-none transition-colors duration-1000 ${result.is_dag ? 'bg-emerald-500' : 'bg-red-500'}`}></div>

                        {/* LEFT SECTION: Large glowing icon */}
                        <div className="relative shrink-0 flex items-center justify-center p-1">
                            {result.is_dag ? (
                                <div className="relative w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                                    <div className="absolute inset-0 rounded-full border border-emerald-500/30 animate-ping" style={{ animationDuration: '3s' }}></div>
                                    <CheckCircle2 size={28} className="text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]" strokeWidth={2.5} />
                                </div>
                            ) : (
                                <div className="relative w-14 h-14 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.2)]">
                                    <div className="absolute inset-0 rounded-full border border-red-500/30 animate-pulse" style={{ animationDuration: '2s' }}></div>
                                    <AlertTriangle size={28} className="text-red-400 drop-shadow-[0_0_8px_rgba(248,113,113,0.8)]" strokeWidth={2.5} />
                                </div>
                            )}
                        </div>

                        {/* CENTER SECTION: Text content */}
                        <div className="flex-1 flex flex-col justify-center min-w-0 z-10 py-1">
                            <h2 className="text-[17px] font-bold text-white tracking-tight mb-1 font-['Satoshi']">
                                {result.is_dag ? 'Execution Ready' : 'Deployment Blocked'}
                            </h2>
                            <p className="text-[13px] text-gray-400 leading-snug mb-3 pr-2">
                                {result.is_dag 
                                    ? 'Your workflow architecture passed DAG validation and is safe for deployment.' 
                                    : 'AI workflows rely on sequential step execution where each step depends on the outputs of the previous ones. A circular loop creates an infinite dependency cycle where no step can begin. Please break the cycle.'}
                            </p>
                            {/* Metadata row */}
                            <div className="flex items-center gap-3 text-[10px] font-bold tracking-widest text-gray-500 uppercase">
                                {result.is_dag ? (
                                    <>
                                        <span className="flex items-center gap-1.5 text-emerald-500/90"><CheckCircle2 size={12} strokeWidth={3}/> Nodes: {result.num_nodes}</span>
                                        <span className="flex items-center gap-1.5 text-emerald-500/90"><CheckCircle2 size={12} strokeWidth={3}/> Edges: {result.num_edges}</span>
                                        <span className="flex items-center gap-1.5 text-emerald-500/90"><CheckCircle2 size={12} strokeWidth={3}/> DAG Verified</span>
                                    </>
                                ) : (
                                    <span className="flex items-center gap-1.5 text-red-500/90"><X size={12} strokeWidth={3}/> DAG Invalid</span>
                                )}
                            </div>
                        </div>

                        {/* RIGHT SECTION: CTA Buttons */}
                        <div className="shrink-0 flex flex-col gap-2 z-10">
                            {result.is_dag ? (
                                <button 
                                    onClick={() => setResult(null)}
                                    className="px-6 py-2.5 rounded-full font-bold text-[13px] tracking-wide transition-all duration-300 flex items-center justify-center gap-2 bg-gradient-to-b from-emerald-400 to-emerald-600 text-[#061510] hover:from-emerald-300 hover:to-emerald-500 hover:scale-[1.03] shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]"
                                >
                                    Deploy to Production
                                </button>
                            ) : (
                                <>
                                    <button 
                                        onClick={() => setResult(null)}
                                        className="px-6 py-2.5 rounded-full font-bold text-[13px] tracking-wide transition-all duration-300 flex items-center justify-center gap-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30 hover:scale-[1.03] shadow-[0_0_20px_rgba(239,68,68,0.1)]"
                                    >
                                        Inspect Errors
                                    </button>
                                    <button 
                                        onClick={() => setResult(null)}
                                        className="text-[11px] text-gray-500 hover:text-gray-300 transition-colors font-medium text-center tracking-wide"
                                    >
                                        Auto Focus Cycle
                                    </button>
                                </>
                            )}
                        </div>
                        
                        {/* Subtle close button top-right inside */}
                        <button 
                            onClick={() => setResult(null)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-1 rounded-full z-20"
                        >
                            <X size={12} />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};
