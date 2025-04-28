// components/dashboard/ScorePercentageChart.tsx
"use client"; // This is a client component

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QuizResult } from '@/lib/dashboard/data';


interface ScorePercentageChartProps {
  results: QuizResult[];
}

export function ScorePercentageChart({ results }: ScorePercentageChartProps) {
  if (!results || results.length === 0) {
    return <p>No data available to display chart.</p>;
  }

  // Prepare data for the chart
  // Sort by completion date to show progress over time (optional, but good for line charts)
  // For a bar chart per quiz, sort might not be necessary, but consistent order helps.
  const sortedResults = [...results].sort((a, b) => new Date(a.completedAt).getTime() - new Date(b.completedAt).getTime());

  const chartData = sortedResults.map((result, index) => ({
    // Using index + 1 for a simple label if titles are long or repetitive
    name: `Quiz ${index + 1}`, // Or result.quiz.title, but could be long
    percentage: result.percentage,
    date: new Date(result.completedAt).toLocaleDateString(), // Use date for tooltip
    quizTitle: result.quiz.title // Use title for tooltip
  }));


  return (
    <Card className="col-span-4"> {/* Adjust col-span based on your grid layout */}
      <CardHeader>
        <CardTitle>Quiz Performance</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px] md:h-[350px] lg:h-[400px]"> {/* Give the chart container a height */}
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" /> {/* Use 'name' for axis labels */}
            <YAxis domain={[0, 100]} label={{ value: 'Percentage', angle: -90, position: 'insideLeft' }} />
            <Tooltip
               formatter={(value: number, name: string, props: any) => [`${value}%`, props.payload.quizTitle]} // Show percentage and quiz title
               labelFormatter={(label: string, props: any) => { // Format label
                 // Find the corresponding data point by label (name property)
                 const dataPoint = chartData.find(item => item.name === label);
                 return dataPoint ? `${dataPoint.quizTitle} - ${dataPoint.date}` : label;
               }}
            />
            <Legend />
            <Bar dataKey="percentage" fill="#393939" name="Score (%)" /> {/* Bar representing percentage */}
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}