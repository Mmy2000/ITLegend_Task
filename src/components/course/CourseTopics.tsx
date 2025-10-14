"use client";

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



export function CourseTopics({
  sections,
  expandedSections,
  activeLesson,
  onToggleSection,
  onSelectLesson,
}: CourseTopicssProps) {
  return (
    <Card
      className={cn(
        "border overflow-hidden transition-all duration-300 animate-fade-in-left"
      )}
    >
      <div className={cn("p-4 border-b transition-colors duration-300")}>
        <h2
          className={cn("text-lg font-semibold transition-colors duration-300")}
        >
          Topics for This Course
        </h2>
      </div>
      <ScrollArea className="h-[600px]">
        <div className="p-2">
          {sections.map((section, sectionIndex) => (
            <div
              key={section.id}
              className="mb-2 animate-fade-in"
              style={{ animationDelay: `${sectionIndex * 50}ms` }}
            >
              <button
                onClick={() => onToggleSection(section.id)}
                className={cn(
                  "w-full flex items-center justify-between p-3 rounded-lg transition-all duration-300 hover:scale-[1.02]"
                )}
              >
                <span
                  className={cn(
                    "font-medium text-sm transition-colors duration-300"
                  )}
                >
                  {section.title}
                </span>
                {expandedSections.includes(section.id) ? (
                  <ChevronUp
                    className={cn("h-4 w-4 transition-all duration-300")}
                  />
                ) : (
                  <ChevronDown
                    className={cn("h-4 w-4 transition-all duration-300")}
                  />
                )}
              </button>
              {expandedSections.includes(section.id) && (
                <div className="mt-1 space-y-1 animate-fade-in-down">
                  {section.lessons.map((lesson, lessonIndex) => (
                    <button
                      key={lesson.id}
                      onClick={() => onSelectLesson(lesson.id, lesson.locked)}
                      disabled={lesson.locked}
                      className={cn(
                        "w-full flex items-center gap-3 p-3 rounded-lg text-right transition-all duration-300 hover:scale-[1.02]",
                        activeLesson === lesson.id
                          ? "bg-[#6abd8a]/10 border border-[#6abd8a] shadow-md"
                          : 
                        lesson.locked && "opacity-50 cursor-not-allowed"
                      )}
                      style={{ animationDelay: `${lessonIndex * 30}ms` }}
                    >
                      {lesson.locked ? (
                        <Lock
                          className={cn(
                            "h-4 w-4 flex-shrink-0 transition-transform duration-300 hover:scale-110"
                          )}
                        />
                      ) : lesson.completed ? (
                        <CheckCircle2 className="h-4 w-4 text-[#6abd8a] flex-shrink-0 transition-transform duration-300 hover:scale-110" />
                      ) : (
                        <Circle
                          className={cn(
                            "h-4 w-4 flex-shrink-0 transition-transform duration-300 hover:scale-110"
                          )}
                        />
                      )}
                      <div className="flex-1 text-right">
                        <div
                          className={cn(
                            "text-sm font-medium transition-colors duration-300"
                          )}
                        >
                          {lesson.title}
                        </div>
                        <div
                          className={cn(
                            "text-xs transition-colors duration-300"
                          )}
                        >
                          {lesson.duration}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}
