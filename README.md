# Web Noticias (PHP + Vue + Tiptap + Firebase)

Proyecto base para construir un sitio tipo diario con:

- **Frontend**: Vue 3 + Vite
- **Editor**: Tiptap
- **Backend API**: PHP 8.2+
- **Base de datos**: Firebase Firestore
- **Storage (opcional)**: Firebase Storage para imágenes

## 1) Estado actual

Se inicializó la estructura del proyecto con:

- Carpeta `backend/` para API en PHP.
- Carpeta `frontend/` para app Vue.
- Estructura de controladores/servicios en backend.
- Estructura de vistas/router/servicios en frontend.
- Endpoints API iniciales (health check y placeholder de noticias).
- Configuraciones de ejemplo (`.env.example`) para backend y frontend.

## 2) Estructura del proyecto

```txt
web-noticias/
├── backend/
│   ├── public/
│   │   └── index.php
│   ├── src/
│   │   ├── Controllers/
│   │   │   └── NewsController.php
│   │   └── Services/
│   │       └── FirebaseService.php
│   ├── .env.example
│   └── composer.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── router/
│   │   ├── services/
│   │   ├── stores/
│   │   ├── views/
│   │   ├── App.vue
│   │   └── main.js
│   ├── .env.example
│   ├── index.html
│   └── package.json
└── README.md
```

## 3) Requisitos

- PHP 8.2+
- Composer
- Node.js 20+
- npm 10+
- Proyecto de Firebase con Firestore habilitado

## 4) Tutorial rápido: descargar e iniciar en local

### Opción A: clonar desde GitHub

```bash
git clone https://github.com/TU_USUARIO/TU_REPO.git
cd TU_REPO
```

### Opción B: descargar ZIP

1. En GitHub, abrir el repositorio.
2. Clic en **Code** → **Download ZIP**.
3. Descomprimir el archivo.
4. Abrir una terminal dentro de la carpeta descomprimida.

### Instalar dependencias (primera vez)

```bash
# Backend
cd backend
composer install

# Frontend
cd ../frontend
npm install
```

### Configurar variables de entorno

```bash
# Backend
cd ../backend
cp .env.example .env

# Frontend
cd ../frontend
cp .env.example .env
```

Luego completa los valores de Firebase en ambos archivos `.env`.

### Levantar el proyecto

En una terminal (backend):

```bash
cd backend
php -S localhost:8000 -t public
```

En otra terminal (frontend):

```bash
cd frontend
npm run dev
```

### URLs de prueba

- Frontend: `http://localhost:5173`
- API health: `http://localhost:8000/api/health`
- API news: `http://localhost:8000/api/news`

## 5) Configuración de Firebase

1. Crear un proyecto en Firebase.
2. Habilitar Firestore.
3. (Opcional) habilitar Storage y Authentication.
4. Generar clave de cuenta de servicio para backend y guardarla en:
   `backend/keys/firebase-service-account.json`
5. Copiar variables de entorno según secciones siguientes.

## 6) Configuración de entorno

### Backend

```bash
cd backend
cp .env.example .env
```

Editar `backend/.env`:

```env
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

FIREBASE_PROJECT_ID=tu-project-id
FIREBASE_CREDENTIALS=keys/firebase-service-account.json
```

### Frontend

```bash
cd frontend
cp .env.example .env
```

Editar `frontend/.env`:

```env
VITE_API_URL=http://localhost:8000/api

VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

## 7) Instalación de dependencias

### Backend

```bash
cd backend
composer install
```

### Frontend

```bash
cd frontend
npm install
```

## 8) Ejecutar en desarrollo

### Levantar backend

```bash
cd backend
php -S localhost:8000 -t public
```

### Levantar frontend

```bash
cd frontend
npm run dev
```

## 9) Endpoints iniciales

- `GET /api/health` → Estado de API.
- `GET /api/news` → Placeholder de listado de noticias.

## 10) Próximos pasos sugeridos

1. Integrar SDK Admin de Firebase en `FirebaseService`.
2. Implementar CRUD real en `NewsController`:
   - `GET /api/news`
   - `GET /api/news/{id}`
   - `POST /api/news`
   - `PUT /api/news/{id}`
   - `DELETE /api/news/{id}`
3. Crear panel admin en Vue.
4. Integrar Tiptap en `NewsEditor.vue`.
5. Configurar reglas de seguridad de Firestore y auth para editores.

## 11) Modelo recomendado de noticia (Firestore)

Colección: `news`

```json
{
  "title": "string",
  "slug": "string",
  "summary": "string",
  "content": { "type": "doc", "content": [] },
  "coverImage": "url",
  "author": "string",
  "tags": ["politica", "economia"],
  "status": "draft|published",
  "publishedAt": null,
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

---

Si quieres, en el siguiente paso te genero el CRUD completo conectado a Firestore y el editor Tiptap funcional en el panel de administración.
