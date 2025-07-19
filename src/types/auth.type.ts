export interface AuthTokens {
  access: string
  refresh: string
}

export interface FormData {
  email: string
  password: string
  password2: string
}

export interface LoginData {
  email: string
  password: string
}

export interface infoProfile {
  id: number
  email: string
  first_name: string
  last_name: string
}

export interface changePassword {
  old_password: string
  new_password: string
}
