"use client";

import Flow from "@/components/WaterBalance";
import { ReactFlowProvider } from "@xyflow/react";
import React from "react";

export default function BalancoHidricoPage() {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
}
