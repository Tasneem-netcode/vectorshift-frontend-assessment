import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div className="w-screen h-screen bg-[#0A0A0C] overflow-hidden relative">
      <PipelineToolbar />
      <PipelineUI />
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
        <SubmitButton />
      </div>
    </div>
  );
}

export default App;
