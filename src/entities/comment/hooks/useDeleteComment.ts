import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteComment } from "../api/commentApi"
import { IComment } from "../model/types"
export const useDeleteComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id }: { id: number; postId: number }) => deleteComment(id),
    onSuccess: (_, variables) => {
      queryClient.setQueryData<IComment[]>(
        ["comments", variables.postId],
        (old) => old?.filter((comment) => comment.id !== variables.id) || [],
      )
    },
    onError: (err) => {
      console.error("❌ 댓글 삭제 실패", err)
    },
  })
}
