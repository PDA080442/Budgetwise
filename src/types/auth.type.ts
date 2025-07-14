export interface AuthTokens {
  access: string
  refresh: string
}

export interface FormData extends LoginData {
  password2: string
}

export interface LoginData {
  email: string
  password: string
  name: string
  lastname: string
  password2: string
}
