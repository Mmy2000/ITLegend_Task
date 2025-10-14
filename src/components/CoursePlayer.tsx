"use client";

import React from "react";
import { CourseHeader } from "./course/CourseHeader";
import { VideoPlayer } from "./course/VideoPlayer";
import { CourseMaterials } from "./course/CourseMaterials";
import { COURSE_COMMENTS, COURSE_SECTIONS, courseDetails } from "@/constant";
import { CourseTopics } from "./course/CourseTopics";
import { CommentsSection } from "./course/CommentsSection";
import { useComments } from "@/hooks/use-comments";
import { useCourseSections } from "@/hooks/use-course-sections";

const CoursePlayer = () => {
    const {
      expandedSections,
      activeLesson,
      toggleSection,
      selectLesson,
      getProgress,
    } = useCourseSections(COURSE_SECTIONS);
    const progress = getProgress();
  const { comments, newComment, setNewComment, addComment } =
    useComments(COURSE_COMMENTS);

  const handleSubmitComment = () => {
    addComment("Current User", "/placeholder.svg");
  };
  return (
    <>
      <div className="min-h-screen transition-colors duration-300">
        <CourseHeader
          courseTitle="Starting SEO at your Home"
          breadcrumb="Home / Courses / Course Details"
        />
        <div className="max-w-[1400px] mx-auto p-4 lg:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <VideoPlayer videoThumbnail="/instructor-teaching.png" />
              <CourseMaterials topics={courseDetails} />
              <CommentsSection
                comments={comments}
                newComment={newComment}
                onCommentChange={setNewComment}
                onSubmitComment={handleSubmitComment}
              />
            </div>
            <div className="space-y-6">
              <CourseTopics
                sections={COURSE_SECTIONS}
                expandedSections={expandedSections}
                activeLesson={activeLesson}
                onToggleSection={toggleSection}
                onSelectLesson={selectLesson}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoursePlayer;
