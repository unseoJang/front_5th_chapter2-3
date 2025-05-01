import { axiosInstance } from "@/shared/lib/axiosInstance"
import { IComment } from "../model/types"

/**
 * 댓글 가져오기
 */
export const fetchComments = async (postId: number): Promise<IComment[]> => {
  const { data } = await axiosInstance.get(`/comments/post/${postId}`)
  return data.comments
}

/**
 * 댓글 추가
 */
export const addComment = async (comment: IComment): Promise<IComment> => {
  console.log("📤 API 호출 payload", comment)
  const { data } = await axiosInstance.post("/comments/add", comment)
  return data
}

/**
 * 댓글 수정
 */
export const updateComment = async (id: number, body: string): Promise<IComment> => {
  const { data } = await axiosInstance.put(`/comments/${id}`, { body })
  return data
}

/**
 * 댓글 삭제
 */
export const deleteComment = async (id: number): Promise<IComment> => {
  const { data } = await axiosInstance.delete(`/comments/${id}`)
  return data
}

/**
 * 댓글 좋아요
 */
export const likeComment = async (id: number, likes: number): Promise<IComment> => {
  const { data } = await axiosInstance.patch(`/comments/${id}`, { likes })
  return data
}
