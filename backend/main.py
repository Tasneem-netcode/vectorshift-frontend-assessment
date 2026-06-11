from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any

app = FastAPI()

# PART 5: CORS Configuration
# This allows our React frontend (localhost:3000) to securely communicate with this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# PART 2: Request Body Validation
# Pydantic model defining the expected JSON structure from the frontend
class PipelineData(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

# PART 4: Backend Implementation
@app.post('/pipelines/parse')
def parse_pipeline(pipeline: PipelineData):
    # Extract nodes and edges from the validated JSON body
    nodes = pipeline.nodes
    edges = pipeline.edges
    
    num_nodes = len(nodes)
    num_edges = len(edges)
    
    # PART 3: DAG Logic (Directed Acyclic Graph)
    # 1. Build an Adjacency List (Graph representation)
    adj_list = {node['id']: [] for node in nodes}
    for edge in edges:
        source = edge.get('source')
        target = edge.get('target')
        if source in adj_list:
            adj_list[source].append(target)
            
    # 2. Cycle Detection using DFS (Depth First Search)
    visited = set()       # Tracks fully processed nodes
    rec_stack = set()     # Tracks nodes currently in the recursion stack (active path)
    
    def is_cyclic(node_id):
        visited.add(node_id)
        rec_stack.add(node_id)
        
        # Traverse all neighbors (outgoing edges)
        for neighbor in adj_list.get(node_id, []):
            if neighbor not in visited:
                if is_cyclic(neighbor):
                    return True
            elif neighbor in rec_stack:
                # If we hit a node that is currently in our recursion stack, WE FOUND A CYCLE!
                return True
                
        # Remove from recursion stack before backtracking
        rec_stack.remove(node_id)
        return False

    # 3. Check every node (handles disconnected components)
    is_dag = True
    for node in nodes:
        if node['id'] not in visited:
            if is_cyclic(node['id']):
                is_dag = False
                break
                
    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": is_dag
    }
