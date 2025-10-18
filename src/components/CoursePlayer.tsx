"use client";

import React, { useState } from "react";
import { CourseHeader } from "./course/CourseHeader";
import { VideoPlayer } from "./course/VideoPlayer";
import { CourseMaterials } from "./course/CourseMaterials";
import { COURSE_COMMENTS, COURSE_SECTIONS, courseDetails } from "@/constant";
import { CourseTopics } from "./course/CourseTopics";
import { CommentsSection } from "./course/CommentsSection";
import { useComments } from "@/hooks/use-comments";
import { useCourseSections } from "@/hooks/use-course-sections";
import ActionIcons from "./course/ActionIcons";

const CoursePlayer = () => {
  const [isWide, setIsWide] = useState(false);

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

  console.log(isWide);
  

  return (
    <div className="min-h-screen transition-colors duration-300">
      <CourseHeader
        courseTitle="Starting SEO at your Home"
        breadcrumb="Home / Courses / Course Details"
      />

      <div className="max-w-[1400px] mx-auto p-4 lg:p-6">
        <div
          className={`grid gap-6 transition-all duration-500 ${
            isWide ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-3"
          }`}
        >
          <div
            className={`${isWide ? "col-span-1" : "lg:col-span-2"} space-y-6`}
          >
            <VideoPlayer
              isWide={isWide}
              setIsWide={setIsWide}
              videoThumbnail="/instructor-teaching.png"
            />
            <ActionIcons />

            {!isWide && (
              <>
                <div id="curriculum-section">
                  <CourseMaterials topics={courseDetails} />
                </div>

                <div id="comments-section">
                  <CommentsSection
                    comments={comments}
                    newComment={newComment}
                    onCommentChange={setNewComment}
                    onSubmitComment={handleSubmitComment}
                  />
                </div>
              </>
            )}
          </div>

          {!isWide && (
            <div className="space-y-6 ">
              <CourseTopics
                sections={COURSE_SECTIONS}
                expandedSections={expandedSections}
                activeLesson={activeLesson}
                onToggleSection={toggleSection}
                onSelectLesson={selectLesson}
                progress={progress}
              />
            </div>
          )}
        </div>

        <div className="mt-8 space-y-6">
          {isWide && (
            <CourseTopics
              sections={COURSE_SECTIONS}
              expandedSections={expandedSections}
              activeLesson={activeLesson}
              onToggleSection={toggleSection}
              onSelectLesson={selectLesson}
              progress={progress}
            />
          )}

          {isWide && (
            <div id="curriculum-section">
              <CourseMaterials topics={courseDetails} />
            </div>
          )}

          {isWide && (
            <div id="comments-section">
              <CommentsSection
                comments={comments}
                newComment={newComment}
                onCommentChange={setNewComment}
                onSubmitComment={handleSubmitComment}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursePlayer;
