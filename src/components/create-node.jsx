"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

function CreateInputNode({
  label,
  value,
  unity,
  setLabel,
  setValue,
  setUnity,
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-2">
        <Input
          placeholder="Input name"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
        <Input
          placeholder="Input value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <Select onValueChange={setUnity} value={unity}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a unit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">cm³</SelectItem>
          <SelectItem value="2">m³</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

function CreateProcessNode({ label, coef, setLabel, setCoef }) {
  return (
    <div className="flex flex-row gap-2">
      <Input
        placeholder="Process name"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
      />
      <Input
        placeholder="Coefficient"
        value={coef}
        onChange={(e) => setCoef(e.target.value)}
      />
    </div>
  );
}

export default function CreateNode({ setNodes }) {
  const [type, setType] = useState("");
  const [label, setLabel] = useState("");
  const [unity, setUnity] = useState();
  const [value, setValue] = useState(0);
  const [coef, setCoef] = useState(0);

  function handleCreateNode() {
    const newNode = {
      id: crypto.randomUUID(),
      type,
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { label, value, unity, coef },
    };
    setNodes((prevNodes) => [...prevNodes, newNode]);
    setLabel("");
    setValue(0);
    setCoef(0);
    setUnity(1);
  }

  return (
    <Dialog>
      <DialogTrigger className="px-4 py-2 bg-blue-500 text-white rounded-md rounde-full">
        +
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a Node</DialogTitle>
          <DialogDescription>
            <Select onValueChange={setType} value={type}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="input">Input</SelectItem>
                <SelectItem value="process">Process</SelectItem>
              </SelectContent>
            </Select>
          </DialogDescription>
          {type === "input" ? (
            <CreateInputNode
              label={label}
              value={value}
              unity={unity}
              setLabel={setLabel}
              setValue={setValue}
              setUnity={setUnity}
            />
          ) : type === "process" ? (
            <CreateProcessNode
              label={label}
              coef={coef}
              setLabel={setLabel}
              setCoef={setCoef}
            />
          ) : null}
        </DialogHeader>
        <DialogClose asChild>
          <Button type="button" variant="secondary" onClick={handleCreateNode}>
            Add Node
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
