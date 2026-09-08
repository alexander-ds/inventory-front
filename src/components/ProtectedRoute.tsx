import type { ReactNode } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { AuthPage } from './AuthPage'

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <AuthPage />
  }

  return children
}