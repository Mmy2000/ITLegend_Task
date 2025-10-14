"use client";

import { Clock, BookOpen, Users, Globe } from "lucide-react";
import { Comment, CourseSection} from "@/interfaces";


export const courseDetails = [
    { icon: Clock, label: "Duration:", value: "3 weeks" },
    { icon: BookOpen, label: "Lessons:", value: "8" },
    { icon: Users, label: "Enrolled:", value: "65 students" },
    { icon: Globe, label: "Language:", value: "English" },
  ];

export const COURSE_COMMENTS: Comment[] = [
  {
    id: "1",
    author: "Sarah Johnson",
    avatar: "/diverse-woman-portrait.png",
    content: "Great explanation! This really helped me understand the concept better.",
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    author: "Ahmed Hassan",
    avatar: "/man.jpg",
    content: "Could you provide more examples on this topic? I would love to see practical applications.",
    timestamp: "5 hours ago",
  },
]

export const COURSE_SECTIONS: CourseSection[] = [
  {
    id: "1",
    title: "Introduction",
    lessons: [
      { id: "1-1", title: "Welcome to the Course", duration: "5:30", completed: true, locked: false },
      { id: "1-2", title: "Course Overview", duration: "8:45", completed: true, locked: false },
    ],
  },
  {
    id: "2",
    title: "Getting Started",
    lessons: [
      { id: "2-1", title: "Setting Up Your Environment", duration: "12:20", completed: false, locked: false },
      { id: "2-2", title: "First Steps", duration: "10:15", completed: false, locked: false },
    ],
  },
  {
    id: "3",
    title: "Advanced Topics",
    lessons: [
      { id: "3-1", title: "Deep Dive", duration: "15:40", completed: false, locked: true },
      { id: "3-2", title: "Best Practices", duration: "11:30", completed: false, locked: true },
    ],
  },
]