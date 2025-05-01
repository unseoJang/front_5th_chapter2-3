// src/shared/lib/getBaseUrl.ts
export const getBaseUrl = () => {
  if (location.hostname === "localhost") return ""
  return "https://dummyjson.com"
}
