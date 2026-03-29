import './App.css'
import { AuthProvider } from './context/AuthContext'
import { useAuth } from './hooks/useAuth'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'

function AppContent() {
  const { isAuthenticated } = useAuth()

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
