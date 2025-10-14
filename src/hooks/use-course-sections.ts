"use client"

import { CourseSection } from "@/interfaces"
import { useState } from "react"

export function useCourseSections(initialSections: CourseSection[]) {
  const [expandedSections, setExpandedSections] = useState<string[]>(["1"])
  const [activeLesson, setActiveLesson] = useState<string>("1-1")

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId],
    )
  }

  const selectLesson = (lessonId: string, isLocked: boolean) => {
    if (!isLocked) {
      setActiveLesson(lessonId)
    }
  }

  const getTotalLessons = () => {
    return initialSections.reduce((total, section) => total + section.lessons.length, 0)
  }

  const getCompletedLessons = () => {
    return initialSections.reduce(
      (total, section) => total + section.lessons.filter((lesson) => lesson.completed).length,
      0,
    )
  }

  const getProgress = () => {
    const total = getTotalLessons()
    const completed = getCompletedLessons()
    return {
      completedLessons: completed,
      totalLessons: total,
      percentage: Math.round((completed / total) * 100),
    }
  }

  return {
    expandedSections,
    activeLesson,
    toggleSection,
    selectLesson,
    getProgress,
  }
}
