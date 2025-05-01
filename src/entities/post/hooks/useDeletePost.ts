import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deletePost } from "../api/postApi"
import { IPosts } from "../model/types"
import { usePostStore } from "../model/postStore"

export const useDeletePost = () => {
  const queryClient = useQueryClient()
  const { setPosts, posts } = usePostStore() // ✅ Zustand 상태 접근

  return useMutation({
    mutationFn: (id: number) => deletePost(id),

    onSuccess: (_, id) => {
      // React Query 캐시 갱신
      queryClient.setQueryData<IPosts[]>(["posts"], (old) => old?.filter((post) => post.id !== id) || [])
      // Zustand 상태 갱신
      setPosts(posts.filter((post) => post.id !== id))
    },
    onError: (err) => {
      console.error("❌ 게시물 삭제 실패", err)
    },
  })
}
