import { useEffect } from "react"
import { Plus } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"
import { Button, Card, CardContent, CardHeader, CardTitle } from "../shared/ui"

// zustand
import { usePostStore } from "@/entities/post/model/postStore"
import { useCommentStore } from "@/entities/comment/model/commentStore"
import { useUserStore } from "@/entities/user/model/userStore"

// components
import PostFilters from "@/features/postManager/ui/PostFilters"
import PostDialogs from "@/entities/post/ui/PostDialogs"
import UserModal from "@/entities/user/ui/UserModal"
import CommentDialogs from "@/entities/comment/ui/CommentDialogs"
import PaginationControl from "@/widgets/ui/PaginationControl"
import { PostTableContainer } from "@/features/postManager/ui/PostTableContainer"
import CommentListContainer from "@/features/commentManager/ui/CommentListContainer"

// features hooks
import { usePosts, usePostTags, usePostByTag, useSearchPosts } from "@/features/postManager/hook/useFilteredPosts"

const PostsManager = () => {
  const navigate = useNavigate()
  const location = useLocation()

  // 전역 상태 관리
  const {
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
  const { selectedUser } = useUserStore()

  const { selectedComment, setSelectedComment } = useCommentStore()
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
          {isLoading ? <div className="flex justify-center p-4">로딩 중...</div> : <PostTableContainer />}

          {/* 페이지네이션 */}
          <PaginationControl
            skip={skip}
            limit={limit}
            total={total}
            onChangeLimit={setLimit}
            onPrev={() => setSkip(Math.max(0, skip - limit))}
            onNext={() => setSkip(skip + limit)}
          />
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
        renderComments={(postId) => <CommentListContainer postId={postId} />}
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
