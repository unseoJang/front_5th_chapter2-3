import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { IComment } from "./types"

interface CommentState {
  comments: IComment[]
  selectedComment: IComment | null
  loading: boolean
  newComment: {
    content: string
    postId: number
    userId: number
  }

  setComments: (comments: IComment[]) => void
  setLoading: (loading: boolean) => void
  setNewComment: (comment: { body: string; postId: number; userId: number }) => void
  setSelectedComment: (comment: IComment | null) => void
}

export const useCommentStore = create(
  devtools<CommentState>(
    (set) => ({
      comments: [],
      selectedComment: null,
      loading: false,
      newComment: {
        content: "",
        postId: 0,
        userId: 0,
      },

      setComments: (comments: IComment[]) => set({ comments }),
      setSelectedComment: (comment: IComment | null) => set({ selectedComment: comment }),
      setLoading: (loading: boolean) => set({ loading }),
      setNewComment: (comment: { body: string; postId: number; userId: number }) => set({ newComment: comment }),
    }),
    { name: "CommentStore" },
  ),
)
