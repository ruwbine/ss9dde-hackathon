'use client';

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IModule } from "@/types/module";
import { ModuleList } from "@/components/module/ModuleList";
import { CreateModuleDialog } from "@/components/module/CreateModuleDialog";
import { QuizGeneratorDialog } from "@/components/quiz/QuizGeneratorDialog";

export default function CourseDetailPage() {
  const { id } = useParams();
  const [modules, setModules] = useState<IModule[]>([]);

  const loadModules = async () => {
    const res = await fetch(`http://localhost:3000/courses/${id}/modules`);
    const data = await res.json();
    setModules(data);
  };

  const handleDelete = async (moduleId: string) => {
    await fetch(`http://localhost:3000/modules/${moduleId}`, { method: "DELETE" });
    loadModules();
  };

  useEffect(() => {
    loadModules();
  }, [id]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Модули курса</h1>
          <div className="flex justify-end mt-8">
            <QuizGeneratorDialog />
          </div>

        <CreateModuleDialog courseId={id as string} onCreated={loadModules} />
      </div>
      <ModuleList modules={modules} onDelete={handleDelete} />
    </div>
  );
}
