import { Button } from "@/shared/ui"
import { Edit2, Plus, ThumbsUp, Trash2 } from "lucide-react"
import type { IComment } from "@/entities/comment/model/types"

// lib
import { highlightText } from "@/shared/lib/highlightText"
import { useComments } from "@/entities/comment/hooks/useComments"
import { useDeleteComment } from "../hooks/useDeleteComment"
import { useLikeComment } from "../hooks/useLikeComment"

interface CommentListProps {
  postId: number
  searchQuery: string
  onEditComment: (comment: IComment) => void
  onAddComment: (postId: number) => void
}

const CommentList = ({ postId, searchQuery, onEditComment, onAddComment }: CommentListProps) => {
  // 댓글 가져오기
  const { data: comments } = useComments(postId)
  // 댓글 삭제
  const { mutate: deleteComment } = useDeleteComment()
  // 댓글 좋아요
  const { mutate: likeComment } = useLikeComment()
  console.log("📤 comments", comments)
  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button size="sm" onClick={() => onAddComment(postId)}>
          <Plus className="w-3 h-3 mr-1" />
          댓글 추가
        </Button>
      </div>
      <div className="space-y-1">
        {comments &&
          comments.map((comment) => (
            <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
              <div className="flex items-center space-x-2 overflow-hidden">
                <span className="font-medium truncate">{comment.user?.username}:</span>
                <span className="truncate">{highlightText(comment.body, searchQuery)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    if (comment.id) {
                      likeComment({
                        id: comment.id,
                        postId,
                        likes: (comment.likes || 0) + 1,
                      })
                    }
                  }}
                >
                  <ThumbsUp className="w-3 h-3" />
                  <span className="ml-1 text-xs">{comment.likes}</span>
                </Button>
                <Button variant="ghost" size="sm" onClick={() => onEditComment(comment)}>
                  <Edit2 className="w-3 h-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => comment.id && deleteComment({ id: Number(comment.id), postId })}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default CommentList
