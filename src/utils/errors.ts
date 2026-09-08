import { ApiError } from '../services/apiClient'

export function toErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    if (error.status === 401) return 'Credenciales inválidas'
    return error.message || `Error HTTP ${error.status}`
  }
  if (error instanceof Error) return error.message
  return 'Ocurrió un error inesperado'
}