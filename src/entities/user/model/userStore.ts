import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { IUser } from "./types"

interface UserState {
  users: IUser[]
  selectedUser: IUser | null
  loading: boolean

  setUsers: (users: IUser[]) => void
  setSelectedUser: (user: IUser | null) => void
  setLoading: (loading: boolean) => void
}

export const useUserStore = create(
  devtools<UserState>(
    (set) => ({
      users: [],
      selectedUser: null,
      loading: false,

      setUsers: (users: IUser[]) => set({ users }),
      setSelectedUser: (user: IUser | null) => set({ selectedUser: user }),
      setLoading: (loading: boolean) => set({ loading }),
    }),
    { name: "UserStore" },
  ),
)
