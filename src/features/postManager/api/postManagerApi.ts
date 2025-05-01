// entities/post/api/postApi.ts
import { IPosts, ITestPosts, IPostResponse, ITags } from "@/entities/post/model/types"
import { IUser } from "@/entities/user/model/types"
import { axiosInstance } from "@/shared/lib/axiosInstance"

/**
 * 게시물 가져오기
 */
export const fetchPosts = async (limit: number, skip: number): Promise<ITestPosts> => {
  const { data: postsData } = await axiosInstance.get(`/posts`, {
    params: { limit, skip },
  })

  const { data: usersData } = await axiosInstance.get(`/users`, {
    params: { limit: 0, select: "username,image" },
  })

  const postsWithAuthors = postsData.posts.map((post: IPosts) => ({
    ...post,
    author: usersData.users.find((user: IUser) => user.id === post.userId),
  }))

  return {
    posts: postsWithAuthors,
    total: postsData.total,
    skip,
    limit,
  }
}

/**
 * 태그별 게시물 가져오기
 */
export const fetchPostsByTag = async (tag: string): Promise<ITestPosts> => {
  const { data: postsData } = await axiosInstance.get(`/posts/tag/${tag}`)

  const { data: usersData } = await axiosInstance.get(`/users`, {
    params: { limit: 0, select: "username,image" },
  })

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
 */
export const fetchSearchPosts = async (searchQuery: string): Promise<IPostResponse> => {
  const { data } = await axiosInstance.get(`/posts/search`, {
    params: { q: searchQuery },
  })
  return data
}

/**
 * 태그 가져오기
 */
export const fetchTags = async (): Promise<ITags[]> => {
  const { data } = await axiosInstance.get(`/posts/tags`)
  return data
}
