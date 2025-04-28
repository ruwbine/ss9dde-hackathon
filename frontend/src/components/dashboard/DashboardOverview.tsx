// components/dashboard/DashboardOverview.tsx
"use client"; // This is a client component

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QuizResult } from "@/lib/dashboard/data";


interface DashboardOverviewProps {
  data: QuizResult[];
}

export function DashboardOverview({ data }: DashboardOverviewProps) {
  const totalQuizzesCompleted = data.length;

  // Calculate average percentage, handle division by zero
  const totalPercentageSum = data.reduce((sum, result) => sum + result.percentage, 0);
  const averagePercentage = totalQuizzesCompleted > 0 ? (totalPercentageSum / totalQuizzesCompleted).toFixed(1) : 'N/A';

  // You could calculate other stats like average score if needed
  // const totalScore = data.reduce((sum, result) => sum + result.score, 0);
  // const totalPossibleScore = data.reduce((sum, result) => sum + result.totalQuestions, 0);
  // const overallAverageScore = totalPossibleScore > 0 ? ((totalScore / totalPossibleScore) * 100).toFixed(1) : 'N/A';


  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Card 1: Total Quizzes Completed */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Quizzes Completed
          </CardTitle>
          {/* Optional: Add an icon */}
          {/* <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7l3 3m0 0l3-3m-3 3V10"></path></svg> */}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalQuizzesCompleted}</div>
          {/* <p className="text-xs text-muted-foreground">+20.1% from last month</p> */}
        </CardContent>
      </Card>

      {/* Card 2: Average Score Percentage */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Average Score Percentage
          </CardTitle>
           {/* Optional: Add an icon */}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{averagePercentage}%</div>
          {/* <p className="text-xs text-muted-foreground">+10.5% from last month</p> */}
        </CardContent>
      </Card>

      {/* Add more overview cards as needed */}
      {/* Example: Latest Completion Date */}
       <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Latest Completion
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {data.length > 0 ? new Date(data[0].completedAt).toLocaleDateString() : 'N/A'}
          </div>
        </CardContent>
      </Card>

    </div>
  );
}