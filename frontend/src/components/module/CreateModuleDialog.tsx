'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function CreateModuleDialog({
  courseId,
  onCreated,
}: {
  courseId: string;
  onCreated?: () => void;
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [open, setOpen] = useState(false);

  const handleCreate = async () => {
    const res = await fetch(`http://localhost:3000/courses/${courseId}/modules`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, courseId }),
    });

    if (res.ok) {
      onCreated?.();
      setOpen(false);
      setTitle("");
      setContent("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Добавить модуль</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Новый модуль</DialogTitle>
        </DialogHeader>
        <Input
          placeholder="Название модуля"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          placeholder="Контент модуля"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button onClick={handleCreate}>Сохранить</Button>
      </DialogContent>
    </Dialog>
  );
}
