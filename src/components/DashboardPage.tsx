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

  return (
    <div className="app-shell">
      <header className="app-header">
        <span className="brand">inventory-front</span>
        <div className="app-header-actions">
          <span className="user-email">{user?.email ?? '—'}</span>
          <button type="button" className="button button-ghost" onClick={logout}>
            Cerrar sesión
          </button>
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