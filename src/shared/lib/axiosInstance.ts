// shared/lib/axiosInstance.ts
import axios from "axios"
import { getBaseUrl } from "./getBaseUrl"

export const axiosInstance = axios.create({
  baseURL: getBaseUrl(), // 여기가 /api 또는 http://localhost:3000 이어야 함
  headers: {
    "Content-Type": "application/json",
  },
})
