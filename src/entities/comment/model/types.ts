interface ITestComments {
  comments: IComment[]
  limit: number
  skip: number
  total: number
  [key: number]: IComment[]
}

interface IComment {
  body: string
  id?: number
  likes?: number
  postId: number
  user?: ICommentUser
  userId?: number
}

interface ICommentUser {
  fullName: string
  id: number
  username: string
}

export type { IComment, ITestComments, ICommentUser }
