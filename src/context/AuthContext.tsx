import { createContext, useCallback, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

import { authService } from '../services/authService'
import type { AuthStatus, LoginPayload, User } from '../types/auth'

const AUTH_STORAGE_KEY = 'app_auth_user'

function readPersistedUser(): User | null {
  const rawValue = localStorage.getItem(AUTH_STORAGE_KEY)

  if (!rawValue) {
    return null
  }

  try {
    return JSON.parse(rawValue) as User
  } catch {
    localStorage.removeItem(AUTH_STORAGE_KEY)
    return null
  }
}

type AuthContextValue = {
  user: User | null
  status: AuthStatus
  error: string | null
  isAuthenticated: boolean
  login: (payload: LoginPayload) => Promise<void>
  logout: () => void
  clearError: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

type AuthProviderProps = {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(() => readPersistedUser())
  const [status, setStatus] = useState<AuthStatus>(user ? 'authenticated' : 'idle')
  const [error, setError] = useState<string | null>(null)

  const login = useCallback(async (payload: LoginPayload) => {
    setStatus('loading')
    setError(null)

    try {
      const loggedInUser = await authService.login(payload)
      setUser(loggedInUser)
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(loggedInUser))
      setStatus('authenticated')
    } catch (caughtError) {
      const message =
        caughtError instanceof Error ? caughtError.message : 'Unexpected error happened'
      setStatus('error')
      setError(message)
      throw caughtError
    }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    setStatus('idle')
    setError(null)
    localStorage.removeItem(AUTH_STORAGE_KEY)
  }, [])

  const clearError = useCallback(() => {
    setError(null)
    setStatus((previousStatus) => (previousStatus === 'error' ? 'idle' : previousStatus))
  }, [])

  const value = useMemo(
    () => ({
      user,
      status,
      error,
      isAuthenticated: !!user,
      login,
      logout,
      clearError,
    }),
    [user, status, error, login, logout, clearError],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContext
