import axios from "axios"

// baseURL 설정
const baseURL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5173" // 또는 MSW를 쓸 경우 로컬 목서버 주소
    : "https://dummyjson.com" // 실제 API 서버 주소

export const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
})

// 👉 필요 시 인터셉터도 설정 가능
// axiosInstance.interceptors.response.use(
//   (res) => res,
//   (err) => {
//     console.error("❌ axios 에러", err)
//     return Promise.reject(err)
//   }
// )

export default axiosInstance
