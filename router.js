import Swal from 'sweetalert2';
import { isAuthenticated } from './src/views/auth.js';

const routes = {
  '#login': './src/views/login.html',
  '#register': './src/views/register.html',
  '#dashboard': './src/views/dashboard.html',
  '#profile': './src/views/profile.html', // NUEVA RUTA
};

export async function router() {
  const path = window.location.hash || '#login';
  const view = routes[path];

  // Control de autenticación
  if ((path === '#dashboard' || path === '#profile') && !isAuthenticated()) {
    window.location.hash = '#login';
    return;
  }

  // Si no existe la vista, redirigir
  if (!view) {
    window.location.hash = '#login';
    return;
  }

  try {
    const res = await fetch(view);
    const html = await res.text();
    const app = document.getElementById('app');
    app.innerHTML = html;

    // Ejecuta scripts embebidos
    
    const scripts = app.querySelectorAll('script');
    scripts.forEach((script) => {
      const newScript = document.createElement('script');
      newScript.textContent = script.textContent;
      document.body.appendChild(newScript);
      script.remove();
    });

  } catch (err) {
    console.error('Error cargando vista:', err);
    document.getElementById('app').innerHTML = '<h2>Error al cargar la vista.</h2>';
  }
}