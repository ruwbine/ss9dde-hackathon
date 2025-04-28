// components/dashboard/QuizCompletionTable.tsx
"use client"; // This is a client component

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QuizResult } from "@/lib/dashboard/data";

interface QuizCompletionTableProps {
  results: QuizResult[];
}

export function QuizCompletionTable({ results }: QuizCompletionTableProps) {
  if (!results || results.length === 0) {
    return <p>No quiz completion data available.</p>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Completed Quizzes</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>A list of your recent quiz completions.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Quiz Title</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Percentage</TableHead>
              <TableHead className="text-right">Completed At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((result) => (
              <TableRow key={result.id}>
                <TableCell className="font-medium">{result.quiz.title}</TableCell>
                <TableCell>{result.score}/{result.totalQuestions}</TableCell>
                <TableCell>{result.percentage}%</TableCell>
                <TableCell className="text-right">
                  {new Date(result.completedAt).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}