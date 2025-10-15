import { ComponentType } from "react";

export interface CourseHeaderProps {
  courseTitle: string
  breadcrumb: string
}

export interface VideoPlayerProps {
  videoThumbnail: string;
  
}

export interface VideoPlayerState {
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number
  isFullscreen: boolean
}

export interface Topic {
  icon: ComponentType<any>;
  label: string;
  value: string;
}

export interface CourseTopicsProps {
  topics: Topic[];
}

export interface CommentsSectionProps {
  comments: Comment[];
  newComment: string;
  onCommentChange: (value: string) => void;
  onSubmitComment: () => void;
}
export interface Comment {
  id: string
  author: string
  avatar: string
  content: string
  timestamp: string
}

export interface Lesson {
  id: string
  title: string
  duration: string
  completed: boolean
  locked: boolean,
  fileIcon:ComponentType<any>,
  isExam:boolean,
  pdfUrl:string
} 

export interface CourseSection {
  id: string
  title: string
  lessons: Lesson[]
}

export interface Progress {
  completedLessons:number,
  percentage:number,
  totalLessons:number
}

export interface CourseTopicssProps {
  sections: CourseSection[];
  expandedSections: string[];
  activeLesson: string;
  onToggleSection: (sectionId: string) => void;
  onSelectLesson: (lessonId: string, isLocked: boolean) => void;
  progress:Progress
}