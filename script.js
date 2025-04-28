// Variables globales
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const closeBtns = document.querySelectorAll('.close');
const switchToRegister = document.getElementById('switchToRegister');
const switchToLogin = document.getElementById('switchToLogin');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

// Funciones para mostrar/ocultar modales
function showModal(modal) {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Evita el scroll cuando el modal está abierto
}

function hideModal(modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restaura el scroll
}

// Event listeners para botones de autenticación
loginBtn.addEventListener('click', () => {
    showModal(loginModal);
});

registerBtn.addEventListener('click', () => {
    showModal(registerModal);
});

// Event listeners para cerrar modales
closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        hideModal(loginModal);
        hideModal(registerModal);
    });
});

// Cerrar modal al hacer clic fuera del contenido
window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        hideModal(loginModal);
    }
    if (e.target === registerModal) {
        hideModal(registerModal);
    }
});

// Cambiar entre modales
switchToRegister.addEventListener('click', (e) => {
    e.preventDefault();
    hideModal(loginModal);
    showModal(registerModal);
});

switchToLogin.addEventListener('click', (e) => {
    e.preventDefault();
    hideModal(registerModal);
    showModal(loginModal);
});

// Manejar envío de formularios
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Inicio de sesión exitoso');
    hideModal(loginModal);
    loginForm.reset();
});

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Registro exitoso. ¡Bienvenido!');
    hideModal(registerModal);
    registerForm.reset();
});

// Botón CTA - redireccionar a competiciones
document.getElementById('ctaButton').addEventListener('click', () => {
    window.location.href = 'https://roxom.com/competitions';
});
