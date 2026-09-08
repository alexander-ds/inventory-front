import { ProtectedRoute } from './components/ProtectedRoute'
import { DashboardPage } from './components/DashboardPage'
import { AuthProvider } from './contexts/AuthProvider'

function AppRoutes() {
  return (
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}

export default App