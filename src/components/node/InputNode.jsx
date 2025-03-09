"use client";
import { memo } from "react";
import { NodeProps, Handle, Position } from "@xyflow/react";
import { BaseNode } from "@/components/base-node";
import {
  NodeHeader,
  NodeHeaderTitle,
  NodeHeaderIcon,
} from "@/components/node-header";
import { Droplet } from "lucide-react";
import { convertUnityString } from "@/utils/convertUnityString";

const InputNode = ({ id, data, selected, isConnectable }) => {
  return (
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
      {/* Se for necessário oferecer pontos de conexão, inclua os handles */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-source`}
        isConnectable={isConnectable}
      />
      {/* <Handle
        type="target"
        position={Position.Left}
        id={`${id}-target`}
        isConnectable={isConnectable}
      /> */}
    </div>
  );
};

export default InputNode;
