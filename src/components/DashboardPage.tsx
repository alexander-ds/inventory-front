import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

const modules = [
  { title: 'Productos', description: 'Catálogo de productos' },
  { title: 'Almacenes', description: 'Almacenes disponibles' },
  { title: 'Inventario', description: 'Stock por producto y almacén' },
  { title: 'Movimientos', description: 'Entradas, salidas y ajustes' },
  { title: 'Proveedores', description: 'Proveedores del catálogo' },
  { title: 'Categorías', description: 'Clasificación de productos' },
]

export function DashboardPage() {
  const { user, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)

  const displayName = user?.name || user?.email || '—'

  return (
    <div className="app-shell">
      <header className="app-header">
        <span className="brand">inventory-front</span>
        <div className="app-header-actions">
          <div className="user-menu">
            <button
              type="button"
              className="user-menu-button"
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span>{displayName}</span>
              <span className="user-menu-caret">▾</span>
            </button>
            {menuOpen && (
              <>
                <div className="user-menu-backdrop" onClick={() => setMenuOpen(false)} />
                <div className="user-menu-panel" role="menu">
                  <div className="user-menu-email">{user?.email ?? '—'}</div>
                  <button
                    type="button"
                    className="button button-ghost user-menu-logout"
                    onClick={() => {
                      setMenuOpen(false)
                      logout()
                    }}
                  >
                    Cerrar sesión
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="app-main">
        <section className="welcome">
          <h1>Panel de inventario</h1>
          <p>
            La sesión está activa. Los módulos de negocio se habilitarán cuando
            inventory-service exponga su API.
          </p>
        </section>

        <section className="module-grid" aria-label="Módulos de inventario">
          {modules.map((module) => (
            <article key={module.title} className="module-card">
              <h2>{module.title}</h2>
              <p>{module.description}</p>
              <span className="badge">Próximamente</span>
            </article>
          ))}
        </section>
      </main>
    </div>
  )
}