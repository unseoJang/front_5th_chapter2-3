interface ITestPosts {
  posts: IPosts[]
  total: number
  skip: number
  limit: number
}

interface IPosts {
  id?: number
  title: string
  body: string
  tags?: string[]
  reactions?: {
    likes: number
    dislikes: number
  }
  views?: number
  userId: number
}

interface ITags {
  tags: string[]
}

export type { IPosts, ITestPosts, ITags }
