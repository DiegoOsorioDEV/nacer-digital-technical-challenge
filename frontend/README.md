# Nacer Digital — Frontend

Aplicación web desarrollada con [Next.js](https://nextjs.org/) que consume el backend NestJS para mostrar el perfil profesional de GitHub de un usuario: datos personales, métricas, contribuciones del último año y repositorios públicos.

Parte del repositorio [nacer-digital-technical-challenge](https://github.com/DiegoOsorioDEV/nacer-digital-technical-challenge).

---

## Tabla de contenidos

- [Descripción general](#descripción-general)
- [Funcionalidades](#funcionalidades)
- [Stack tecnológico](#stack-tecnológico)
- [Arquitectura](#arquitectura)
- [Requisitos previos](#requisitos-previos)
- [Instalación y ejecución](#instalación-y-ejecución)
- [Variables de entorno](#variables-de-entorno)
- [Integración con backend](#integración-con-backend)
- [Estados de la interfaz](#estados-de-la-interfaz)
- [Scripts disponibles](#scripts-disponibles)
- [Estructura del proyecto](#estructura-del-proyecto)

---

## Descripción general

La interfaz principal renderiza una **Profile Card** con la información del usuario y una sección de **repositorios públicos**, obtenidos desde el endpoint `GET /user/:username` del backend local. El fetch se ejecuta en el servidor mediante Server Components, con estados visuales de carga y error, diseño responsivo y tipado estricto alineado con el contrato del API.

---

## Funcionalidades

- Visualización del perfil de GitHub: avatar, nombre, biografía y enlace al perfil.
- Métricas del usuario: repositorios públicos, seguidores y usuarios seguidos.
- Contribuciones del último año con fallback cuando el dato no está disponible.
- Listado de repositorios con nombre, descripción, estrellas, lenguaje, indicador de fork y fecha de actualización.
- Estados de interfaz para **carga**, **error** y **lista vacía** de repositorios.
- Layout responsivo: columna única en móvil y dos columnas en escritorio (perfil sticky + repos).
- Validación en runtime de la respuesta del backend mediante type guards.
- Optimización de imágenes con `next/image` para avatares de GitHub.
- Revalidación incremental (ISR) cada 5 minutos en la petición al backend.

---

## Stack tecnológico

| Tecnología | Uso |
|---|---|
| Next.js 16 | App Router, Server Components, Suspense |
| React 19 | Renderizado de la interfaz |
| TypeScript | Tipado estático estricto |
| Tailwind CSS 4 | Estilos utilitarios y diseño responsivo |
| Fetch nativo | Consumo del backend NestJS |

---

## Arquitectura

La aplicación sigue una separación clara entre capa de datos, tipos y presentación:

```
page.tsx                    →  punto de entrada, Suspense y layout principal
ProfileCardContainer        →  Server Component async: fetch + manejo de error
ProfileView                 →  composición del layout responsivo
ProfileCard                 →  tarjeta de perfil y métricas
RepositoryList              →  grid de repositorios
lib/api/github-user.ts      →  cliente HTTP y validación de respuesta
types/github-user.ts        →  contrato TypeScript alineado con el backend
```

Flujo de la petición:

1. La página envuelve `ProfileCardContainer` en un boundary de `Suspense`.
2. El contenedor consulta `GET /user/:username` en el servidor.
3. La respuesta se valida con type guards antes de renderizar.
4. Si la petición falla, se muestra un componente de error; si es exitosa, se renderizan perfil y repositorios.

Decisiones de diseño:

- **Server Components por defecto**: sin `useEffect` ni estado de carga en cliente.
- **Patrón Result**: `{ ok: true, data } | { ok: false, error }` para un manejo explícito de errores.
- **Componentes presentacionales**: la UI no conoce la lógica de fetch.

---

## Requisitos previos

- Node.js 18+
- npm
- Backend NestJS en ejecución (puerto **3001** por defecto)

---

## Instalación y ejecución

```bash
# Instalar dependencias
npm install

# Modo desarrollo
npm run dev

# Build de producción
npm run build
npm run start
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

> Asegúrate de que el backend esté corriendo antes de abrir la aplicación. Sin el backend activo, la interfaz mostrará el estado de error correspondiente.

---

## Variables de entorno

| Variable | Requerida | Descripción |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | No | URL base del backend NestJS. Default: `http://localhost:3001` |

Ejemplo de `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

---

## Integración con backend

El frontend consume el endpoint unificado del backend:

```http
GET /user/DiegoOsorioDEV
```

Implementación del cliente (`lib/api/github-user.ts`):

```typescript
const response = await fetch(`${API_BASE_URL}/user/${username}`, {
  next: { revalidate: 300 },
});
```

Campos consumidos del API:

| Campo | Uso en la interfaz |
|---|---|
| `name`, `bio`, `avatar_url`, `html_url` | Tarjeta de perfil |
| `public_repos`, `followers`, `following` | Grid de métricas |
| `contributions_last_year` | Badge de contribuciones anuales |
| `repositories[]` | Listado de repositorios públicos |

---

## Estados de la interfaz

| Estado | Componente | Comportamiento |
|---|---|---|
| Carga | `ProfileCardSkeleton` | Skeleton animado mientras el Server Component resuelve el fetch |
| Error | `ProfileCardError` | Mensaje descriptivo si el backend no responde o la respuesta es inválida |
| Éxito | `ProfileView` | Perfil completo con métricas, contribuciones y repositorios |
| Vacío | `RepositoryList` | Mensaje cuando no hay repositorios públicos |

---

## Scripts disponibles

| Script | Descripción |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Genera el build de producción |
| `npm run start` | Ejecuta el build en modo producción |
| `npm run lint` | Ejecuta ESLint |

---

## Estructura del proyecto

```
app/
├── layout.tsx                         # Layout raíz, fuentes y metadata
├── page.tsx                           # Página principal con Suspense
└── globals.css                        # Estilos globales y Tailwind

components/profile/
├── profile-card-container.tsx         # Fetch async y orquestación
├── profile-view.tsx                   # Layout responsivo perfil + repos
├── profile-card.tsx                   # Tarjeta de perfil y métricas
├── repository-list.tsx                # Grid de repositorios
├── profile-card-skeleton.tsx          # Estado de carga
└── profile-card-error.tsx             # Estado de error

lib/api/
└── github-user.ts                     # Cliente HTTP y type guards

types/
└── github-user.ts                     # Interfaces del contrato del API
```

---

## Licencia

Proyecto privado — Nacer Digital Technical Challenge.
