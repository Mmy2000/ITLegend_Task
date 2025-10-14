"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { CourseHeaderProps } from "@/interfaces";
import { ModeToggle } from "../ModeToggle";


export function CourseHeader({
  courseTitle,
  breadcrumb,
}: CourseHeaderProps) {
  return (
    <header
      className={cn(
        "border-b px-4 py-3 transition-colors duration-300"
      )}
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1
            className={cn(
              "text-lg font-semibold transition-colors duration-300"            )}
          >
            {courseTitle}
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div
            className={cn(
              "text-sm transition-colors duration-300"            )}
          >
            {breadcrumb}
          </div>
          <ModeToggle/>
        </div>
      </div>
    </header>
  );
}
