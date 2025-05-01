import { IPosts, ITestPosts, IPostResponse, ITags } from "@/entities/post/model/types"
import { IUser } from "@/entities/user/model/types"
import { getBaseUrl } from "@/shared/lib/getBaseUrl"

/**
 * 게시물 가져오기
 * @param limit
 * @param skip
 * @returns
 */
export const fetchPosts = async (limit: number, skip: number): Promise<ITestPosts> => {
  const postRes = await fetch(`${getBaseUrl()}/posts?limit=${limit}&skip=${skip}`)
  if (!postRes.ok) throw new Error("Failed to fetch posts")
  const postsData = await postRes.json()

  const userRes = await fetch(`${getBaseUrl()}/users?limit=0&select=username,image`)
  if (!userRes.ok) throw new Error("Failed to fetch users")
  const usersData = await userRes.json()

  const postsWithAuthors = await Promise.all(
    postsData.posts.map(async (post: IPosts) => ({
      ...post,
      author: usersData.users.find((user: { id: number }) => user.id === post.userId),
    })),
  )

  return {
    posts: postsWithAuthors,
    total: postsData.total,
    skip,
    limit,
  }
}

/**
 * 태그별 게시물 가져오기
 * @param tag
 * @param limit
 * @param skip
 * @returns
 */
export const fetchPostsByTag = async (tag: string): Promise<ITestPosts> => {
  const postRes = await fetch(`${getBaseUrl()}/posts/tag/${tag}`)
  if (!postRes.ok) throw new Error("Failed to fetch posts by tag")
  const postsData = await postRes.json()

  const userRes = await fetch(`${getBaseUrl()}/users?limit=0&select=username,image`)
  if (!userRes.ok) throw new Error("Failed to fetch users")
  const usersData = await userRes.json()

  const postsWithAuthors = postsData.posts.map((post: IPosts) => ({
    ...post,
    author: usersData.users.find((user: IUser) => user.id === post.userId),
  }))

  return {
    posts: postsWithAuthors,
    total: postsData.total,
    skip: postsData.skip,
    limit: postsData.limit,
  }
}

/**
 * 게시물 검색
 * @param searchQuery
 */
export const fetchSearchPosts = async (searchQuery: string): Promise<IPostResponse> => {
  const res = await fetch(`${getBaseUrl()}/posts/search?q=${searchQuery}`)
  if (!res.ok) {
    throw new Error("Failed to search posts")
  }
  return res.json() as Promise<IPostResponse>
}

/**
 * 태그 가져오기
 * @returns
 */
export const fetchTags = async () => {
  const res = await fetch(`${getBaseUrl()}/posts/tags`)
  if (!res.ok) throw new Error("Failed to fetch tags")
  return res.json() as Promise<ITags[]>
}
