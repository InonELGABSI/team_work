import type { LoginPayload, User } from '../types/auth'

const DEMO_EMAIL = 'demo@demo.com'
const DEMO_PASSWORD = '123456'

export const authService = {
  login: async ({ email, password }: LoginPayload): Promise<User> => {
    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
      return { email }
    }

    throw new Error('Invalid credentials')
  },
}
