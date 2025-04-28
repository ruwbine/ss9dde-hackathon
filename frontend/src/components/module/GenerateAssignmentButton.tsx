import { Button } from "@/components/ui/button";

export function GenerateAssignmentButton({ moduleId }: { moduleId: string }) {
  const handleGenerate = async () => {
    const res = await fetch(`http://localhost:3000/modules/${moduleId}/generate-assignment`, {
      method: "POST",
    });

    if (res.ok) {
      alert("Задание сгенерировано");
    }
  };

  return (
    <Button variant="outline" onClick={handleGenerate}>
      Сгенерировать задание
    </Button>
  );
}
