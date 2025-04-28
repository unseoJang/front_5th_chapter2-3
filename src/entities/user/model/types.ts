interface ITestUsers {
  users: IUser[]
  total: number
  skip: number
  limit: number
}

interface IUser {
  id: number
  username: string
  firstName: string
  lastName: string
  maidenName: string
  age: number
  gender: string
  email: string
}

export type { IUser, ITestUsers }
