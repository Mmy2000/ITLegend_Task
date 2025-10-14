"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { CommentsSectionProps ,Comment} from "@/interfaces";


export function CommentsSection({
  comments,
  newComment,
  onCommentChange,
  onSubmitComment,
}: CommentsSectionProps) {
  return (
    <Card
      className={cn(
        "p-6 border transition-all duration-300 animate-fade-in-up",
      )}
      style={{ animationDelay: "200ms" }}
    >
      <h2
        className={cn(
          "text-xl font-semibold mb-4 transition-colors duration-300",
        )}
      >
        Comments
      </h2>
      <div className="space-y-4 mb-6">
        {comments.map((comment, index) => (
          <div
            key={comment.id}
            className={cn(
              "flex gap-3 p-3 rounded-lg transition-all duration-300 hover:scale-[1.02] animate-fade-in",
            )}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <Avatar className="h-10 w-10 flex-shrink-0 ring-2 ring-transparent hover:ring-[#6abd8a] transition-all duration-300">
              <AvatarImage
                src={comment.avatar || "/placeholder.svg"}
                alt={comment.author}
              />
              <AvatarFallback>{comment.author[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={cn(
                    "font-medium text-sm transition-colors duration-300",
                  )}
                >
                  {comment.author}
                </span>
                <span
                  className={cn(
                    "text-xs transition-colors duration-300",
                  )}
                >
                  {comment.timestamp}
                </span>
              </div>
              <p
                className={cn(
                  "text-sm leading-relaxed transition-colors duration-300",
                )}
              >
                {comment.content}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="space-y-3">
        <textarea
          value={newComment}
          onChange={(e) => onCommentChange(e.target.value)}
          placeholder="Write a comment..."
          className={cn(
            "w-full min-h-[100px] p-3 border rounded-lg text-sm resize-none transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#6abd8a] focus:scale-[1.01]",

          )}
        />
        <div className="flex justify-end">
          <Button
            onClick={onSubmitComment}
            className="bg-[#6abd8a] hover:bg-[#5aad7a] text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            Leave a Comment
          </Button>
        </div>
      </div>
    </Card>
  );
}
