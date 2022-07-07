const h1 = document.querySelector("#title");
localStorage.setItem("name", "Manish");
const name = localStorage.getItem("name");

h1.textContent = name ? `Welcome ${name}` : `No one to welcome!!`;