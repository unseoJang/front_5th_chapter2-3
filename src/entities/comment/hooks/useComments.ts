import { useQuery } from "@tanstack/react-query"
import { fetchComments } from "@/entities/comment/api/commentApi"
import { IComment } from "../model/types"

export const useComments = (postId: number) => {
  return useQuery<IComment[]>({
    queryKey: ["comments", postId],
    queryFn: () => fetchComments(postId),
    enabled: !!postId,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 30, // 30초 동안 캐시 유지
  })
}
