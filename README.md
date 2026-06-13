# ⚡️ AI Workflow Orchestration Platform

A highly polished, cinematic node-based visual programming environment designed to build, visualize, and execute complex AI pipelines. Built as a premium implementation of the VectorShift Frontend Technical Assessment.

## ✨ Features

- **Premium Glassmorphic UI**: High-end visual aesthetic inspired by Vercel AI, Linear, and production-grade SaaS products. Features translucent cards, drop-shadows, and smooth microinteractions.
- **Cinematic Execution Simulation**: Hitting "Submit Workflow" throws the pipeline into "hyperdrive". Nodes pulse, edges accelerate visually, and execution is beautifully simulated before validation.
- **Dynamic Smart Edges**: Animated, flowing data wires use smooth organic Bezier curves that dynamically inherit the color of the source node they are connected to.
- **Interactive Nodes**: 
  - 9 distinct nodes (Input, Output, LLM, Text, API, Optimizer, Image, Email, PDF) mapped to unique, high-contrast pastel glow colors.
  - Nodes lift on hover, handles scale up to invite connection, and active bounding borders respond dynamically.
- **DAG Validation Backend**: Fully integrated with a FastAPI Python backend to parse the visual graph and rigorously validate that it forms a Directed Acyclic Graph (DAG), ensuring no infinite dependency loops.
- **Dynamic Text Parsing**: The `Text` node dynamically parses `{{variables}}` as you type, instantly generating and removing handles in real-time.

## 🛠 Tech Stack

### Frontend
- **React** (Component Architecture)
- **React Flow** (Core Node & Edge rendering engine)
- **TailwindCSS** (Rapid, utility-first premium styling)
- **Zustand** (Global state management for rapid drag/drop/connect logic)
- **Lucide React** (Beautiful, minimal SVG icons)

### Backend
- **FastAPI** (High-performance Python API)
- **Uvicorn** (ASGI Web Server)
- **NetworkX** (Underlying graph math, if utilized for DAG validation)

## 🚀 Getting Started

To run this platform locally, you will need to start both the Python backend and the React frontend.

### 1. Start the Backend
The backend runs a FastAPI server on port `8000`.

```bash
cd backend
pip install -r requirements.txt  # If applicable
python -m uvicorn main:app --reload --port 8000
```

### 2. Start the Frontend
The frontend runs on port `3000` (or Vite's default `5173`).

```bash
cd frontend
npm install
npm start
```

## 🏗 Architecture Overview

- `/frontend/src/nodes/BaseNode.js`: The highly reusable, visually stunning wrapper component. It dynamically figures out colors, icons, and handles based purely on metadata.
- `/frontend/src/nodes/AnimatedEdge.js`: Custom React Flow edge renderer featuring a hollow core pipe, faint trail, and a high-speed animating gradient pill.
- `/frontend/src/ui.js`: The primary React Flow canvas wrapper handling drag-and-drop, connection state, the cinematic background blobs, and the premium empty state.
- `/frontend/src/store.js`: The Zustand store tracking nodes, edges, validation states, and execution animations globally without prop-drilling.
- `/frontend/src/submit.js`: Handles backend communication and mounts the highly polished, deploy-ready validation card upon graph execution.

## 🎨 UI/UX Philosophy

This project was built with a core philosophy: **Development tools don't have to look boring**. By leveraging hardware-accelerated CSS properties (`mix-blend-screen`, `backdrop-blur`), subtle transition timings, and spatial typography, this workflow builder feels like a heavy-duty production platform ready for real enterprise AI orchestration.
