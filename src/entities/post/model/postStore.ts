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
  showAddDialog: boolean
  showEditDialog: boolean
  showPostDetailDialog: boolean
  showAddCommentDialog: boolean
  showEditCommentDialog: boolean
  showUserModal: boolean
  newPost: {
    title: string
    body: string
    userId: number
  }

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
  setShowEditDialog: (value: boolean) => void
  setShowAddDialog: (value: boolean) => void
  setNewPost: (post: { title: string; body: string; userId: number }) => void
  setShowPostDetailDialog: (value: boolean) => void
  setShowAddCommentDialog: (value: boolean) => void
  setShowEditCommentDialog: (value: boolean) => void
  setShowUserModal: (value: boolean) => void
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
      showEditDialog: false,
      showAddDialog: false,
      newPost: {
        title: "",
        body: "",
        userId: 1,
      },
      showPostDetailDialog: false,
      showAddCommentDialog: false,
      showEditCommentDialog: false,
      showUserModal: false,

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
      setShowEditDialog: (value) => set({ showEditDialog: value }),
      setShowAddDialog: (value) => set({ showAddDialog: value }),
      setNewPost: (post) => set({ newPost: post }),
      setShowPostDetailDialog: (value) => set({ showPostDetailDialog: value }),
      setShowAddCommentDialog: (value) => set({ showAddCommentDialog: value }),
      setShowEditCommentDialog: (value) => set({ showEditCommentDialog: value }),
      setShowUserModal: (value) => set({ showUserModal: value }),
    }),
    { name: "PostStore" },
  ),
)
