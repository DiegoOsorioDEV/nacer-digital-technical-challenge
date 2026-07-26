# 🚀 Nacer Digital - Technical Challenge

Este repositorio contiene la solución al reto técnico para la posición de **Full-Stack Developer** en **Nacer Digital**.

La aplicación está desarrollada como un **monorepo** compuesto por un backend en **NestJS** y un frontend en **Next.js**, consumiendo la API pública de GitHub para mostrar información detallada de un usuario, incluyendo su perfil, métricas y repositorios públicos.

---

## 📋 Características

* 🔍 Consulta de perfiles públicos de GitHub.
* 👤 Visualización de información del usuario.
* 📊 Estadísticas principales del perfil.
* 📁 Listado de repositorios públicos.
* 🌙 Interfaz moderna con soporte para Dark Mode.
* 🏗️ Arquitectura desacoplada entre frontend y backend.
* 🔄 Backend encargado de consumir y normalizar la información de la API de GitHub.

---

## 🛠️ Tecnologías

### Backend

* NestJS
* TypeScript
* Axios (`@nestjs/axios`)
* GitHub REST API

### Frontend

* Next.js (App Router)
* React
* TypeScript
* Tailwind CSS

---

## 📂 Estructura del proyecto

```text
nacer-digital-technical-challenge/
├── backend/          # API desarrollada con NestJS
├── frontend/         # Aplicación web desarrollada con Next.js
└── README.md
```

---

## ⚙️ Requisitos

Antes de comenzar asegúrate de tener instalado:

* Node.js 20 o superior
* npm

---

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/DiegoOsorioDEV/nacer-digital-technical-challenge.git

cd nacer-digital-technical-challenge
```

---

## ▶️ Ejecutar el Backend

```bash
cd backend

npm install

npm run start:dev
```

El servidor estará disponible en:

```text
http://localhost:3000
```

### Endpoint

```http
GET /user/:username
```

Ejemplo:

```text
http://localhost:3000/user/octocat
```

> El backend tiene CORS habilitado para permitir solicitudes desde el frontend.

---

## ▶️ Ejecutar el Frontend

En otra terminal:

```bash
cd frontend

npm install

npm run dev
```

La aplicación estará disponible en:

```text
http://localhost:3002
```

> Si el puerto está ocupado, Next.js asignará uno disponible automáticamente.

---

## 🌐 API utilizada

La aplicación consume la API pública de GitHub.

https://api.github.com/users/{username}

---

## 🏗️ Arquitectura

```text
                GitHub REST API
                        │
                        ▼
               Backend (NestJS)
        Consumo y normalización de datos
                        │
                        ▼
              Frontend (Next.js)
           Renderizado de la interfaz
```

---

## 📌 Funcionalidades implementadas

### Backend

* Consumo de la API pública de GitHub.
* Endpoint REST para obtener información del usuario.
* Normalización de la respuesta.
* Manejo de errores.
* Configuración de CORS.

### Frontend

* Búsqueda de usuarios.
* Renderizado del perfil.
* Visualización de métricas.
* Listado de repositorios.
* Diseño responsive.
* Dark Mode.

---

## 📷 Capturas

Puedes agregar aquí capturas de pantalla de la aplicación una vez desplegada.

---

## 🚀 Despliegue

### Frontend

Pendiente de desplegar en Vercel.

### Backend

Pendiente de desplegar.

---

## 🔗 Enlaces

**Repositorio**

https://github.com/DiegoOsorioDEV/nacer-digital-technical-challenge

**Frontend**

*https://nacer-digital-technical-challenge.vercel.app*

**Backend**

*https://nacer-digital-technical-challenge.onrender.com*

---

## 👨‍💻 Autor

**Diego Osorio**

Desarrollador Full-Stack especializado en TypeScript, NestJS y Next.js.
