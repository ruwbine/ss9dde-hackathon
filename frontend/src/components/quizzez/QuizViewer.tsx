// components/QuizViewer.tsx
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button'; // Adjust path
import { Separator } from '@/components/ui/separator'; // Adjust path
import { toast } from 'sonner';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { AnswerSubmission, submitQuizAnswers } from '@/lib/quizzez/quizzez.api';
import { QuestionResponseDto, QuizResponseDto } from '@/types/quizzez/quizzez.types';
import { QuestionRenderer } from './QuestionRenderer';

interface QuizViewerProps {
    quiz: QuizResponseDto;
    // Correct the type to be an array of questions
    questions: QuestionResponseDto[];
}

// Make QuizViewer a client component function, not async
export function QuizViewer({ quiz, questions }: QuizViewerProps) {
    // State to hold selected answers: { questionId: [selectedOptionIds] }
    const [answers, setAnswers] = useState<Record<string, string[]>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionError, setSubmissionError] = useState<string | null>(null);
    // State to control showing results/explanations
    const [showResults, setShowResults] = useState(quiz.isCompleted); // Show results if already completed

    // Initialize answers state when questions prop changes or component mounts
    useEffect(() => {
        const initialAnswers: Record<string, string[]> = {};
        // Use the questions prop directly for initialization
        questions.forEach((question) => {
            // Initialize with empty array for each question
            initialAnswers[question.id] = [];
        });
        setAnswers(initialAnswers);
        setShowResults(quiz.isCompleted); // Re-evaluate showResults if quiz prop updates
    }, [questions, quiz.isCompleted]); // Dependency array includes questions and quiz.isCompleted

    // Callback function passed to QuestionRenderer
    const handleAnswerChange = (questionId: string, selectedIds: string[]) => {
        // Prevent changing answers if results are being shown
        if (showResults) return;

        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: selectedIds,
        }));
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setSubmissionError(null);

        const payload: { answers: AnswerSubmission[] } = {
            answers: Object.entries(answers).map(
                ([questionId, selectedOptionIds]) => ({
                    questionId,
                    selectedOptionIds,
                })
            ),
        };

        try {
            const result = await submitQuizAnswers(quiz.id, payload);
            console.log('Submission successful:', result);
            setShowResults(true); // Show results and explanations after successful submission
            // Use the sonner toast function directly
            toast.success('Quiz Submitted!', {
                description: 'Your answers have been recorded.',
            });
        } catch (error: any) {
            console.error('Submission failed:', error);
            setSubmissionError(
                error.message || 'An error occurred during submission.'
            );
            // Use the sonner toast function directly
            toast.error('Submission Failed', {
                description: error.message || 'An error occurred.',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Use the questions prop directly for rendering
    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-4">Quiz: {quiz.title}</h1>
            <p className="text-gray-700 mb-6">{quiz.description}</p>

            {/* Render Questions */}
            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                    Questions ({questions.length})
                </h2>
                {questions.map((question) => (
                    <QuestionRenderer
                        key={question.id}
                        question={question}
                        selectedOptionIds={answers[question.id] || []} // Pass current selected state
                        onAnswerChange={handleAnswerChange} // Pass the callback
                        showResult={showResults} // Pass whether to show results
                        // correctOptionIds is not used in QuestionRenderer's rendering logic based on current code
                        // Assumes question.options will have isCorrect populated when showResult is true
                    />
                ))}
            </div>

            {/* Submission Button (only show if not completed and not showing results) */}
            {!quiz.isCompleted && !showResults && (
                <div className="text-center mt-8">
                    <Button onClick={handleSubmit} disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Submit Quiz'}
                    </Button>
                </div>
            )}

            {/* Submission Error Message */}
            {submissionError && (
                <div className="text-red-500 text-center mt-4">
                    {submissionError}
                </div>
            )}

            {/* Render Explanations (only show if completed or after submission) */}
            {/* Ensure quiz.explanations exists before checking its length */}
            {(quiz.isCompleted || showResults) &&
                quiz.explanations &&
                quiz.explanations.length > 0 && (
                    <>
                        <Separator className="my-8" />
                        <div>
                            <h2 className="text-2xl font-semibold mb-4">
                                Explanations ({quiz.explanations.length})
                            </h2>
                            <div className="space-y-6">
                                {quiz.explanations.map((explanation) => (
                                    <Card key={explanation.id}>
                                        <CardHeader>
                                            <CardTitle className="text-lg">
                                                {explanation.term}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p>{explanation.description}</p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </>
                )}
        </div>
    );
}
