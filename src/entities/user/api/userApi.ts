import { IUser } from "../model/types"

export const fetchUserInfo = async (userId: number) => {
  const res = await fetch(`/api/users/${userId}`)
  if (!res.ok) throw new Error("Failed to fetch user")
  return res.json() as Promise<IUser>
}
