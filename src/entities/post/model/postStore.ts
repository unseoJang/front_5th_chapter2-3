import { create } from "zustand"
import { devtools } from "zustand/middleware"
import type { IPosts, ITags } from "./types"

interface PostState {
  posts: IPosts[]
  selectedPost: IPosts | null
  tags: ITags[]
  skip: number
  limit: number
  total: number
  searchQuery: string
  sortBy: string
  sortOrder: string
  selectedTag: string
  loading: boolean

  setPosts: (posts: IPosts[]) => void
  setSelectedPost: (post: IPosts | null) => void
  setTags: (tags: ITags[]) => void
  setSkip: (skip: number) => void
  setLimit: (limit: number) => void
  setTotal: (total: number) => void
  setSearchQuery: (searchQuery: string) => void
  setSortBy: (sortBy: string) => void
  setSortOrder: (sortOrder: string) => void
  setSelectedTag: (selectedTag: string) => void
  setLoading: (loading: boolean) => void
}

export const usePostStore = create<PostState>()(
  devtools<PostState>(
    (set) => ({
      posts: [],
      selectedPost: null,
      tags: [],
      skip: 0,
      total: 0,
      limit: 10,
      searchQuery: "",
      sortBy: "id",
      sortOrder: "asc",
      selectedTag: "",
      loading: false,

      setPosts: (posts) => set({ posts }),
      setSelectedPost: (post) => set({ selectedPost: post }),
      setTags: (tags) => set({ tags }),
      setSkip: (skip) => set({ skip }),
      setLimit: (limit) => set({ limit }),
      setTotal: (total) => set({ total }),
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      setSortBy: (sortBy) => set({ sortBy }),
      setSortOrder: (sortOrder) => set({ sortOrder }),
      setSelectedTag: (selectedTag) => set({ selectedTag }),
      setLoading: (loading) => set({ loading }),
    }),
    { name: "PostStore" },
  ),
)
