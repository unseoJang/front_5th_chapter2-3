import { useEffect } from "react"
import { Plus } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../shared/ui"

// types
import type { IPosts } from "../entities/post/model/types"
import type { IUser } from "../entities/user/model/types"

// zustand
import { usePostStore } from "@/entities/post/model/postStore"
import { useCommentStore } from "@/entities/comment/model/commentStore"
import { PostTable } from "@/entities/post/ui/PostTable"
import { useUserStore } from "@/entities/user/model/userStore"

// components
import PostFilters from "@/entities/post/ui/PostFilters"
import PostDialogs from "@/entities/post/ui/PostDialogs"
import CommentList from "@/entities/comment/ui/CommentList"
import UserModal from "@/entities/user/ui/UserModal"
import CommentDialogs from "@/entities/comment/ui/CommentDialogs"
import { usePosts } from "@/entities/post/hooks/usePosts"
import { usePostTags } from "@/entities/post/hooks/usePostTags"
import { usePostByTag } from "@/entities/post/hooks/usePostByTag"
import { useSearchPosts } from "@/entities/post/hooks/useSearchPosts"

const PostsManager = () => {
  const navigate = useNavigate()
  const location = useLocation()

  // 전역 상태 관리
  const {
    posts,
    selectedPost,
    tags,
    skip,
    limit,
    searchQuery,
    sortBy,
    sortOrder,
    selectedTag,
    setPosts,
    setSelectedPost,
    setTags,
    setSkip,
    setLimit,
    setSearchQuery,
    setSortBy,
    setSortOrder,
    setSelectedTag,
    showEditDialog,
    setShowEditDialog,
    total,
    setTotal,
    setShowAddDialog,
    showAddDialog,
    newPost,
    showPostDetailDialog,
    setShowPostDetailDialog,
    showAddCommentDialog,
    setShowAddCommentDialog,
    showEditCommentDialog,
    setShowEditCommentDialog,
    showUserModal,
    setShowUserModal,
  } = usePostStore()
  const { selectedUser, setSelectedUser } = useUserStore()

  const { selectedComment, setNewComment, setSelectedComment } = useCommentStore()
  // URL 업데이트 함수
  const updateURL = () => {
    const params = new URLSearchParams()
    if (skip) params.set("skip", skip.toString())
    if (limit) params.set("limit", limit.toString())
    if (searchQuery) params.set("search", searchQuery)
    if (sortBy) params.set("sortBy", sortBy)
    if (sortOrder) params.set("sortOrder", sortOrder)
    if (selectedTag) params.set("tag", selectedTag)
    navigate(`?${params.toString()}`)
  }

  // 게시물 가져오기
  const { data: postData, isLoading } = usePosts(limit, skip)

  // 태그 가져오기
  const { data: tagData } = usePostTags()

  // 게시물 검색
  const { data: searchPostsData } = useSearchPosts(searchQuery)

  // 태그별 게시물 가져오기
  const { data: postsByTagData } = usePostByTag(selectedTag)

  // 게시물 상세 보기
  const openPostDetail = (post: IPosts) => {
    if (!post.id) return
    setSelectedPost(post)
    setShowPostDetailDialog(true)
  }

  // 사용자 모달 열기
  const openUserModal = async (user: IUser) => {
    try {
      const response = await fetch(`/api/users/${user.id}`)
      const userData = await response.json()
      setSelectedUser(userData)
      setShowUserModal(true)
    } catch (error) {
      console.error("사용자 정보 가져오기 오류:", error)
    }
  }

  useEffect(() => {
    if (tagData) setTags(tagData)
  }, [setTags, tagData])

  useEffect(() => {
    if (searchQuery.trim()) {
      // 🔍 검색어가 있을 때
      setPosts(searchPostsData?.posts || [])
      setTotal(searchPostsData?.total || 0)
    } else if (selectedTag && selectedTag !== "all") {
      // 🏷️ 태그 선택만 있을 때
      setPosts(postsByTagData?.posts || [])
      setTotal(postsByTagData?.total || 0)
    } else if (postData) {
      // 📋 기본 게시물 리스트
      setPosts(postData.posts)
      setTotal(postData.total)
    }

    updateURL()
  }, [searchQuery, selectedTag, postData, postsByTagData, searchPostsData])

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    setSkip(parseInt(params.get("skip") || "0"))
    setLimit(parseInt(params.get("limit") || "10"))
    setSearchQuery(params.get("search") || "")
    setSortBy(params.get("sortBy") || "")
    setSortOrder(params.get("sortOrder") || "asc")
    setSelectedTag(params.get("tag") || "")
  }, [location.search])

  // 게시물 테이블 렌더링
  const renderPostTable = () => (
    <PostTable
      posts={posts}
      searchQuery={searchQuery}
      onOpenPostDetail={openPostDetail}
      onOpenUserModal={openUserModal}
      onOpenEditDialog={(post) => {
        setSelectedPost(post)
        setShowEditDialog(true)
      }}
      onSelectTag={setSelectedTag}
      selectedTag={""}
    />
  )

  // 댓글 렌더링
  const renderComments = (postId: number) => {
    return (
      <CommentList
        postId={postId}
        // comments={comments[postId] || []}
        searchQuery={searchQuery}
        // onLikeComment={likeComment}
        onEditComment={(comment) => {
          setSelectedComment(comment)
          setShowEditCommentDialog(true)
        }}
        // onDeleteComment={deleteComment}
        onAddComment={(postId) => {
          setNewComment({ body: "", postId, userId: 1 })
          setShowAddCommentDialog(true)
        }}
      />
    )
  }

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <Button onClick={() => setShowAddDialog(true)}>
            <Plus className="w-4 h-4 mr-2" />
            게시물 추가
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {/* 검색 및 필터 컨트롤 */}
          <PostFilters
            searchQuery={searchQuery}
            selectedTag={selectedTag}
            sortBy={sortBy}
            sortOrder={sortOrder}
            tags={tags}
            onChangeSearchQuery={setSearchQuery}
            onChangeTag={(value) => {
              setSelectedTag(value)
              setPosts(postsByTagData?.posts || [])
              updateURL()
            }}
            onChangeSortBy={setSortBy}
            onChangeSortOrder={setSortOrder}
            onSearch={() => {
              setPosts(searchPostsData?.posts || [])
              setTotal(searchPostsData?.total || 0)
            }}
          />

          {/* 게시물 테이블 */}
          {isLoading ? <div className="flex justify-center p-4">로딩 중...</div> : renderPostTable()}

          {/* 페이지네이션 */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span>표시</span>
              <Select value={limit.toString()} onValueChange={(value) => setLimit(Number(value))}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="10" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="30">30</SelectItem>
                </SelectContent>
              </Select>
              <span>항목</span>
            </div>
            <div className="flex gap-2">
              <Button disabled={skip === 0} onClick={() => setSkip(Math.max(0, skip - limit))}>
                이전
              </Button>
              <Button disabled={skip + limit >= total} onClick={() => setSkip(skip + limit)}>
                다음
              </Button>
            </div>
          </div>
        </div>
      </CardContent>

      {/* 게시물 추가 대화상자 */}
      <PostDialogs
        showAddDialog={showAddDialog}
        setShowAddDialog={setShowAddDialog}
        newPost={newPost}
        showEditDialog={showEditDialog}
        setShowEditDialog={setShowEditDialog}
        showPostDetailDialog={showPostDetailDialog}
        setShowPostDetailDialog={setShowPostDetailDialog}
        selectedPost={selectedPost}
        setSelectedPost={setSelectedPost}
        searchQuery={searchQuery}
        renderComments={renderComments}
      />

      {/* 댓글 대화상자 */}
      <CommentDialogs
        showAddDialog={showAddCommentDialog}
        setShowAddDialog={setShowAddCommentDialog}
        showEditDialog={showEditCommentDialog}
        setShowEditDialog={setShowEditCommentDialog}
        selectedComment={selectedComment}
        onChangeSelectedComment={(body) => selectedComment && setSelectedComment({ ...selectedComment, body })}
      />

      {/* 사용자 모달 */}
      <UserModal isOpen={showUserModal} setShowUserModal={setShowUserModal} user={selectedUser} />
    </Card>
  )
}

export default PostsManager
