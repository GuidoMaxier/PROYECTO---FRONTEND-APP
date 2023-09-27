
const l = document.querySelector(".l");
const r = document.querySelector(".r");

const loginSection = document.querySelector(".login");
const registroSection = document.querySelector(".registro");

// Por defecto, se muestra la sección de login
loginSection.style.display = "block";
registroSection.style.display = "none";

// Cuando se hace clic en el botón "Ir al login", se muestra la sección de login y se oculta la sección de registro
l.addEventListener("click", () => {
  registroSection.style.display = "none";
  loginSection.style.display = "block";
});

// Cuando se hace clic en el botón "Ir al registro", se muestra la sección de registro y se oculta la sección de login
r.addEventListener("click", () => {
  loginSection.style.display = "none";
  registroSection.style.display = "block";
});