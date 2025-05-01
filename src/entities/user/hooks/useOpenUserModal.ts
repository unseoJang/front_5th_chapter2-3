import { useMutation } from "@tanstack/react-query"
import { fetchUserInfo } from "../api/userApi"
import { useUserStore } from "../model/userStore"
import { usePostStore } from "@/entities/post/model/postStore"

export const useOpenUserModal = () => {
  const { setSelectedUser } = useUserStore()
  const { setShowUserModal } = usePostStore()

  return useMutation({
    mutationFn: (userId: number) => fetchUserInfo(userId),
    onSuccess: (userData) => {
      setSelectedUser(userData)
      setShowUserModal(true)
    },
    onError: (error) => {
      console.error("❌ 사용자 정보 가져오기 실패", error)
    },
  })
}
