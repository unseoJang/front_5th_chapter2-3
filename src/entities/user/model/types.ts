interface ITestUsers {
  users: IUser[]
  total: number
  skip: number
  limit: number
}

interface IUser {
  id: number
  username: string
  image: string
}

export type { IUser, ITestUsers }
