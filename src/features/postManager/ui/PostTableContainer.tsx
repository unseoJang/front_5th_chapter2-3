// PostTableContainer.tsx - 게시물 테이블 렌더링
import { IPosts } from "@/entities/post/model/types"
import { PostTable } from "@/entities/post/ui/PostTable"
import { usePostStore } from "@/entities/post/model/postStore"

export const PostTableContainer = () => {
  const { posts, searchQuery, setSelectedPost, setShowPostDetailDialog, setShowEditDialog, setSelectedTag } =
    usePostStore()

  // 게시물 상세 보기
  const openPostDetail = (post: IPosts) => {
    if (!post.id) return
    setSelectedPost(post)
    setShowPostDetailDialog(true)
  }

  return (
    <PostTable
      posts={posts}
      searchQuery={searchQuery}
      onOpenPostDetail={openPostDetail}
      onOpenEditDialog={(post: IPosts) => {
        setSelectedPost(post)
        setShowEditDialog(true)
      }}
      onSelectTag={setSelectedTag}
      selectedTag={""}
    />
  )
}
