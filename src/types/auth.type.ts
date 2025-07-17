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
  name: string
  lastname: string
  new_password: string
  new_password2: string
  old_password: string
  changePasswords: string
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
