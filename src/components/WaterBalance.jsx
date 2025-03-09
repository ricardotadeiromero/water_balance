"use client";
import React, { useState, useCallback } from "react";
import {
  ReactFlow,
  Position,
  Controls,
  Background,
  useUpdateNodeInternals,
  Handle,
  useEdgesState,
  useNodesState,
  addEdge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import InputNode from "./node/InputNode";
import ProcessNode from "./node/ProcessNode";
import OutputNode from "./node/OutputNode";
import { DataEdge } from "./data-edge";
import CreateNode from "./create-node";

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
    type: "input",
    position: { x: 0, y: 0 },
    data: {
      label: "Precipitação",
      value: 50,
      unity: 1,
    },
  },
  {
    id: "2",
    type: "input",
    position: { x: 0, y: 0 },
    data: {
      label: "Precipitação",
      value: 100,
      unity: 1,
    },
  },
  {
    id: "3",
    type: "process",
    position: { x: 100, y: 100 },
    data: {
      label: "Usina",
      coef: 0.3,
    },
  },
];
const edgeTypes = {
  dataEdge: DataEdge,
};

const nodeTypes = {
  input: InputNode,
  process: ProcessNode,
  result: OutputNode,
};

export default function Flow() {
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  // const [nodeId, setNodeId] = useState(2);

  // const onAddNode = useCallback(() => {
  //   const newNode = {
  //     id: `${nodeId}`,
  //     position: {
  //       x: Math.random() * 400,
  //       y: Math.random() * 400,
  //     },
  //     data: {
  //       label: `Nó Especial ${nodeId}`,
  //     },
  //     type: "special",
  //   };

  //   setNodes((nds) => nds.concat(newNode));
  //   setNodeId((prev) => prev + 1);
  // }, [nodeId, setNodes]);

  // Atualiza o nó alvo (target) quando uma conexão é feita

  const updateNodeData = (nodeId, newValue) => {
    setNodes((prevNodes) =>
      prevNodes.map((node) => {
        if (node.id === nodeId) {
          return { ...node, data: { ...node.data, value: newValue } };
        }
        return node;
      })
    );
  };

  const updateProcessNode = (sourceNode, node) => {
    const sourceValue = Number(sourceNode.data.value) || 0;

    // Obtém os valores numéricos do nó destino
    const coef = Number(node.data.coef) || 0; // Fração removida (ex: 0.3 remove 30%)
    const targetValue = Number(node.data.value) || 0;
    const targetRemains = Number(node.data.remains) || 0;

    // Aplica o coeficiente na propagação do fluxo
    // const adjustedFlow = sourceOutput * (1 - coeficiente);
    const adjustedValue = sourceValue * coef;
    const adjustedRemains = sourceValue * (1 - coef);
    // Atualiza os dados do nó destino
    const updatedNode = {
      ...node,
      data: {
        ...node.data,
        value: targetValue + adjustedValue, // Ajusta o valor proporcionalmente
        remains: targetRemains + adjustedRemains,
      },
    };

    updateNodeInternals(node.id); // Força re-render no React Flow
    return updatedNode;
  };

  const updateNodeInternals = useUpdateNodeInternals();
  const onConnect = useCallback(
    (params) => {
      setNodes((nds) => {
        return nds.map((node) => {
          if (node.id === params.target) {
            // Encontra o nó de origem
            const sourceNode = nds.find((n) => n.id === params.source);
            if (!sourceNode) return node;

            if (node.type == "process")
              return updateProcessNode(sourceNode, node);
          }
          return node;
        });
      });

      // Adiciona a aresta ao fluxo
      setEdges((eds) => addEdge({ ...params, animated: true }, eds));
    },
    [setNodes, setEdges, updateNodeInternals]
  );

  // const onConnect = useCallback(
  //   (params) => {
  //     setNodes((nds) =>
  //       nds.map((node) => {
  //         if (node.id === params.target) {
  //           // Procura o nó de origem (raiz) no array de nós
  //           const sourceNode = nds.find((n) => n.id === params.source);
  //           // Converte os inputs para números, garantindo que não seja NaN
  //           const sourceInput = Number(sourceNode?.data.input) || 0;
  //           const sourceOutput = Number(sourceNode?.data.output) || 0;

  //           const targetInput = Number(node.data.input) || 0;
  //           const targetOutput = Number(node.data.output) || 0;
  //           console.log(sourceOutput);
  //           console.log(targetOutput);
  //           return {
  //             ...node,
  //             data: {
  //               ...node.data,
  //               // Atualiza o input do nó destino com a soma
  //               input: targetInput + sourceInput,
  //               output: targetOutput + sourceOutput,
  //               total:
  //                 targetInput + sourceInput - (targetOutput + sourceOutput),
  //             },
  //           };
  //         }
  //         return node;
  //       })
  //     );
  //     // Adiciona a aresta
  //     setEdges((eds) =>
  //       addEdge({ ...params, animated: true, data: { key: "total" } }, eds)
  //     );
  //   },
  //   [setNodes, setEdges]
  // );

  const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onConnect={onConnect}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        defaultEdgeOptions={{
          type: "dataEdge",
        }}
        fitView
      >
        {/* <Background /> */}
        <Controls showZoom={false} showFitView={false} showInteractive={false}>
          {/* <button
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
          </button> */}
          <CreateNode setNodes={setNodes} />
        </Controls>
      </ReactFlow>
    </div>
  );
}
