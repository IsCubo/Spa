import Swal from 'sweetalert2';

export function isAuthenticated() {
  return localStorage.getItem('auth') === 'true';
}