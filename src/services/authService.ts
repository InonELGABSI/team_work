import type { LoginPayload, User } from '../types/auth'

const DEMO_EMAIL = 'demo@demo.com'
const DEMO_PASSWORD = '123456'

function normalizeEmail(email: string) {
  return email.trim().toLowerCase()
}

export const authService = {
  login: async ({ email, password }: LoginPayload): Promise<User> => {
    const normalizedEmail = normalizeEmail(email)
    const normalizedPassword = password.trim()

    if (!normalizedEmail || !normalizedPassword) {
      throw new Error('Email and password are required')
    }

    if (normalizedEmail === DEMO_EMAIL && normalizedPassword === DEMO_PASSWORD) {
      return { email: normalizedEmail }
    }

    throw new Error('Invalid credentials')
  },
}
