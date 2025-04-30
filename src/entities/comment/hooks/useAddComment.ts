import { useMutation, useQueryClient } from "@tanstack/react-query"
import { IComment } from "../model/types"
import { addComment } from "../api/commentApi"

export const useAddComment = (options?: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (comment: IComment) => addComment(comment), // postId는 comment 내부에 있음
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["comments", data.postId] })
      options?.onSuccess?.()
    },
    onError: (error) => {
      console.error("❌ 댓글 추가 실패", error)
    },
  })
}
