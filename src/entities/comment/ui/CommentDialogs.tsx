import { Dialog, DialogContent, DialogHeader, DialogTitle, Textarea, Button } from "@/shared/ui"
import type { IComment } from "@/entities/comment/model/types"

import { useAddComment } from "@/entities/comment/hooks/useAddComment"
import { useCommentStore } from "@/entities/comment/model/commentStore"
import { useUpdateComment } from "../hooks/useUpdateComment"

interface CommentDialogsProps {
  showAddDialog: boolean
  setShowAddDialog: (open: boolean) => void
  showEditDialog: boolean
  setShowEditDialog: (open: boolean) => void
  selectedComment: IComment | null
  onChangeSelectedComment: (body: string) => void
}

const CommentDialogs = ({
  showAddDialog,
  setShowAddDialog,
  showEditDialog,
  setShowEditDialog,
  selectedComment,
  onChangeSelectedComment,
}: CommentDialogsProps) => {
  const { newComment, setNewComment } = useCommentStore()

  // 댓글 추가
  const { mutate: addComment } = useAddComment({
    onSuccess: () => {
      setShowAddDialog(false)
      setNewComment((prev: IComment) => ({ ...prev }))
    },
  })

  // 댓글 업데이트
  const { mutate: updateComment } = useUpdateComment({
    onSuccess: () => {
      setShowEditDialog(false)
    },
  })

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
              onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}
            />
            <Button
              onClick={() => {
                console.log("📦 보내는 newComment", newComment)
                addComment(newComment)
              }}
            >
              댓글 추가
            </Button>
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
            <Button
              onClick={() => {
                if (selectedComment) {
                  updateComment({
                    id: selectedComment.id as number,
                    body: selectedComment.body,
                    postId: selectedComment.postId,
                  })
                }
              }}
            >
              댓글 업데이트
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default CommentDialogs
