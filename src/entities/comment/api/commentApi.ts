import { getBaseUrl } from "@/shared/lib/getBaseUrl"
import { IComment } from "../model/types"

/**
 * 댓글 가져오기
 * @param postId
 * @returns
 */
export const fetchComments = async (postId: number): Promise<IComment[]> => {
  const res = await fetch(`${getBaseUrl()}/comments/post/${postId}`)
  if (!res.ok) throw new Error("Failed to fetch comments")
  const data = await res.json()
  return data.comments as IComment[]
}

/**
 * 댓글 추가
 * @param postId
 * @param comment
 * @returns
 */
export const addComment = async (comment: IComment): Promise<IComment> => {
  console.log("📤 API 호출 payload", comment)

  const res = await fetch(`${getBaseUrl()}/comments/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(comment),
  })
  if (!res.ok) throw new Error("Failed to add comment")
  return res.json()
}

/**
 * 댓글 수정
 * @param id
 * @param body
 * @returns
 */
export const updateComment = async (id: number, body: string): Promise<IComment> => {
  const res = await fetch(`${getBaseUrl()}/comments/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ body }),
  })
  if (!res.ok) throw new Error("Failed to update comment")
  return res.json() as Promise<IComment>
}

/**
 * 댓글 삭제
 * @param id
 * @returns
 */
export const deleteComment = async (id: number): Promise<IComment> => {
  const res = await fetch(`${getBaseUrl()}/comments/${id}`, {
    method: "DELETE",
  })
  if (!res.ok) throw new Error("Failed to delete comment")
  return res.json() as Promise<IComment>
}

/**
 * 댓글 좋아요
 * @param id
 * @returns
 */
export const likeComment = async (id: number, likes: number): Promise<IComment> => {
  const res = await fetch(`${getBaseUrl()}/comments/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ likes }),
  })
  if (!res.ok) throw new Error("Failed to like comment")
  return res.json()
}
