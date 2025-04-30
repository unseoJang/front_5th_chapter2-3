// entities/post/hooks/usePostTags.ts
import { useQuery } from "@tanstack/react-query"
import { fetchTags } from "@/entities/post/api/postApi"
import { ITags } from "../model/types"

export const usePostTags = () => {
  return useQuery<ITags[]>({
    queryKey: ["postTags"],
    queryFn: fetchTags,
    staleTime: 1000 * 60 * 5, // 5분 캐시 유지
  })
}
