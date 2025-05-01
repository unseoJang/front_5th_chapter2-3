// entities/post/api/postApi.ts
import { IPosts } from "@/entities/post/model/types"
import { getBaseUrl } from "@/shared/lib/getBaseUrl"

/**
 * 게시물 추가
 * @param post
 * @returns
 */
export const addPost = async (post: IPosts): Promise<IPosts> => {
  const res = await fetch(`${getBaseUrl()}/api/posts/add`, {
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
  const res = await fetch(`${getBaseUrl()}/api/posts/${post.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  })
  if (!res.ok) throw new Error("Failed to update post")
  return res.json() as Promise<IPosts>
}

// 게시물 삭제
export const deletePost = async (id: number) => {
  const res = await fetch(`${getBaseUrl()}/api/posts/${id}`, {
    method: "DELETE",
  })

  if (!res.ok) throw new Error("Failed to delete post")
  return res.json() as Promise<IPosts>
}
