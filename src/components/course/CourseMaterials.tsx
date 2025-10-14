"use client";

import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { CourseTopicsProps } from "@/interfaces";


export function CourseMaterials({ topics }: CourseTopicsProps) {
  return (
    <section className="w-full">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        Course Materials
        
      </h2>

      <Card className="border-none shadow-none bg-gray-50 p-6 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2].map((_, colIndex) => (
            <div key={colIndex} className="space-y-4">
              {topics.map(({ icon: Icon, label, value }, i) => (
                <div key={i}>
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                    <span className="text-gray-800 dark:text-gray-200 text-sm">
                      <strong className="font-medium">{label}</strong>{" "}
                      <span className="ml-1 text-gray-600 dark:text-gray-400">
                        {value}
                      </span>
                    </span>
                  </div>
                  <hr className="mt-2 border-gray-200 dark:border-gray-700" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}
