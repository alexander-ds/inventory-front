import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import * as authService from '../services/authService'
import { setUnauthorizedHandler } from '../services/apiClient'
import { decodeJwtPayload } from '../utils/jwt'
import { AuthContext, type AuthContextValue } from './AuthContext'

// El JWT se guarda en localStorage.
// Decisión documentada: docs/decisions/ADR-001-token-storage.md
const TOKEN_STORAGE_KEY = 'inventory.auth.token'

function readStoredToken(): string | null {
  return window.localStorage.getItem(TOKEN_STORAGE_KEY)
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(readStoredToken)
  const [user, setUser] = useState(() => {
    const stored = readStoredToken()
    return stored ? decodeJwtPayload(stored) : null
  })

  const logout = useCallback(() => {
    window.localStorage.removeItem(TOKEN_STORAGE_KEY)
    setToken(null)
    setUser(null)
  }, [])

  useEffect(() => {
    setUnauthorizedHandler(logout)
    return () => setUnauthorizedHandler(null)
  }, [logout])

  const login = useCallback(async (email: string, password: string) => {
    const { access_token } = await authService.login(email, password)
    window.localStorage.setItem(TOKEN_STORAGE_KEY, access_token)
    setToken(access_token)
    setUser(decodeJwtPayload(access_token))
  }, [])

  const register = useCallback(
    async (email: string, password: string, name?: string) => {
      await authService.register({ email, password, name })
      await login(email, password)
    },
    [login],
  )

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: token !== null,
      login,
      register,
      logout,
    }),
    [user, token, login, register, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}