const nombres = ["Saúl", "Mariana", "Batres", "Litzy", "Alejandro", "Yajaira", "Karla", "Alejandro", "Rashad", "Daniela"];
let index = 0;

const usedActions = {
  "Casar 💍": false,
  "Matar 💀": false,
  "Coger 🔥": false
};

const resultados = [];

const questionBox = document.getElementById("questionBox");
const questionText = document.getElementById("questionText");
const optionsDiv = document.getElementById("options");
const endScreen = document.getElementById("endScreen");
const finalScore = document.getElementById("finalScore");

function mostrarPregunta() {
  if (index >= nombres.length || Object.values(usedActions).every(val => val)) {
    mostrarFinal();
    return;
  }

  const nombreActual = nombres[index];
  questionBox.style.display = "block";
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

mostrarPregunta();
