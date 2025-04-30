// entities/post/api/postApi.ts
import { IPosts, ITestPosts } from "@/entities/post/model/types"
import type { IPostResponse } from "../model/types"
import { ITestUsers } from "@/entities/user/model/types"

/**
 * 게시물 가져오기
 * @param limit
 * @param skip
 * @returns
 */
// export const fetchPosts = async (limit: number, skip: number) => {
//   const res = await fetch(`/api/posts?limit=${limit}&skip=${skip}`)
//   if (!res.ok) {
//     throw new Error("Failed to fetch posts")
//   }
//   return res.json() as Promise<ITestPosts>
// }

/**
 * 게시물 가져오기
 * @param limit
 * @param skip
 * @returns
 */
export const fetchPosts = async (limit: number, skip: number): Promise<ITestPosts> => {
  const postRes = await fetch(`/api/posts?limit=${limit}&skip=${skip}`)
  if (!postRes.ok) throw new Error("Failed to fetch posts")
  const postsData = await postRes.json()

  const userRes = await fetch("/api/users?limit=0&select=username,image")
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
 * @returns
 */
export const fetchPostsByTag = async (tag: string) => {
  const res = await fetch(`/api/posts/tag/${tag}`)
  if (!res.ok) {
    throw new Error("Failed to fetch posts by tag")
  }
  return res.json() as Promise<ITestPosts>
}

/**
 * 게시물 검색
 * @param query
 */
export const searchPosts = async (query: string): Promise<IPostResponse> => {
  const res = await fetch(`/api/posts/search?q=${query}`)
  if (!res.ok) {
    throw new Error("Failed to search posts")
  }
  return res.json() as Promise<IPostResponse>
}

/**
 * 게시물 추가
 * @param post
 * @returns
 */
export const addPost = async (post: IPosts) => {
  const res = await fetch(`/api/posts/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  })
  if (!res.ok) throw new Error("Failed to add post")
  return res.json() as Promise<IPosts>
}

/**
 * 게시물 업데이트
 * @param post
 * @returns
 */
export const updatePost = async (post: IPosts) => {
  const res = await fetch(`/api/posts/${post.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  })
  if (!res.ok) throw new Error("Failed to update post")
  return res.json() as Promise<IPosts>
}

// 게시물 삭제
export const deletePost = async (id: number) => {
  const res = await fetch(`/api/posts/${id}`, {
    method: "DELETE",
  })

  if (!res.ok) throw new Error("Failed to delete post")
  return res.json() as Promise<IPosts>
}
