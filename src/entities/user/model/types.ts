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
  image: string
  phone: string
  address: {
    address: string
    city: string
    state: string
    country: string
    postalCode: string
    coordinates: {
      lat: number
      lng: number
    }
  }
  company: {
    name: string
    title: string
    department: string
    address: string
    city: string
    state: string
    country: string
    postalCode: string
  }
}

export type { IUser, ITestUsers }
