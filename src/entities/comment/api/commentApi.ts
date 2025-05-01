import { IComment } from "../model/types"
import { axiosInstance } from "@/shared/lib/axiosInstance"

/**
 * 댓글 가져오기
 * @param postId
 */
export const fetchComments = async (postId: number): Promise<IComment[]> => {
  const res = await axiosInstance.get(`/api/comments/post/${postId}`)
  return res.data.comments as IComment[]
}

/**
 * 댓글 추가
 * @param comment
 */
export const addComment = async (comment: IComment): Promise<IComment> => {
  console.log("📤 API 호출 payload", comment)
  const res = await axiosInstance.post(`/api/comments/add`, comment)
  return res.data
}

/**
 * 댓글 수정
 * @param id
 * @param body
 */
export const updateComment = async (id: number, body: string): Promise<IComment> => {
  const res = await axiosInstance.put(`/api/comments/${id}`, { body })
  return res.data
}

/**
 * 댓글 삭제
 * @param id
 */
export const deleteComment = async (id: number): Promise<IComment> => {
  const res = await axiosInstance.delete(`/api/comments/${id}`)
  return res.data
}

/**
 * 댓글 좋아요
 * @param id
 * @param likes
 */
export const likeComment = async (id: number, likes: number): Promise<IComment> => {
  const res = await axiosInstance.patch(`/api/comments/${id}`, { likes })
  return res.data
}
