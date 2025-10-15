"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowLeft, Clock } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
}

interface ExamViewerProps {
  questions: Question[];
  duration: number; // seconds
  onSubmit?: (answers: Record<number, string | null>) => void;
  onExit?: () => void;
}

export default function ExamViewer({
  questions,
  duration,
  onSubmit,
  onExit,
}: ExamViewerProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | null>>({});
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleSelect = (option: string) => {
    const id = questions[currentQuestion].id;
    setAnswers((prev) => ({ ...prev, [id]: option }));
  };

  const handleSubmit = () => {
    onSubmit?.(answers);
    alert("Exam submitted!");
  };

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const sec = (seconds % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-background text-foreground p-4 transition-colors">
      <Card className="w-full max-w-md shadow-lg rounded-2xl p-6 relative bg-card border border-border transition-colors">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCurrentQuestion((prev) => Math.max(0, prev - 1))}
            disabled={currentQuestion === 0}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-2 bg-yellow-400 text-white dark:bg-yellow-500 px-3 py-1 rounded-md">
            <Clock className="h-4 w-4" />
            <span className="font-bold text-sm">{formatTime(timeLeft)}</span>
          </div>
        </div>

        {/* Question indicators */}
        <div className="flex justify-center gap-2 mb-4">
          {questions.map((q, i) => (
            <div
              key={q.id}
              onClick={() => setCurrentQuestion(i)}
              className={cn(
                "w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold cursor-pointer transition-all",
                currentQuestion === i
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              {i + 1}
            </div>
          ))}
        </div>

        {/* Question */}
        <h2 className="text-sm font-medium text-foreground mb-3">
          {questions[currentQuestion].question}
        </h2>

        {/* Options */}
        <div className="flex flex-col gap-3">
          {questions[currentQuestion].options.map((opt) => {
            const selected = answers[questions[currentQuestion].id] === opt;
            return (
              <button
                key={opt}
                onClick={() => handleSelect(opt)}
                className={cn(
                  "flex items-center justify-start gap-2 p-3 rounded-lg border text-sm transition-all",
                  selected
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border hover:border-primary hover:bg-muted"
                )}
              >
                <div
                  className={cn(
                    "w-4 h-4 border rounded-sm",
                    selected
                      ? "bg-primary-foreground border-primary-foreground"
                      : "border-muted-foreground"
                  )}
                />
                {opt}
              </button>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={() => setCurrentQuestion((prev) => Math.max(0, prev - 1))}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>
          {currentQuestion < questions.length - 1 ? (
            <Button
              onClick={() =>
                setCurrentQuestion((prev) =>
                  Math.min(questions.length - 1, prev + 1)
                )
              }
            >
              Next
            </Button>
          ) : (
            <Button variant="default" onClick={handleSubmit}>
              Submit
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
