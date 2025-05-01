import { useQuery } from "@tanstack/react-query"
import { fetchPosts } from "@/features/postManager/api/postManagerApi"
import { ITestPosts } from "@/entities/post/model/types" // total, posts[]

export const usePosts = (limit: number, skip: number) => {
  return useQuery<ITestPosts>({
    queryKey: ["posts", limit, skip],
    queryFn: () => fetchPosts(limit, skip),
    // keepPreviousData: true, // 페이지네이션 UX 개선
    staleTime: 1000 * 30, // 30초 캐싱
  })
}
