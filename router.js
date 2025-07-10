import Swal from "sweetalert2";
import { isAuthenticated } from "./src/views/auth.js";

const routes = {
  "#login": "./src/views/login.html",
  "#new-user": "./src/views/new-user.html",
  "#dashboard": "./src/views/dashboard.html", // NUEVAS RUTA
  "#404": "./src/views/404.html",
  "#register": "./src/views/register.html",
};

export async function router() {
  const path = window.location.hash || "#login";
  const view = routes[path];

  // Control de autenticación
  if ((path === "#dashboard" || path === "#register") && !isAuthenticated()) {
    window.location.hash = "#login";
    return;
  }

  const user = JSON.parse(localStorage.getItem("user"));

  // Redirección para administradores a dashboard
  if (isAuthenticated() && user.rol === "admin" && path !== "#dashboard") {
    window.location.hash = "#dashboard";
    return;
  }
  // Redirección para estudiantes a registro
  if (isAuthenticated() && user.rol === "estudiante" && path !== "#register") {
    window.location.hash = "#register";
    return;
  }

  // Si no existe la vista, redirigir
  if (!view) {
    window.location.hash = "#404";
    return;
  }

  try {
    const res = await fetch(view);
    const html = await res.text();
    const app = document.getElementById("app");
    app.innerHTML = html;

    // Ejecuta scripts embebidos
    const scripts = app.querySelectorAll("script");
    scripts.forEach((script) => {
      const code = `(function(){\n${script.textContent}\n})();`;
      const newScript = document.createElement("script");
      newScript.textContent = code;
      document.body.appendChild(newScript);
      script.remove();
    });
  } catch (err) {
    console.error("Error cargando vista:", err);
    document.getElementById("app").innerHTML =
      "<h2>Error al cargar la vista.</h2>";
  }
}
