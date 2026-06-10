import { InputNode } from './inputNode';
import { LLMNode } from './llmNode';
import { OutputNode } from './outputNode';
import { TextNode } from './textNode';
import { PromptOptimizerNode } from './promptOptimizerNode';
import { APINode } from './apiNode';
import { PDFNode } from './pdfNode';
import { EmailNode } from './emailNode';
import { ImageNode } from './ImageNode';

// Single Source of Truth for Node Registration
export const nodeConfig = [
  { type: 'customInput', label: 'Input', component: InputNode },
  { type: 'llm', label: 'LLM', component: LLMNode },
  { type: 'customOutput', label: 'Output', component: OutputNode },
  { type: 'text', label: 'Text', component: TextNode },
  { type: 'promptOptimizer', label: 'Optimizer', component: PromptOptimizerNode },
  { type: 'api', label: 'API Fetch', component: APINode },
  { type: 'pdfLoader', label: 'PDF Loader', component: PDFNode },
  { type: 'email', label: 'Email', component: EmailNode },
  { type: 'imageGen', label: 'Image Gen', component: ImageNode },
];

// Automatically generate the nodeTypes object for React Flow
export const nodeTypes = nodeConfig.reduce((acc, node) => {
  acc[node.type] = node.component;
  return acc;
}, {});
