import { ModuleCard } from "./ModuleCard";
import { IModule } from "@/types/module";

export function ModuleList({
  modules,
  onDelete,
}: {
  modules: IModule[];
  onDelete?: (id: string) => void;
}) {
  if (modules.length === 0)
    return <p className="text-muted-foreground">Пока нет модулей</p>;

  return (
    <div className="grid gap-4">
      {modules.map((mod) => (
        <ModuleCard key={mod.id} module={mod} onDelete={onDelete} />
      ))}
    </div>
  );
}
