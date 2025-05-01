import { useMutation, useQueryClient } from "@tanstack/react-query"
import { IPosts } from "../model/types"
import { updatePost } from "../api/postApi"

export const useUpdatePost = (options?: { onSuccess?: (data: IPosts) => void }) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updatePost,
    onSuccess: (updatedPost) => {
      queryClient.setQueryData<IPosts[]>(
        ["posts"],
        (prev) => prev?.map((post) => (post.id === updatedPost.id ? updatedPost : post)) ?? prev,
      )

      options?.onSuccess?.(updatedPost)
    },
    onError: (err) => {
      console.error("❌ 게시물 업데이트 실패", err)
    },
  })
}
