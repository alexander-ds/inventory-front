# EjercicioIA - inventory-front

Aplicación web del sistema de inventario desarrollada en React.

Es el repositorio del frontend del proyecto: responsable de la interfaz de usuario, la navegación, los formularios, el login/logout, el estado de sesión, la protección de rutas (a nivel de UX) y el consumo de las APIs. El frontend nunca es la autoridad de seguridad.

## Repositorios

| Proyecto | Descripción | Repositorio |
|---|---|---|
| `EjercicioIA-inventario` | Repositorio principal: documentación, scripts SQL y orquestación del proyecto | https://github.com/alexander-ds/EjercicioIA-inventario |
| `auth-service` | Microservicio de autenticación (Node.js): login, users, roles, permisos y generación de JWT | https://github.com/alexander-ds/auth-service |
| `inventory-service` | API principal (Spring Boot): lógica de negocio, inventario, autorización y validación del JWT | https://github.com/alexander-ds/inventory-service |
| `inventory-front` | Aplicación web (React): interfaz de usuario, login/logout y consumo de APIs | https://github.com/alexander-ds/inventory-front |

## Estructura del repositorio

```text
├── src/          # Código fuente de la aplicación
├── .env.example  # Variables de entorno de ejemplo
├── package.json  # Dependencias y scripts
└── AGENTS.md     # Estándares y convenciones para OpenCode
```

Las variables de entorno requeridas (`AUTH_SERVICE_URL` e `INVENTORY_SERVICE_URL`) se configuran en `.env`, copiando `.env.example`.

## Credenciales de ejemplo

Clave de los usuarios de desarrollo: `123456`

| Usuario | Rol |
|---|---|
| `admin@inventory.local` | ADMIN |
| `seller@inventory.local` | SELLER |
| `ALX@email.com` | SELLER |
| `test@email.com` | CLIENT |

## Flujo de login

```text
Login Form
    ↓
Auth Service
    ↓
JWT
    ↓
Authentication State
```

## Documentación

* `../docs/architecture.md` — arquitectura general.
* `../docs/authentication.md` — flujo de autenticación y JWT.
* `../docs/api-contract.md` — contratos de los endpoints.
* `../docs/decisions/` — ADRs (decisiones de arquitectura).

## Estándares

Antes de trabajar en el código, leer `AGENTS.md` de la raíz y el `AGENTS.md` de este módulo.