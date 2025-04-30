import { useQuery } from "@tanstack/react-query"
import { fetchSearchPosts } from "@/entities/post/api/postApi"
import type { IPostResponse } from "@/entities/post/model/types"

export const useSearchPosts = (query: string) => {
  return useQuery<IPostResponse>({
    queryKey: ["searchPosts", query],
    queryFn: () => fetchSearchPosts(query),
    enabled: !!query,
    staleTime: 1000 * 30,
  })
}
