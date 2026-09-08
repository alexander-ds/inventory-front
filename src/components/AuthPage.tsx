import { useState } from 'react'
import { LoginForm } from './LoginForm'
import { RegisterForm } from './RegisterForm'

type AuthTab = 'login' | 'register'

export function AuthPage() {
  const [tab, setTab] = useState<AuthTab>('login')

  return (
    <main className="auth-page">
      <div className="auth-card">
        <header className="auth-header">
          <span className="brand">inventory-front</span>
          <p>Gestión de inventario</p>
        </header>

        <nav className="auth-tabs" aria-label="Autenticación">
          <button
            type="button"
            className={tab === 'login' ? 'active' : ''}
            onClick={() => setTab('login')}
          >
            Iniciar sesión
          </button>
          <button
            type="button"
            className={tab === 'register' ? 'active' : ''}
            onClick={() => setTab('register')}
          >
            Crear cuenta
          </button>
        </nav>

        {tab === 'login' ? <LoginForm /> : <RegisterForm />}
      </div>
    </main>
  )
}