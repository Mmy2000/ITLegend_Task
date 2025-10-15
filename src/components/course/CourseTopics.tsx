"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Circle,
  Lock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CourseTopicssProps } from "@/interfaces";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import ExamViewer from "../ExamViewer";


export function CourseTopics({
  sections,
  expandedSections,
  activeLesson,
  onToggleSection,
  onSelectLesson,
}: CourseTopicssProps) {
  const [selectedLesson, setSelectedLesson] = useState<any>(null);

  const handleLessonSelect = (lesson: any) => {
    if (lesson.locked) return;
    setSelectedLesson(lesson);
    onSelectLesson(lesson.id, lesson.locked);
  };

  const handleClose = () => setSelectedLesson(null);  

  return (
    <>
      <Card className="border overflow-hidden transition-all duration-300 animate-fade-in-left">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Topics for This Course</h2>
        </div>

        <ScrollArea className="h-[600px]">
          <div className="p-2">
            {sections.map((section, sectionIndex) => (
              <div
                key={section.id}
                className="mb-2 animate-fade-in"
                style={{ animationDelay: `${sectionIndex * 50}ms` }}
              >
                {/* Section Header */}
                <button
                  onClick={() => onToggleSection(section.id)}
                  className="w-full flex items-center justify-between p-3 rounded-lg transition-all duration-300 hover:scale-[1.02]"
                >
                  <span className="font-bold text-sm">{section.title}</span>
                  {expandedSections.includes(section.id) ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>

                {/* Lessons */}
                {expandedSections.includes(section.id) && (
                  <div className="mt-1 space-y-1 animate-fade-in-down">
                    {section.lessons.map((lesson, lessonIndex) => (
                      <button
                        key={lesson.id}
                        onClick={() => handleLessonSelect(lesson)}
                        disabled={lesson.locked}
                        className={cn(
                          "w-full flex items-center justify-between gap-3 p-3 rounded-lg text-right transition-all duration-300 hover:scale-[1.02]",
                          activeLesson === lesson.id
                            ? "bg-[#6abd8a]/10 border border-[#6abd8a] shadow-md"
                            : lesson.locked && "opacity-50 cursor-not-allowed"
                        )}
                        style={{ animationDelay: `${lessonIndex * 30}ms` }}
                      >
                        <div className="flex items-start gap-1">
                          <lesson.fileIcon className="h-4 w-4" />
                          <div
                            className={
                              lesson.isExam
                                ? ""
                                : "flex flex-col items-start justify-start"
                            }
                          >
                            <div className="text-sm font-semibold">
                              {lesson.title}
                            </div>

                            {lesson.isExam ? (
                              <div className="flex items-center gap-3 mt-1">
                                <span className="text-[10px] font-semibold text-[#1da1f2]">
                                  0 QUESTION
                                </span>
                                <span className="text-[10px] font-semibold text-[#f26b8a]">
                                  10 MINUTES
                                </span>
                              </div>
                            ) : (
                              <div className="text-xs text-gray-500">
                                {lesson.duration}
                              </div>
                            )}
                          </div>
                        </div>

                        {lesson.locked ? (
                          <Lock className="h-4 w-4" />
                        ) : lesson.completed ? (
                          <CheckCircle2 className="h-4 w-4 text-[#6abd8a]" />
                        ) : (
                          <Circle className="h-4 w-4" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </Card>

      {/* 🔹 Shadcn Dialog for Exam or PDF */}
      <Dialog open={!!selectedLesson} onOpenChange={handleClose}>
        <DialogContent
          className="max-w-full w-full h-screen p-0 bg-background overflow-hidden"
          onInteractOutside={(e) => e.preventDefault()} // Prevent closing by clicking outside
        >
          <DialogHeader className="flex justify-between items-center border-b px-6 py-4">
            <DialogTitle>{selectedLesson?.title}</DialogTitle>
            <DialogDescription>
              {selectedLesson?.isExam ? "Exam Mode" : "Lesson Viewer"}
            </DialogDescription>
            <DialogClose asChild></DialogClose>
          </DialogHeader>

          {/* Modal Content */}
          <div className="w-full h-[calc(100vh-80px)]">
            {selectedLesson?.isExam ? (
              <ExamViewer
                duration={600} // 10 minutes
                onExit={handleClose}
                questions={[
                  {
                    id: 1,
                    question:
                      "Among the following states of India, which one has the oldest rock formations in the country?",
                    options: ["Asam", "Bahar", "Kamaltake", "Utter Pardesh"],
                  },
                  {
                    id: 2,
                    question: "Which planet is known as the Red Planet?",
                    options: ["Earth", "Mars", "Venus", "Jupiter"],
                  },
                ]}
              />
            ) : (
              <iframe
                src="https://drive.google.com/file/d/18gX9MDXjXRqcejJoPesyswHBN4iA426j/preview"
                allow="autoplay"
                className="w-full h-full"
              ></iframe>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
