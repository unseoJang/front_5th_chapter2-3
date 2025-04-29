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
<<<<<<< HEAD
=======
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
>>>>>>> 09efc2cdc58dda6dcc0f9fa55c4aab299eaf096e
}

export type { IUser, ITestUsers }
