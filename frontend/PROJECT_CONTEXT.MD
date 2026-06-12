# VectorShift Frontend Technical Assessment — Project Context

## Project Goal

This project is a premium AI workflow builder inspired by:

* Langflow
* Flowise
* n8n
* modern AI workflow systems

The goal is to demonstrate:

* scalable frontend architecture
* reusable node abstractions
* reactive UI systems
* full-stack integration
* DAG validation
* premium UX/product thinking

---

# Tech Stack

Frontend:

* React
* React Flow
* Zustand
* Tailwind CSS

Backend:

* FastAPI
* Python

---

# Core Architecture

## BaseNode Abstraction

A reusable `BaseNode.js` component was created to:

* standardize node layout
* standardize handle rendering
* centralize styling
* improve scalability
* reduce duplicated code

All nodes inherit from BaseNode.

Responsibilities:

* render node shell
* render handles
* apply common layout/styling
* manage spacing/visual consistency

---

# Existing Nodes

Core nodes:

* InputNode
* OutputNode
* LLMNode
* TextNode

Custom nodes:

* APINode
* PDFLoaderNode
* EmailNode
* ImageGenerationNode
* PromptOptimizerNode

Goal:
Demonstrate flexibility and scalability of node architecture.

---

# Styling Direction

UI inspiration:

* Linear
* Vercel
* Langflow
* modern AI SaaS products

Visual goals:

* cinematic dark UI
* subtle glows
* animated edges
* glassmorphism
* premium spacing
* futuristic AI aesthetic

Important styling systems:

* semantic glow colors
* smooth hover transitions
* animated edge flow
* dark atmospheric canvas

---

# TextNode Logic

Implemented advanced TextNode behavior.

Features:

* auto-resizing textarea
* multiline prompt support
* dynamic variable parsing
* dynamic input handles

Variable syntax:
{{variable}}

Regex used:
{{ valid JS variables }}

Handles are generated dynamically based on parsed variables.

Example:
"Hello {{name}}"

Creates:

* input handle: name

Architecture:

* TextNode handles parsing/state
* BaseNode handles rendering/layout

---

# Backend Integration

Frontend sends:

* nodes
* edges

to:
POST /pipelines/parse

Backend responsibilities:

* count nodes
* count edges
* validate DAG structure
* return analysis JSON

Response:
{
num_nodes,
num_edges,
is_dag
}

---

# DAG Validation

Graph theory concepts:

* workflows represented as directed graphs
* cycles are invalid
* backend uses DFS-based cycle detection

Purpose:
Prevent infinite workflow loops.

Valid:
A → B → C

Invalid:
A → B → C → A

---

# UX Improvements Added

Implemented:

* animated validation modal
* success/error states
* deployment feedback
* premium loading experience
* glowing error states
* animated edges
* polished node interactions

Goal:
Make project feel like real startup-grade workflow software.

---

# Engineering Philosophy

This project prioritizes:

* scalability
* clean architecture
* separation of concerns
* reactive systems
* product-quality UX
* maintainability
* reusable systems

---

# Important Concepts

## Reactive UI

UI changes dynamically based on state.

## Graph-Based Architecture

Workflows represented as nodes + edges.

## Separation of Concerns

* BaseNode = presentation/layout
* individual nodes = logic

## Product Thinking

UX should feel:

* intuitive
* responsive
* premium
* visually communicative

---

# Current State

Completed:

* Part 1
* Part 2
* Part 3
* Part 4

Pending polish:

* edge error highlighting
* minimap styling
* loading polish
* spacing refinements
* walkthrough preparation

---

# Demo Focus

Important walkthrough topics:

* reusable node architecture
* dynamic TextNode variables
* React Flow graph system
* frontend/backend integration
* DAG validation
* product-focused UX decisions
