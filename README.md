# inventory-front

Aplicación web del proyecto, desarrollada con React + TypeScript + Vite.

Es la capa de presentación del sistema distribuido. Consume el `auth-service` para login y registro, y el `inventory-service` para la API de negocio. Nunca es la autoridad de seguridad.

## Stack

```text
React
TypeScript
Vite
```

## Requisitos

* Node.js (versión compatible con Vite 8)
* npm

## Instalación

```bash
npm install
```

## Variables de entorno

Copiar `.env.example` a `.env` y ajustar los valores según el entorno.

```text
# Puerto del servidor de desarrollo de Vite
PORT=5173

# URL del auth-service (login, register)
AUTH_SERVICE_URL=http://localhost:3000

# URL del inventory-service (API de negocio)
INVENTORY_SERVICE_URL=http://localhost:8080
```

El archivo `.env` está ignorado por git y no debe commitearse.

## Scripts

```bash
npm run dev       # servidor de desarrollo
npm run build     # typecheck (tsc -b) + build de producción
npm run lint      # ESLint
npm run preview   # previsualizar el build
```

## Comandos para OpenCode

```bash
# TypeScript
node_modules\.bin\tsc.cmd -b

# ESLint
node_modules\.bin\eslint.cmd .
```

## Estructura

```text
src/
├── components/   # UI (LoginForm, RegisterForm, DashboardPage, ...)
├── config/       # configuración de entorno
├── contexts/     # estado de autenticación (Context API)
├── services/     # cliente HTTP y servicios consumidos
└── utils/        # helpers (JWT, errores)
```

## Flujo de autenticación

```text
Login Form
    ↓
Auth Service
    ↓
JWT
    ↓
Authentication State
```

Las peticiones autenticadas al `inventory-service` envían el token en el header:

```http
Authorization: Bearer <JWT>
```

## Más información

* Arquitectura general: `docs/architecture.md`
* Autenticación: `docs/authentication.md`
* AGENTS.md del módulo: `AGENTS.md`