// src/shared/lib/getBaseUrl.ts
export const getBaseUrl = () => {
  if (location.hostname === "localhost") return "/api"
  return "https://dummyjson.com"
}
