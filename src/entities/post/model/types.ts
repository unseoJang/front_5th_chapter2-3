import { IUser } from "../../user/model/types"

interface ITestPosts {
  posts: IPosts[]
  total: number
  skip: number
  limit: number
}

interface IPosts {
  author?: Author
  id?: number
  title?: string
  body?: string
  tags?: string[]
  reactions?: {
    likes: number
    dislikes: number
  }
  views?: number
  userId?: number
  authorId?: string
  authorImage?: string
  authorUsername?: string
}

interface Author {
  image: string
  username: string
}

interface IPostWithAuthor extends IPosts {
  author: IUser
}

interface ITags {
  slug: string
  tags: string[]
  url?: string
}

interface IPostResponse {
  posts: IPosts[]
  total: number
  skip: number
  limit: number
}

export type { IPosts, IPostWithAuthor, ITestPosts, ITags, IPostResponse }
