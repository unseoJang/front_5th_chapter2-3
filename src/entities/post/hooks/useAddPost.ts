import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addPost } from "../api/postApi"
import { IPosts } from "../model/types"

export const useAddPost = (options?: { onSuccess?: (data: IPosts) => void }) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (post: IPosts) => addPost(post),
    onSuccess: (newPost: IPosts) => {
      // 기존 posts 캐시에 수동으로 추가
      queryClient.setQueryData<IPosts[]>(["posts"], (old: IPosts[] | undefined) =>
        old ? [newPost, ...old] : [newPost],
      )

      // 선택적 후처리
      options?.onSuccess?.(newPost)
    },
    onError: (err) => {
      console.error("❌ 게시물 추가 실패", err)
    },
  })
}
