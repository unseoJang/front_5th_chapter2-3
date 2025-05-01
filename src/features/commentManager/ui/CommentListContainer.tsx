// features/comment/ui/CommentListContainer.tsx
// 댓글 렌더링
import { useCommentStore } from "@/entities/comment/model/commentStore"
import { usePostStore } from "@/entities/post/model/postStore"

import CommentList from "@/entities/comment/ui/CommentList"

interface Props {
  postId: number
}

const CommentListContainer = ({ postId }: Props) => {
  const { searchQuery, setShowEditCommentDialog, setShowAddCommentDialog } = usePostStore()

  const { setNewComment, setSelectedComment } = useCommentStore()

  return (
    <CommentList
      postId={postId}
      searchQuery={searchQuery}
      onEditComment={(comment) => {
        setSelectedComment(comment)
        setShowEditCommentDialog(true)
      }}
      onAddComment={(postId) => {
        setNewComment({ body: "", postId, userId: 1 })
        setShowAddCommentDialog(true)
      }}
    />
  )
}

export default CommentListContainer
