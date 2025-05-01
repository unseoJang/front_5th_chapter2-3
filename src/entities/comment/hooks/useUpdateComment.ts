import { useQueryClient, useMutation } from "@tanstack/react-query"
import { IComment } from "../model/types"
import { updateComment } from "../api/commentApi"

export const useUpdateComment = (options?: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, body }: { id: number; body: string; postId: number }) => updateComment(id, body),
    onSuccess: (updatedComment: IComment) => {
      queryClient.setQueryData<IComment[]>(
        ["comments", updatedComment.postId],
        (old) => old?.map((c) => (c.id === updatedComment.id ? updatedComment : c)) || [],
      )
      options?.onSuccess?.()
    },
    onError: (err) => {
      console.error("❌ 댓글 수정 실패", err)
    },
  })
}
