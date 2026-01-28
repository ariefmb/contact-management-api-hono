export type UserRegisterRequest = {
  id: string
  username: string
  password: string
  name: string
}

export type UserLoginRequest = {
  username: string
  password: string
}

export type RefreshSessionRequest = {
  refreshToken: string
}

export type UserUpdateRequest = {
  username?: string
  password?: string
  name?: string
}

export type UserTokenResponse = {
  user: UserResponse
  accessToken: string
  refreshToken: string
}

export type UserResponse = {
  id: string
  username: string
  name: string
}

export type UserInterface = {
  id: string
  username: string
  password: string
  name: string
  tokenVersion: number
}
