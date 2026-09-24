import { useState, type FormEvent } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { toErrorMessage } from '../utils/errors'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function RegisterForm() {
  const { register } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)

    if (!name.trim()) {
      setError('Ingresa tu nombre')
      return
    }
    if (!EMAIL_PATTERN.test(email.trim())) {
      setError('Ingresa un email válido')
      return
    }
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return
    }

    setIsSubmitting(true)
    try {
      await register(email.trim(), password, name.trim())
    } catch (cause) {
      setError(toErrorMessage(cause))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor="register-name">Nombre</label>
        <input
          id="register-name"
          type="text"
          autoComplete="name"
          className="input"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
      </div>

      <div className="field">
        <label htmlFor="register-email">Email</label>
        <input
          id="register-email"
          type="email"
          autoComplete="email"
          className="input"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </div>

      <div className="field">
        <label htmlFor="register-password">Contraseña</label>
        <input
          id="register-password"
          type="password"
          autoComplete="new-password"
          className="input"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          minLength={6}
          required
        />
      </div>

      {error && <div className="alert" role="alert">{error}</div>}

      <button type="submit" className="button" disabled={isSubmitting}>
        {isSubmitting ? 'Creando cuenta…' : 'Crear cuenta'}
      </button>
    </form>
  )
}