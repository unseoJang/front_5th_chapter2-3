import { useMutation, useQueryClient } from "@tanstack/react-query"
import { likeComment } from "../api/commentApi"
import { IComment } from "../model/types"

export const useLikeComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, postId, likes }: { id: number; postId: number; likes: number }) => likeComment(id, likes),

    onSuccess: (_, variables) => {
      const { id, postId } = variables

      queryClient.setQueryData<IComment[]>(
        ["comments", postId],
        (prev) =>
          prev?.map((comment) =>
            comment.id === id
              ? { ...comment, likes: (comment.likes || 0) + 1 } // 바로 1 올림
              : comment,
          ) ?? [],
      )
    },
    // 서버 응답 값(data.likes)을 신뢰할떄를 위해
    // onSuccess: (data, variables) => {
    //   queryClient.setQueryData<IComment[]>(
    //     ["comments", data.postId],
    //     (prev) =>
    //       prev?.map((comment) => (comment.id === variables.id ? { ...comment, likes: data.likes } : comment)) ?? [],
    //   )
    // },
    onError: (err) => {
      console.error("❌ 댓글 좋아요 실패", err)
    },
  })
}
