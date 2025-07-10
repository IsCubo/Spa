# SPA New (spanew)

SPA New es una aplicación web de página única (Single Page Application) para la gestión de cursos y usuarios, desarrollada con JavaScript, Vite y SweetAlert2. Permite registro, login, gestión de cursos y aplicación a cursos, diferenciando entre roles de administrador y estudiante.

## Características principales
- Registro y login de usuarios (admin y estudiante)
- Gestión de cursos (crear, listar, eliminar)
- Aplicación a cursos por parte de estudiantes
- Control de autenticación y rutas protegidas
- Alertas y notificaciones con SweetAlert2
- SPA con rutas dinámicas y carga de vistas HTML

## Requisitos previos
- Node.js (v16 o superior recomendado)
- npm

## Instalación y uso
1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/IsCubo/Spa.git
   cd SPANEW
   ```
2. **Instala dependencias:**
   ```bash
   npm install
   ```
3. **Inicia el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   El proyecto usará Vite y estará disponible normalmente en `http://localhost:5173`.

4. **(Opcional) Servidor JSON para datos:**
   Si usas `json-server` para simular una API REST:
   ```bash
   npm install -g json-server
   json-server --watch db.json --port 3000
   ```
   Esto expondrá los endpoints `/users` y `/courses` en `http://localhost:3000`.

## Estructura del proyecto
```
SPANEW/
├── index.html              # HTML principal, punto de entrada SPA
├── package.json            # Configuración y scripts npm
├── router.js               # Lógica de rutas SPA
├── db.json                 # Base de datos simulada para json-server
├── public/
│   └── vite.svg            # Icono
├── src/
│   ├── main.js             # Inicialización de la app
│   ├── style.css           # Estilos globales
│   └── views/
│       ├── auth.js         # Funciones de autenticación
│       ├── dashboard.html  # Vista de dashboard (admin)
│       ├── login.html      # Vista de login
│       ├── register.html   # Vista de registro y aplicación a cursos
|       ├── new-user.html   # Vista de creacion de nuevo usuario
|       ├── 404.html        # Vista not-found
```

## Documentación de rutas
- `#login`      → Login de usuario
- `#register`   → Registro y aplicación a cursos (estudiante)
- `#dashboard`  → Gestión de cursos (admin)
- `#new-user`    → Registro de un nuevo usuario
- `#404`        → Página no encontrada

## Notas técnicas
- El router carga vistas HTML dinámicamente y ejecuta scripts embebidos de forma aislada.
- SweetAlert2 se importa globalmente desde CDN en `index.html`.
- El backend simulado usa `json-server` y el archivo `db.json`.
- El proyecto está configurado como módulo ES (`type: module`).
