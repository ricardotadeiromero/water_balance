"use client";
import React, { useState, useCallback } from "react";
import {
  ReactFlow,
  Position,
  Controls,
  Background,
  Handle,
  useEdgesState,
  useNodesState,
  addEdge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

const SpecialNode = ({ id, data, isConnectable }) => {
  return (
    <div
      style={{
        padding: "10px 20px",
        backgroundColor: "#4CAF50",
        color: "white",
        borderRadius: "5px",
        border: "2px solid #388E3C",
      }}
    >
      {data.label}
      {/* Handle de origem e alvo */}
      <Handle
        type="source"
        position={Position.Right}
        id="a"
        isConnectable={isConnectable}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="b"
        isConnectable={isConnectable}
      />
    </div>
  );
};

const initialNodes = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: { label: "Nó Inicial" },
  },
];

const nodeTypes = {
  special: SpecialNode,
};

export default function Flow() {
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [nodeId, setNodeId] = useState(2);

  const onAddNode = useCallback(() => {
    const newNode = {
      id: `${nodeId}`,
      position: {
        x: Math.random() * 400,
        y: Math.random() * 400,
      },
      data: {
        label: `Nó Especial ${nodeId}`,
      },
      type: "special",
    };

    setNodes((nds) => nds.concat(newNode));
    setNodeId((prev) => prev + 1);
  }, [nodeId, setNodes]);

  // Atualiza o nó alvo (target) quando uma conexão é feita
  const onConnect = useCallback(
    (params) => {
      // Atualiza o nó de destino
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === params.target) {
            return {
              ...node,
              data: {
                ...node.data,
                label: `Conectado ao nó ${params.source}`,
              },
            };
          }
          return node;
        })
      );
      // Adiciona a aresta
      setEdges((eds) => addEdge({ ...params, animated: true }, eds));
    },
    [setNodes, setEdges]
  );

  const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onConnect={onConnect}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        defaultViewport={defaultViewport}
      >
        <Background />
        <Controls showZoom={false} showFitView={false} showInteractive={false}>
          <button
            key="add-node-button"
            onClick={onAddNode}
            style={{
              padding: "5px 10px",
              background: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "3px",
              cursor: "pointer",
              margin: "5px",
            }}
            title="Adicionar Nó Especial"
          >
            +
          </button>
        </Controls>
      </ReactFlow>
    </div>
  );
}
