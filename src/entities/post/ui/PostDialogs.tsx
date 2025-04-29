import { highlightText } from "@/shared/lib/highlightText"
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Input, Textarea } from "@/shared/ui"
import { IPosts } from "../model/types"
import { JSX } from "react"

interface PostDialogsProps {
  showAddDialog: boolean
  setShowAddDialog: (open: boolean) => void
  newPost: IPosts
  showEditDialog: boolean
  setShowEditDialog: (open: boolean) => void
  showPostDetailDialog: boolean
  setShowPostDetailDialog: (open: boolean) => void

  selectedPost: IPosts | null
  setSelectedPost: (post: IPosts | null) => void
  setNewPost: (post: IPosts) => void

  searchQuery: string
  onAddPost: () => void
  onUpdatePost: () => void
  renderComments: (postId: number) => JSX.Element
}

const PostDialogs = ({
  showAddDialog,
  setShowAddDialog,
  newPost,
  showEditDialog,
  setShowEditDialog,
  showPostDetailDialog,
  setShowPostDetailDialog,
  selectedPost,
  setSelectedPost,
  setNewPost,
  searchQuery,
  onAddPost,
  onUpdatePost,
  renderComments,
}: PostDialogsProps) => {
  return (
    <>
      {/* 게시물 추가 대화상자 */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>새 게시물 추가</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="제목"
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            />
            <Textarea
              rows={30}
              placeholder="내용"
              value={newPost.body}
              onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
            />
            <Input
              type="number"
              placeholder="사용자 ID"
              value={newPost.userId}
              onChange={(e) => setNewPost({ ...newPost, userId: Number(e.target.value) })}
            />
            <Button onClick={onAddPost}>게시물 추가</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 게시물 수정 대화상자 */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>게시물 수정</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="제목"
              value={selectedPost?.title || ""}
              onChange={(e) => selectedPost && setSelectedPost({ ...selectedPost, title: e.target.value })}
            />
            <Textarea
              rows={15}
              placeholder="내용"
              value={selectedPost?.body || ""}
              onChange={(e) => selectedPost && setSelectedPost({ ...selectedPost, body: e.target.value })}
            />
            <Button onClick={onUpdatePost}>게시물 업데이트</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 게시물 상세 보기 대화상자 */}
      <Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedPost?.title && highlightText(selectedPost?.title, searchQuery)}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>{selectedPost && highlightText(selectedPost?.body, searchQuery)}</p>
            {selectedPost !== null && selectedPost.id !== undefined && renderComments(selectedPost.id)}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default PostDialogs
