export type User = {
  email: string
}

export type LoginPayload = {
  email: string
  password: string
}

export type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'error'
