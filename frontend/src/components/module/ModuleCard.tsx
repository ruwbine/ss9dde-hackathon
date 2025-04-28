import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IModule } from "@/types/module";

interface Props {
  module: IModule;
  onDelete?: (id: string) => void;
}

export function ModuleCard({ module, onDelete }: Props) {
  return (
    <Card>
      <CardHeader className="flex justify-between">
        <CardTitle>{module.title}</CardTitle>
        {onDelete && (
          <Button variant="destructive" size="sm" onClick={() => onDelete(module.id)}>
            Удалить
          </Button>
        )}
      </CardHeader>
      <CardContent className="whitespace-pre-wrap">{module.content}</CardContent>
    </Card>
  );
}
