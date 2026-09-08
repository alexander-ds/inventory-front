export class ApiError extends Error {
  readonly status: number

  constructor(status: number, message: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

type ApiMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export type RequestOptions = {
  method?: ApiMethod
  body?: unknown
  token?: string
}

let onUnauthorized: (() => void) | null = null

export function setUnauthorizedHandler(handler: (() => void) | null): void {
  onUnauthorized = handler
}

async function request<T>(
  baseUrl: string,
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const headers: Record<string, string> = {
    Accept: 'application/json',
  }
  if (options.body !== undefined) {
    headers['Content-Type'] = 'application/json'
  }
  if (options.token) {
    headers.Authorization = `Bearer ${options.token}`
  }

  const response = await fetch(`${baseUrl}${path}`, {
    method: options.method ?? 'GET',
    headers,
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
  })

  if (response.status === 401 && options.token) {
    onUnauthorized?.()
  }

  if (!response.ok) {
    throw new ApiError(response.status, await readError(response))
  }

  if (response.status === 204) {
    return undefined as T
  }

  return (await response.json()) as T
}

async function readError(response: Response): Promise<string> {
  try {
    const body = (await response.json()) as {
      message?: string | string[]
      error?: string
    }
    if (typeof body.message === 'string') return body.message
    if (Array.isArray(body.message)) return body.message.join(', ')
    if (body.error) return body.error
  } catch {
    // El cuerpo no es JSON; se usa el texto de estado por defecto.
  }
  return `HTTP ${response.status} ${response.statusText}`.trim()
}

export const http = {
  get: <T>(
    baseUrl: string,
    path: string,
    options?: Omit<RequestOptions, 'method' | 'body'>,
  ): Promise<T> => request<T>(baseUrl, path, options),
  post: <T>(
    baseUrl: string,
    path: string,
    body?: unknown,
    options?: Omit<RequestOptions, 'method'>,
  ): Promise<T> => request<T>(baseUrl, path, { ...options, method: 'POST', body }),
}