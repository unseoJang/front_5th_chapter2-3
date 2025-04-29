import { IPosts } from "@/entities/post/model/types"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell, Button } from "@/shared/ui"
import { ThumbsUp, ThumbsDown, MessageSquare, Edit2, Trash2 } from "lucide-react"
import { highlightText } from "@/shared/lib/highlightText" // highlight 유틸 import
import { IUser } from "@/entities/user/model/types"
interface PostTableProps {
  posts: IPosts[]
  searchQuery: string
  selectedTag: string
  onOpenPostDetail: (post: IPosts) => void
  onOpenUserModal: (user: IUser) => void
  onOpenEditDialog: (post: IPosts) => void
  onDeletePost: (postId: number) => void
  onSelectTag: (tag: string) => void
}

// 게시물 테이블 렌더링
export const PostTable = ({
  posts,
  searchQuery,
  selectedTag,
  onOpenUserModal,
  onOpenPostDetail,
  onOpenEditDialog,
  onDeletePost,
  onSelectTag,
}: PostTableProps) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead className="w-[50px]">ID</TableHead>
        <TableHead>제목</TableHead>
        <TableHead className="w-[150px]">작성자</TableHead>
        <TableHead className="w-[150px]">반응</TableHead>
        <TableHead className="w-[150px]">작업</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {posts.map((post) => (
        <TableRow key={post.id}>
          <TableCell>{post.id}</TableCell>
          <TableCell>
            <div className="space-y-1">
              <div>{highlightText(post.title, searchQuery)}</div>

              <div className="flex flex-wrap gap-1">
                {post.tags?.map((tag) => (
                  <span
                    key={tag}
                    className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
                      selectedTag === tag
                        ? "text-white bg-blue-500 hover:bg-blue-600"
                        : "text-blue-800 bg-blue-100 hover:bg-blue-200"
                    }`}
                    onClick={() => {
                      onSelectTag(tag)
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </TableCell>
          <TableCell>
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() =>
                onOpenUserModal({
                  id: post.userId,
                  username: post.authorUsername || "",
                  image: post.authorImage || "",
                } as IUser)
              }
            >
              <img src={post.author?.image} alt={post.author?.username} className="w-8 h-8 rounded-full" />
              <span>{post.author?.username}</span>
            </div>
          </TableCell>
          <TableCell>
            <div className="flex items-center gap-2">
              <ThumbsUp className="w-4 h-4" />
              <span>{post.reactions?.likes || 0}</span>
              <ThumbsDown className="w-4 h-4" />
              <span>{post.reactions?.dislikes || 0}</span>
            </div>
          </TableCell>
          <TableCell>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => onOpenPostDetail(post)}>
                <MessageSquare className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  onOpenEditDialog(post)
                }}
              >
                <Edit2 className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => post.id && onDeletePost(post.id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
)
