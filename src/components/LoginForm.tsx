import { useState } from 'react'
import type { FormEvent } from 'react'

import { useAuth } from '../hooks/useAuth'

export default function LoginForm() {
  const { login, status, error, clearError } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const isLoading = status === 'loading'
  const canSubmit = !isLoading && email.trim() !== '' && password.trim() !== ''

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    clearError()

    try {
      await login({ email, password })
    } catch {
      // Error state is handled in AuthContext.
    }
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <p className="hint">Use demo@demo.com / 123456</p>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(event) => {
          setEmail(event.target.value)
          if (error) {
            clearError()
          }
        }}
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(event) => {
          setPassword(event.target.value)
          if (error) {
            clearError()
          }
        }}
        required
      />

      {error ? <p className="error-text">{error}</p> : null}

      <button type="submit" disabled={!canSubmit}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  )
}
