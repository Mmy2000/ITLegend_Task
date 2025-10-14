"use client"

import { useState } from "react"
import { Comment} from "@/interfaces";


export function useComments(initialComments: Comment[]) {
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [newComment, setNewComment] = useState<string>("")

  const addComment = (author: string, avatar: string) => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        author,
        avatar,
        content: newComment,
        timestamp: "Just now",
      }
      setComments((prev) => [comment, ...prev])
      setNewComment("")
    }
  }

  return {
    comments,
    newComment,
    setNewComment,
    addComment,
  }
}
