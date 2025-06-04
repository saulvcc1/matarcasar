const originalNombres = ["Saúl", "Mariana", "Batres", "Litzy", "Alejandro", "Yajaira", "Karla", "Alejandro", "Rashad", "Daniela","Changuillo","Stripper"];
let nombres = [];
let index = 0;

let usedActions = {
  "Casar 💍": false,
  "Matar 💀": false,
  "Coger 🔥": false
};

let resultados = [];

const questionBox = document.getElementById("questionBox");
const questionText = document.getElementById("questionText");
const optionsDiv = document.getElementById("options");
const endScreen = document.getElementById("endScreen");
const finalScore = document.getElementById("finalScore");

// Crear botón de reinicio
const restartBtn = document.createElement("button");
restartBtn.textContent = "🔁 Volver a jugar";
restartBtn.style.marginTop = "20px";
restartBtn.style.padding = "10px 20px";
restartBtn.style.fontSize = "16px";
restartBtn.style.backgroundColor = "#6a0572";
restartBtn.style.color = "white";
restartBtn.style.border = "none";
restartBtn.style.borderRadius = "8px";
restartBtn.style.cursor = "pointer";
restartBtn.onclick = reiniciarJuego;

endScreen.appendChild(restartBtn);

function barajar(array) {
  return array.sort(() => Math.random() - 0.5);
}

function iniciarJuego() {
  nombres = barajar([...originalNombres]);
  index = 0;
  resultados = [];
  usedActions = {
    "Casar 💍": false,
    "Matar 💀": false,
    "Coger 🔥": false
  };
  endScreen.style.display = "none";
  questionBox.style.display = "block";
  mostrarPregunta();
}

function mostrarPregunta() {
  if (index >= nombres.length || Object.values(usedActions).every(val => val)) {
    mostrarFinal();
    return;
  }

  const nombreActual = nombres[index];
  questionText.textContent = `¿Qué harías con ${nombreActual}?`;

  optionsDiv.innerHTML = "";

  Object.keys(usedActions).forEach(accion => {
    const btn = document.createElement("button");
    btn.textContent = accion;
    btn.className = "option-button";

    if (usedActions[accion]) {
      btn.disabled = true;
      btn.style.opacity = 0.5;
      btn.style.cursor = "not-allowed";
    }

    btn.onclick = () => {
      resultados.push(`${accion} a ${nombreActual}`);
      usedActions[accion] = true;
      index++;
      mostrarPregunta();
    };

    optionsDiv.appendChild(btn);
  });
}

function mostrarFinal() {
  questionBox.style.display = "none";
  endScreen.style.display = "block";
  finalScore.innerHTML = resultados.map(r => `<p>${r}</p>`).join("");
}

function reiniciarJuego() {
  iniciarJuego();
}

// Inicia el juego por primera vez
iniciarJuego();
