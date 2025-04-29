import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { IComment } from "./types"

interface CommentState {
  comments: { [postId: number]: IComment[] } // ✅ 배열이 아니라, postId별 딕셔너리로 바꿔야 한다
  selectedComment: IComment | null
  loading: boolean
  newComment: {
    content: string
    postId: number
    userId: number
  }

  setComments: (updater: ((comments: { [postId: number]: IComment[] }) => { [postId: number]: IComment[] }) | { [postId: number]: IComment[] }) => void
  setLoading: (loading: boolean) => void
  setNewComment: (comment: { body: string; postId: number; userId: number }) => void
  setSelectedComment: (comment: IComment | null) => void
}

export const useCommentStore = create(
  devtools<CommentState>(
    (set) => ({
      comments: {},
      selectedComment: null,
      loading: false,
      newComment: {
        content: "",
        postId: 0,
        userId: 0,
      },

      setComments: (updater) =>
        set((state) => ({
          comments: typeof updater === "function" ? updater(state.comments) : updater,
        })),
      setSelectedComment: (comment: IComment | null) => set({ selectedComment: comment }),
      setLoading: (loading: boolean) => set({ loading }),
      setNewComment: (comment) => set({ newComment: { content: comment.body, postId: comment.postId, userId: comment.userId } }),
    }),
    { name: "CommentStore" },
  ),
)
