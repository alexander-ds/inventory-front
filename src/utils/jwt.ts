export type JwtPayload = {
  sub?: string
  email?: string
  iat?: number
  exp?: number
}

function decodeSegment(segment: string): unknown {
  const normalized = segment.replace(/-/g, '+').replace(/_/g, '/')
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=')
  const bytes = Uint8Array.from(atob(padded), (char) => char.charCodeAt(0))
  return JSON.parse(new TextDecoder().decode(bytes)) as unknown
}

export function decodeJwtPayload(token: string): JwtPayload | null {
  const segments = token.split('.')
  if (segments.length !== 3) return null
  try {
    return decodeSegment(segments[1]) as JwtPayload
  } catch {
    return null
  }
}