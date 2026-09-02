# AGENTS.md — inventory-front

## Propósito

Aplicación web desarrollada con React.

## Responsabilidades

* UI.
* Navegación.
* Formularios.
* Estado.
* Login.
* Logout.
* Consumo de APIs.
* Protección de rutas.
* UX relacionada con roles.

## No responsabilidades

El frontend no es responsable de:

* Validar passwords contra PostgreSQL.
* Firmar JWT.
* Validar seguridad del inventory-service.
* Autorizar operaciones de negocio.

## Login

Flujo:

```text
Login Form
    ↓
Auth Service
    ↓
JWT
    ↓
Authentication State
```

## API Client

El manejo de JWT debe centralizarse.

Preferir:

```text
API Client
   ↓
Authorization Header
   ↓
inventory-service
```

No repetir manualmente esta lógica en cada componente.

## JWT

Las peticiones autenticadas utilizan:

```http
Authorization: Bearer <JWT>
```

No colocar JWT en URLs.

## Estado

Utilizar la solución existente del proyecto.

Antes de instalar una librería revisar si ya existe:

* Context API.
* Zustand.
* Redux.
* Otro mecanismo.

## Rutas protegidas

Conceptualmente:

```text
Route
 ├── authenticated → render
 └── unauthenticated → login
```

Esto es protección de UX, no seguridad.

## Roles futuros

Cuando existan roles:

```text
JWT
 ↓
Auth State
 ↓
Role
 ↓
UI
```

Ejemplo:

```text
ADMIN → mostrar administración
USER  → ocultar administración
```

Pero:

```text
Ocultar botón ≠ autorización
```

El inventory-service debe comprobar el rol.

## 401

Si el inventory-service devuelve:

```text
401 Unauthorized
```

el frontend debe manejar la sesión apropiadamente.

## 403

Si devuelve:

```text
403 Forbidden
```

el usuario está autenticado pero no tiene permisos.

No realizar logout automáticamente ante todo `403`.

## Seguridad

Nunca incluir en frontend:

```text
JWT_SECRET
DATABASE_PASSWORD
PRIVATE_KEYS
SERVICE_SECRETS
```

Todo lo que llega al bundle puede considerarse público.

## Logs

No hacer:

```javascript
console.log(token)
```

ni registrar passwords.

## Testing

Probar:

* Login.
* Logout.
* Login inválido.
* Ruta privada.
* Token expirado.
* 401.
* 403.
* Roles cuando estén implementados.

## OpenCode

Antes de modificar:

1. Leer `docs/authentication.md`.
2. Leer `docs/api-contract.md`.
3. Inspeccionar cliente HTTP existente.
4. Inspeccionar manejo actual de sesión.
5. Reutilizar infraestructura existente.
6. No agregar dependencias innecesarias.
