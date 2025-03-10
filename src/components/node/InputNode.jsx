"use client";
import { useReactFlow, Handle, Position } from "@xyflow/react";
import { BaseNode } from "@/components/base-node";
import {
  NodeHeader,
  NodeHeaderTitle,
  NodeHeaderIcon,
} from "@/components/node-header";
import { Droplet } from "lucide-react";
import { convertUnityString } from "@/utils/convertUnityString";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"; // Import do shadcn/ui

const InputNode = ({ id, data, isConnectable }) => {
  const { setNodes } = useReactFlow(); // Obtém o setter de nós

  // Função para excluir o nó
  const handleDelete = () => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
  };

  // Função para editar o nó (exemplo de alerta, pode ser substituída com uma lógica de edição real)
  const handleEdit = () => {
    alert(`Editar nó ${id}`);
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div>
          <NodeHeader className="-mx-3 -mt-2 border-b">
            <NodeHeaderIcon>
              <Droplet />
            </NodeHeaderIcon>
            <NodeHeaderTitle>{data.label}</NodeHeaderTitle>
          </NodeHeader>
          <div className="mt-2 flex flex-row gap-1 justify-center items-center">
            <div className="text-green-500">{data.value}</div>
            <div>{convertUnityString(data.unity)}</div>
          </div>
          <Handle
            type="source"
            position={Position.Right}
            id={`${id}-source`}
            isConnectable={isConnectable}
          />
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={handleEdit}>✏️ Editar</ContextMenuItem>
        <ContextMenuItem onClick={handleDelete} className="text-red-500">
          ❌ Excluir
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default InputNode;
