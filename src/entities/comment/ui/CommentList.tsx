import { Button } from "@/shared/ui"
import { Edit2, Plus, ThumbsUp, Trash2 } from "lucide-react"
import type { IComment } from "@/entities/comment/model/types"

// lib
import { highlightText } from "@/shared/lib/highlightText"
import { useComments } from "@/entities/comment/hooks/useComments"

interface CommentListProps {
  postId: number
  // comments: IComment[]
  searchQuery: string
  onLikeComment: (id: number, postId: number) => void
  onEditComment: (comment: IComment) => void
  onDeleteComment: (id: number, postId: number) => void
  onAddComment: (postId: number) => void
}

const CommentList = ({
  postId,
  // comments,
  searchQuery,
  onLikeComment,
  onEditComment,
  onDeleteComment,
  onAddComment,
}: CommentListProps) => {
  const { data: comments } = useComments(postId)
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
                <Button variant="ghost" size="sm" onClick={() => comment.id && onLikeComment(comment.id, postId)}>
                  <ThumbsUp className="w-3 h-3" />
                  <span className="ml-1 text-xs">{comment.likes}</span>
                </Button>
                <Button variant="ghost" size="sm" onClick={() => onEditComment(comment)}>
                  <Edit2 className="w-3 h-3" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => comment.id && onDeleteComment(comment.id, postId)}>
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
