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


export interface infoProfile {
  id: number,
  email: string,
  first_name: string,
  last_name: string
}
