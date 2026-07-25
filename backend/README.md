# Nacer Digital — Backend

API REST desarrollada con [NestJS](https://nestjs.com/) que actúa como capa intermedia entre un frontend (Next.js) y la API pública de GitHub. Expone un endpoint unificado para consultar el perfil de un usuario, sus repositorios públicos y sus contribuciones del último año.

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
- [API](#api)
- [Integración con frontend](#integración-con-frontend)
- [Scripts disponibles](#scripts-disponibles)
- [Estructura del proyecto](#estructura-del-proyecto)

---

## Descripción general

Este backend consulta la API oficial de GitHub y devuelve una respuesta JSON normalizada, lista para ser consumida por una aplicación frontend en otro puerto o dominio. El servicio abstrae las llamadas a GitHub REST y GraphQL, aplica mapeo de datos, manejo de errores y habilita CORS para integración cross-origin.

---

## Funcionalidades

- Consulta de perfil de usuario de GitHub por `username`.
- Obtención de repositorios públicos ordenados por fecha de actualización.
- Cálculo de contribuciones del último año mediante GitHub GraphQL.
- Respuesta JSON filtrada con únicamente los campos necesarios para el frontend.
- Manejo de errores estructurado (`404` cuando el usuario no existe).
- Degradación controlada: si las contribuciones no están disponibles, el endpoint sigue respondiendo con `contributions_last_year: null`.
- CORS habilitado para consumo desde Next.js u otro cliente web.

---

## Stack tecnológico

| Tecnología | Uso |
|---|---|
| NestJS 11 | Framework backend |
| TypeScript | Tipado estático |
| `@nestjs/axios` | Cliente HTTP para GitHub REST |
| `@nestjs/config` | Gestión de variables de entorno |
| GitHub REST API | Perfil y repositorios |
| GitHub GraphQL API | Contribuciones del último año |

---

## Arquitectura

El módulo `user` sigue una separación clara de responsabilidades:

```
Controller  →  expone el endpoint HTTP
Service     →  orquesta llamadas a GitHub, mapea DTOs y maneja errores
DTOs        →  contrato de respuesta hacia el frontend
Interfaces  →  tipado de respuestas externas de GitHub
```

Flujo de la petición:

1. El cliente consume `GET /user/:username`.
2. El servicio consulta el perfil del usuario en GitHub REST.
3. En paralelo, obtiene repositorios (REST) y contribuciones (GraphQL).
4. La respuesta se normaliza y se devuelve al frontend.

---

## Requisitos previos

- Node.js 18+
- npm
- (Recomendado) Token de acceso personal de GitHub para consultas GraphQL estables

---

## Instalación y ejecución

```bash
# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.example .env

# Modo desarrollo (watch)
npm run start:dev

# Modo producción
npm run build
npm run start:prod
```

Por defecto, la aplicación escucha en el puerto **3001**. Puede modificarse con la variable `PORT`.

---

## Variables de entorno

| Variable | Requerida | Descripción |
|---|---|---|
| `PORT` | No | Puerto del servidor. Default: `3001` |
| `GITHUB_TOKEN` | No | Token de GitHub para aumentar rate limits y obtener contribuciones de forma confiable |

Ejemplo de `.env`:

```env
PORT=3001
GITHUB_TOKEN=ghp_your_token_here
```

> Sin `GITHUB_TOKEN`, el endpoint funciona para perfil y repositorios, pero `contributions_last_year` puede devolver `null` por límites de la API de GitHub.

---

## API

### Obtener usuario de GitHub

```http
GET /user/:username
```

#### Respuesta exitosa — `200 OK`

```json
{
  "name": "Diego Osorio",
  "bio": "Software Engineer...",
  "public_repos": 5,
  "followers": 2,
  "following": 3,
  "avatar_url": "https://avatars.githubusercontent.com/u/115199969?v=4",
  "html_url": "https://github.com/DiegoOsorioDEV",
  "contributions_last_year": 100,
  "repositories": [
    {
      "name": "nacer-digital-technical-challenge",
      "description": null,
      "html_url": "https://github.com/DiegoOsorioDEV/nacer-digital-technical-challenge",
      "stargazers_count": 0,
      "language": "TypeScript",
      "fork": false,
      "updated_at": "2026-07-25T22:16:48Z"
    }
  ]
}
```

#### Usuario no encontrado — `404 Not Found`

```json
{
  "statusCode": 404,
  "message": "GitHub user 'username' was not found",
  "error": "Not Found"
}
```

#### Campos de respuesta

| Campo | Tipo | Descripción |
|---|---|---|
| `name` | `string \| null` | Nombre público del usuario |
| `bio` | `string \| null` | Biografía del perfil |
| `public_repos` | `number` | Cantidad de repositorios públicos |
| `followers` | `number` | Seguidores |
| `following` | `number` | Usuarios seguidos |
| `avatar_url` | `string` | URL del avatar |
| `html_url` | `string` | URL del perfil en GitHub |
| `contributions_last_year` | `number \| null` | Contribuciones en los últimos 365 días |
| `repositories` | `array` | Listado de repositorios públicos |

---

## Integración con frontend

El backend expone CORS globalmente, por lo que puede consumirse desde un frontend Next.js u otra aplicación web en distinto origen.

Ejemplo de consumo:

```typescript
const response = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/user/DiegoOsorioDEV`,
);

const user = await response.json();
```

Variables recomendadas en el frontend:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

---

## Scripts disponibles

| Script | Descripción |
|---|---|
| `npm run start` | Inicia la aplicación |
| `npm run start:dev` | Inicia en modo desarrollo con watch |
| `npm run start:prod` | Ejecuta build de producción |
| `npm run build` | Compila el proyecto |
| `npm run lint` | Ejecuta ESLint |
| `npm run test` | Ejecuta pruebas unitarias |
| `npm run test:e2e` | Ejecuta pruebas end-to-end |

---

## Estructura del proyecto

```
src/
├── main.ts                          # Bootstrap, CORS y puerto
├── app.module.ts                    # Módulo raíz y ConfigModule
└── user/
    ├── user.module.ts
    ├── user.controller.ts
    ├── user.service.ts
    ├── dto/
    │   ├── user-response.dto.ts
    │   └── user-repository.dto.ts
    └── interfaces/
        ├── github-user-response.interface.ts
        ├── github-repository-response.interface.ts
        └── github-contributions-response.interface.ts
```

---

## Licencia

Proyecto privado — Nacer Digital Technical Challenge.
