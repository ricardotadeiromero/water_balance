"use client";
import { useReactFlow, Handle, Position } from "@xyflow/react";
import { BaseNode } from "@/components/base-node";
import {
  NodeHeader,
  NodeHeaderTitle,
  NodeHeaderIcon,
} from "@/components/node-header";
import { Factory } from "lucide-react";
import { convertUnityString } from "@/utils/convertUnityString";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"; // Import do shadcn/ui

const ProcessNode = ({ id, data, isConnectable }) => {
  const { setNodes } = useReactFlow(); // Obtém o setter de nós

  // Função para remover o nó ao clicar em "Excluir"
  const handleDelete = () => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <BaseNode>
          <NodeHeader className="-mx-3 -mt-2 border-b">
            <NodeHeaderIcon>
              <Factory />
            </NodeHeaderIcon>
            <NodeHeaderTitle>{data.label}</NodeHeaderTitle>
          </NodeHeader>
          <div className="mt-2 flex flex-row gap-1 justify-center items-center">
            <div className="text-red-500">{data?.value}</div>
            <div>{convertUnityString(data.unity)}</div>
          </div>
          <Handle
            type="source"
            position={Position.Right}
            id={`${id}-source`}
            isConnectable={isConnectable}
          />
          <Handle
            type="target"
            position={Position.Left}
            id={`${id}-target`}
            isConnectable={isConnectable}
          />
        </BaseNode>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={() => alert(`Editar nó ${id}`)}>
          ✏️ Editar
        </ContextMenuItem>
        <ContextMenuItem onClick={handleDelete} className="text-red-500">
          ❌ Excluir
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default ProcessNode;
