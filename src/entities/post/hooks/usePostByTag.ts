import { useQuery } from "@tanstack/react-query"
import { fetchPostsByTag } from "@/features/postManager/api/postManagerApi"
import { ITestPosts } from "../model/types"

export const usePostByTag = (tag: string) => {
  return useQuery<ITestPosts>({
    queryKey: ["posts", tag],
    queryFn: () => fetchPostsByTag(tag),
    enabled: !!tag && tag !== "all", // 여기 중요!
    staleTime: 1000 * 30,
  })
}
