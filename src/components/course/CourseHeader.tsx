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
    <header className={cn(" px-4 py-3 transition-colors duration-300")}>
      <div className="max-w-[1400px] mx-auto flex flex-col items-start ">
        <div className="flex items-center justify-between w-full">
          <div className={cn("text-sm transition-colors duration-300")}>
            {breadcrumb}
          </div>
          <ModeToggle />
        </div>
        <div className="flex mt-3  items-center gap-4">
          <h1
            className={cn(
              "text-3xl font-semibold transition-colors duration-300"
            )}
          >
            {courseTitle}
          </h1>
        </div>
      </div>
    </header>
  );
}
