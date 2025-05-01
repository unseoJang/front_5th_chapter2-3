// entities/user/api/userApi.ts
import { IUser } from "../model/types"
import { axiosInstance } from "@/shared/lib/axiosInstance"

/**
 * 사용자 정보 가져오기
 * @param userId
 * @returns
 */
export const fetchUserInfo = async (userId: number): Promise<IUser> => {
  const { data } = await axiosInstance.get(`/users/${userId}`)
  return data as IUser
}
