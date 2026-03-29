import './App.css'
import { AuthProvider } from './context/AuthContext'
import { useAuth } from './hooks/useAuth'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'

function AppContent() {
  const { isAuthenticated, status } = useAuth()

  if (status === 'loading') {
    return (
      <main className="page">
        <div className="card">
          <p>Loading...</p>
        </div>
      </main>
    )
  }

  return isAuthenticated ? <HomePage /> : <LoginPage />
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
