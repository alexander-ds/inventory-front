import { environment } from '../config/environment'
import { http } from './apiClient'

export type LoginResponse = {
  access_token: string
}

export type RegisterRequest = {
  email: string
  password: string
  name: string
}

export function login(email: string, password: string): Promise<LoginResponse> {
  return http.post<LoginResponse>(environment.authServiceUrl, '/auth/login', {
    email,
    password,
  })
}

export function register(input: RegisterRequest): Promise<unknown> {
  return http.post(environment.authServiceUrl, '/auth/register', input)
}