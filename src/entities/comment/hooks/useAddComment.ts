import { useMutation, useQueryClient } from "@tanstack/react-query"
import { IComment } from "../model/types"
import { addComment } from "../api/commentApi"

export const useAddComment = (options?: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (comment: IComment) => addComment(comment), // postId는 comment 내부에 있음
    // 실제 api 사용시 호출 로직
    // onSuccess: (data) => {
    //   // ✅ Zustand 상태 수동 갱신
    //   setComments((prev) => ({
    //     ...prev,
    //     [data.postId]: [...(prev[data.postId] || []), data],
    //   }))

    //   // ✅ React Query 캐시 무효화도 유지
    //   queryClient.invalidateQueries({ queryKey: ["comments", data.postId] })

    //   // ✅ 상위 콜백 호출
    //   options?.onSuccess?.()
    // },
    // 캐싱된 부분을 수동으로 코멘트 로직 수정
    onSuccess: (data) => {
      queryClient.setQueryData<IComment[]>(["comments", data.postId], (old = []) => [...old, data])
      options?.onSuccess?.()
    },
    onError: (error) => {
      console.error("❌ 댓글 추가 실패", error)
    },
  })
}
