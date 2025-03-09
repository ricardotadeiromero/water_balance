"use client";
import { memo } from "react";
import { NodeProps, Handle, Position } from "@xyflow/react";
import { BaseNode } from "@/components/base-node";
import {
  NodeHeader,
  NodeHeaderTitle,
  NodeHeaderIcon,
} from "@/components/node-header";
import { ChartNoAxesCombinedIcon } from "lucide-react";
import { convertUnityString } from "@/utils/convertUnityString";

const OutputNode = ({ id, data, selected, isConnectable }) => {
  return (
    <BaseNode selected={selected} className="px-3 py-2">
      <NodeHeader className="-mx-3 -mt-2 border-b">
        <NodeHeaderIcon>
          <ChartNoAxesCombinedIcon />
        </NodeHeaderIcon>
        <NodeHeaderTitle>{data.label}</NodeHeaderTitle>
      </NodeHeader>
      <div className="mt-2 flex flex-row gap-1 justify-center items-center">
        <div className="text-blue-500">{data.total}</div>
        <div>{convertUnityString(data.unity)}</div>
      </div>
      {/* Se for necessário oferecer pontos de conexão, inclua os handles */}
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
  );
};

export default OutputNode;
