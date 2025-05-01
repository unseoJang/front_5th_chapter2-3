// entities/post/postApi.ts
import { IPosts } from "@/entities/post/model/types"
import { axiosInstance } from "@/shared/lib/axiosInstance"

/**
 * 게시물 추가
 * @param post
 * @returns
 */
export const addPost = async (post: IPosts): Promise<IPosts> => {
  const { data } = await axiosInstance.post("/posts/add", post)
  return data as IPosts
}

/**
 * 게시물 업데이트
 * @param post
 * @returns
 */
export const updatePost = async (post: IPosts): Promise<IPosts> => {
  const { data } = await axiosInstance.put(`/posts/${post.id}`, post)
  return data as IPosts
}

/**
 * 게시물 삭제
 * @param id
 * @returns
 */
export const deletePost = async (id: number): Promise<IPosts> => {
  const { data } = await axiosInstance.delete(`/posts/${id}`)
  return data as IPosts
}
