import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { IComment } from "./types"

interface CommentState {
  comments: IComment[]
  selectedComment: IComment | null
  loading: boolean

  setComments: (comments: IComment[]) => void
  setSelectedComment: (comment: IComment | null) => void
  setLoading: (loading: boolean) => void
}

export const useCommentStore = create(
  devtools<CommentState>(
    (set) => ({
      comments: [],
      selectedComment: null,
      loading: false,

      setComments: (comments: IComment[]) => set({ comments }),
      setSelectedComment: (comment: IComment | null) => set({ selectedComment: comment }),
      setLoading: (loading: boolean) => set({ loading }),
    }),
    { name: "CommentStore" },
  ),
)
