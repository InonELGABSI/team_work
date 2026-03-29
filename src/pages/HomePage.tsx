import { useAuth } from '../hooks/useAuth'

export default function HomePage() {
  const { user, logout } = useAuth()

  return (
    <main className="page">
      <div className="card">
        <h2>Welcome</h2>
        <p>Logged in as: {user?.email}</p>
        <button type="button" onClick={logout}>
          Logout
        </button>
      </div>
    </main>
  )
}
