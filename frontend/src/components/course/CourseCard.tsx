'use client';

import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";

export interface ICourse {
  id: string;
  title: string;
  description: string;
  subject: string;
  isFavorite: boolean;
}

export function CourseCard({ course }: { course: ICourse }) {
  const [isFavorite, setIsFavorite] = useState(course.isFavorite);

  return (
    <Card className="flex flex-col justify-between h-full">
      <CardHeader>
        <CardTitle className="text-lg">{course.title}</CardTitle>
        <p className="text-sm text-muted-foreground">{course.subject}</p>
      </CardHeader>

      <CardContent className="flex justify-between items-center">
        <span>Избранное</span>
        <Switch
          checked={isFavorite}
          onCheckedChange={(checked) => setIsFavorite(checked)}
        />
      </CardContent>

      <CardFooter>
        <Link href={`/courses/${course.id}`} className="w-full">
          <Button className="w-full">Перейти</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
