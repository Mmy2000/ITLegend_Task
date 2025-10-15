"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CourseTopicsProps } from "@/interfaces";

export function CourseMaterials({ topics }: CourseTopicsProps) {
  return (
    <section className="w-full">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-foreground">
        Course Materials
      </h2>

      <Card className="border border-border shadow-sm bg-card p-6 transition-colors">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2].map((_, colIndex) => (
            <div key={colIndex} className="space-y-4">
              {topics.map(({ icon: Icon, label, value }, i) => (
                <div key={i}>
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm text-foreground">
                      <strong className="font-medium">{label}</strong>{" "}
                      <span className="ml-1 text-muted-foreground">
                        {value}
                      </span>
                    </span>
                  </div>
                  <hr className="mt-2 border-border" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}
