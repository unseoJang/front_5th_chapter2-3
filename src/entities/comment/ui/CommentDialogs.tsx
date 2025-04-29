import { Dialog, DialogContent, DialogHeader, DialogTitle, Textarea, Button } from "@/shared/ui"
import type { IComment } from "@/entities/comment/model/types"

interface CommentDialogsProps {
  showAddDialog: boolean
  setShowAddDialog: (open: boolean) => void
  showEditDialog: boolean
  setShowEditDialog: (open: boolean) => void
  newComment: IComment
  selectedComment: IComment | null
  onChangeNewComment: (body: string) => void
  onChangeSelectedComment: (body: string) => void
  onAddComment: () => void
  onUpdateComment: () => void
}

const CommentDialogs = ({
  showAddDialog,
  setShowAddDialog,
  showEditDialog,
  setShowEditDialog,
  newComment,
  selectedComment,
  onChangeNewComment,
  onChangeSelectedComment,
  onAddComment,
  onUpdateComment,
}: CommentDialogsProps) => {
  return (
    <>
      {/* 댓글 추가 대화상자 */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>새 댓글 추가</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="댓글 내용"
              value={newComment.body}
              onChange={(e) => onChangeNewComment(e.target.value)}
            />
            <Button onClick={onAddComment}>댓글 추가</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 댓글 수정 대화상자 */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>댓글 수정</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="댓글 내용"
              value={selectedComment?.body || ""}
              onChange={(e) => onChangeSelectedComment(e.target.value)}
            />
            <Button onClick={onUpdateComment}>댓글 업데이트</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default CommentDialogs
