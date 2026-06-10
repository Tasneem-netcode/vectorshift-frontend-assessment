// draggableNode.js

export const DraggableNode = ({ type, label }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <div
        className={`${type} cursor-grab px-4 py-2 flex items-center justify-center rounded-xl bg-[#27272A] border border-[#3F3F46] text-gray-300 text-[14px] font-semibold tracking-wide transition-all duration-200 hover:bg-[#3F3F46] hover:text-white`}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        draggable
      >
          <span>{label}</span>
      </div>
    );
  };
  