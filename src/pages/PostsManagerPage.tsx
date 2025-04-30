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
import type { IPosts, ITestPosts } from "../entities/post/model/types"
import type { ITestUsers, IUser } from "../entities/user/model/types"

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
    setLoading,
    showEditDialog,
    setShowEditDialog,
    total,
    setTotal,
    setShowAddDialog,
    showAddDialog,
    newPost,
    setNewPost,
    showPostDetailDialog,
    setShowPostDetailDialog,
    showAddCommentDialog,
    setShowAddCommentDialog,
    showEditCommentDialog,
    setShowEditCommentDialog,
    showUserModal,
    setShowUserModal,
  } = usePostStore()
  const { selectedUser, setSelectedUser, loading: userLoading } = useUserStore()

  const { comments, selectedComment, newComment, setComments, setNewComment, setSelectedComment } = useCommentStore()
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
  const fetchTags = async () => {
    try {
      const response = await fetch("/api/posts/tags")
      const data = await response.json()
      setTags(data)
    } catch (error) {
      console.error("태그 가져오기 오류:", error)
    }
  }

  // 게시물 검색
  const searchPosts = async () => {
    if (!searchQuery) {
      // fetchPosts()
      setPosts(postData?.posts || [])
      return
    }
    setLoading(true)
    try {
      const response = await fetch(`/api/posts/search?q=${searchQuery}`)
      const data = await response.json()
      setPosts(data.posts)
      setTotal(data.total)
    } catch (error) {
      console.error("게시물 검색 오류:", error)
    }
    setLoading(false)
  }

  // 태그별 게시물 가져오기
  const fetchPostsByTag = async (tag: string) => {
    if (!tag || tag === "all") {
      fetchPosts()
      return
    }
    setLoading(true)
    try {
      const [postsResponse, usersResponse] = await Promise.all([
        fetch(`/api/posts/tag/${tag}`),
        fetch("/api/users?limit=0&select=username,image"),
      ])
      const postsData = await postsResponse.json()
      const usersData = await usersResponse.json()

      const postsWithUsers = postsData.posts.map((post: IPosts) => ({
        ...post,
        author: usersData.users.find((user: IUser) => user.id === post.userId),
      }))

      setPosts(postsWithUsers)
      setTotal(postsData.total)
    } catch (error) {
      console.error("태그별 게시물 가져오기 오류:", error)
    }
    setLoading(false)
  }

  // 게시물 추가
  const addPost = async () => {
    try {
      const response = await fetch("/api/posts/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      })
      const data = await response.json()
      setPosts([data, ...posts])
      setShowAddDialog(false)
      setNewPost({ title: "", body: "", userId: 1 })
    } catch (error) {
      console.error("게시물 추가 오류:", error)
    }
  }

  // 게시물 업데이트
  const updatePost = async () => {
    if (!selectedPost) return
    try {
      const response = await fetch(`/api/posts/${selectedPost.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedPost),
      })
      const data = await response.json()
      setPosts(posts.map((post) => (post.id === data.id ? data : post)))
      setShowEditDialog(false)
    } catch (error) {
      console.error("게시물 업데이트 오류:", error)
    }
  }

  // 게시물 삭제
  const deletePost = async (id: number) => {
    try {
      await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      })
      setPosts(posts.filter((post) => post.id !== id))
    } catch (error) {
      console.error("게시물 삭제 오류:", error)
    }
  }

  // 댓글 가져오기
  // const fetchComments = async (postId: number) => {
  //   if (comments[postId]) return // 이미 불러온 댓글이 있으면 다시 불러오지 않음
  //   try {
  //     const response = await fetch(`/api/comments/post/${postId}`)
  //     const data = await response.json()
  //     setComments((prev) => ({ ...prev, [postId]: data.comments }))
  //   } catch (error) {
  //     console.error("댓글 가져오기 오류:", error)
  //   }
  // }

  // 댓글 추가
  // const addComment = async () => {
  //   try {
  //     const response = await fetch("/api/comments/add", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(newComment),
  //     })
  //     const data = await response.json()
  //     setComments((prev) => ({
  //       ...prev,
  //       [data.postId]: [...(prev[data.postId] || []), data],
  //     }))
  //     setShowAddCommentDialog(false)
  //     setNewComment({ body: "", postId: 0, userId: 1 })
  //   } catch (error) {
  //     console.error("댓글 추가 오류:", error)
  //   }
  // }

  // 댓글 업데이트
  const updateComment = async () => {
    if (!selectedComment) return
    try {
      const response = await fetch(`/api/comments/${selectedComment.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: selectedComment.body }),
      })
      const data = await response.json()
      setComments((prev) => ({
        ...prev,
        [data.postId]: prev[data.postId].map((comment) => (comment.id === data.id ? data : comment)),
      }))
      setShowEditCommentDialog(false)
    } catch (error) {
      console.error("댓글 업데이트 오류:", error)
    }
  }

  // 댓글 삭제
  const deleteComment = async (id: number, postId: number) => {
    try {
      await fetch(`/api/comments/${id}`, {
        method: "DELETE",
      })
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].filter((comment) => comment.id !== id),
      }))
    } catch (error) {
      console.error("댓글 삭제 오류:", error)
    }
  }

  // 댓글 좋아요
  const likeComment = async (id: number, postId: number) => {
    try {
      const oldComment = comments[postId]?.find((c) => c.id === id)
      if (!oldComment?.likes) return

      const updatedLikes = oldComment.likes + 1

      const response = await fetch(`/api/comments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ likes: updatedLikes }),
      })

      const data = await response.json()
      console.log("수정된 댓글 데이터", data)

      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].map((comment) =>
          comment.id === data.id ? { ...comment, likes: updatedLikes } : comment,
        ),
      }))
      console.log("해당 postId 댓글 목록", comments[postId])
    } catch (error) {
      console.error("댓글 좋아요 오류:", error)
    }
  }

  // 게시물 상세 보기
  const openPostDetail = (post: IPosts) => {
    if (!post.id) return
    setSelectedPost(post)
    // fetchComments(post.id)
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
    fetchTags()
  }, [])

  useEffect(() => {
    if (selectedTag) {
      fetchPostsByTag(selectedTag)
    } else if (postData) {
      setPosts(postData.posts)
      setTotal(postData.total)
    }

    updateURL()
  }, [selectedTag, postData])

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
      onDeletePost={deletePost}
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
        onLikeComment={likeComment}
        onEditComment={(comment) => {
          setSelectedComment(comment)
          setShowEditCommentDialog(true)
        }}
        onDeleteComment={deleteComment}
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
              fetchPostsByTag(value)
              updateURL()
            }}
            onChangeSortBy={setSortBy}
            onChangeSortOrder={setSortOrder}
            onSearch={searchPosts}
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
        setNewPost={setNewPost}
        searchQuery={searchQuery}
        onAddPost={addPost}
        onUpdatePost={updatePost}
        renderComments={renderComments}
      />

      {/* 댓글 대화상자 */}
      {/* <CommentDialogs
        showAddDialog={showAddCommentDialog}
        setShowAddDialog={setShowAddCommentDialog}
        showEditDialog={showEditCommentDialog}
        setShowEditDialog={setShowEditCommentDialog}
        newComment={newComment}
        selectedComment={selectedComment}
        onChangeNewComment={(body) => setNewComment((prev) => ({ ...prev, body }))}
        onChangeSelectedComment={(body) => selectedComment && setSelectedComment({ ...selectedComment, body })}
        onAddComment={addComment}
        onUpdateComment={updateComment}
      /> */}
      <CommentDialogs
        showAddDialog={showAddCommentDialog}
        setShowAddDialog={setShowAddCommentDialog}
        showEditDialog={showEditCommentDialog}
        setShowEditDialog={setShowEditCommentDialog}
        newComment={newComment}
        selectedComment={selectedComment}
        onChangeNewComment={(body) => setNewComment((prev) => ({ ...prev, body }))}
        onChangeSelectedComment={(body) => selectedComment && setSelectedComment({ ...selectedComment, body })}
        onUpdateComment={updateComment}
      />

      {/* 사용자 모달 */}
      <UserModal isOpen={showUserModal} setShowUserModal={setShowUserModal} user={selectedUser} />
    </Card>
  )
}

export default PostsManager
