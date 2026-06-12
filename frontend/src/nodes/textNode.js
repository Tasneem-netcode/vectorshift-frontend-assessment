import { useState, useEffect, useRef } from 'react';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const TextNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  // State for the text and extracted variables
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);

  const textareaRef = useRef(null);

  // FEATURE 1: Auto-resizing textarea
  useEffect(() => {
    if (textareaRef.current) {
      // Temporarily collapse the height to 'auto' to force recalculation of scrollHeight
      textareaRef.current.style.height = 'auto';
      // Set the height exactly to the scrollHeight so it expands downward smoothly
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [currText]);

  // FEATURE 2: Dynamic Variable Parsing (Regex)
  useEffect(() => {
    // Regex breakdown:
    // \{\{\s*  => Match opening double braces '{{' followed by optional whitespace
    // ([a-zA-Z_$][a-zA-Z0-9_$]*) => Capture group: Valid JS variable (starts with letter/_/$, followed by alphanumeric/_/$)
    // \s*\}\}  => Match optional whitespace followed by closing double braces '}}'
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;

    // We use a Set to automatically eliminate duplicates (e.g., if a user types {{name}} twice)
    const matches = new Set();
    let match;

    // .exec() loops through the string and finds all matches
    while ((match = regex.exec(currText)) !== null) {
      matches.add(match[1]); // match[1] is the precise captured variable name
    }

    setVariables(Array.from(matches));
  }, [currText]);

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setCurrText(newText);
    // Persist to global Zustand store so the backend can read it later
    updateNodeField(id, 'text', newText);
  };

  // FEATURE 3: Dynamic Handles Generation
  // Map our extracted variable strings into handle objects that BaseNode understands
  const dynamicInputs = variables.map((variable) => ({
    id: variable,
    label: variable
  }));

  return (
    <BaseNode
      id={id}
      title="Text"
      inputs={dynamicInputs} // Pass the dynamic array of variables
      outputs={[{ id: 'output' }]}
    >
      <div className="flex flex-col gap-2">
        <label className="text-gray-400 text-[12px] font-semibold tracking-wider uppercase">Prompt</label>

        {/* Modern, premium textarea replacing standard input */}
        <textarea
          ref={textareaRef}
          value={currText}
          onChange={handleTextChange}
          placeholder="Type your prompt here. Use {{variable}} to create inputs."
          className="bg-[#18181B] border border-transparent rounded-xl text-gray-200 px-4 py-3 text-[14px] leading-relaxed resize-none overflow-hidden transition-all duration-200 focus:outline-none focus:bg-[#27272A] focus:border-[#52525B] w-full min-h-[80px]"
          rows={1}
        />
      </div>
    </BaseNode>
  );
};
