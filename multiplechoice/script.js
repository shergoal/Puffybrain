const questions = [
  {
    q: "What is the primary purpose of a 'router' in a home network?",
    options: [
      "To connect all wired devices into a single network.",
      "To create a wireless Wi-Fi signal for devices.",
      "To forward data between your home network and the internet.",
      "To protect the network from viruses and unauthorized access."
    ],
    correct: 2
  },
  {
    q: "Which network device is used to amplify a Wi-Fi signal to extend coverage?",
    options: [
      "A Network Switch",
      "A Modem",
      "A Wi-Fi Repeater/Extender",
      "A Hub"
    ],
    correct: 2
  },
  {
    q: "What does the acronym 'LAN' commonly stand for?",
    options: [
      "Long-Area Network",
      "Local Access Node",
      "Linked Application Network",
      "Local Area Network"
    ],
    correct: 3
  }
];

let current = 0;
let score = 0;

loadQuestion();

function loadQuestion() {
  const question = questions[current];

  document.getElementById("question-text").textContent = question.q;
  document.getElementById("counter").textContent = `Question ${current + 1} of ${questions.length}`;

  let html = "";
  question.options.forEach((opt, i) => {
    html += `<button class="option" data-index="${i}">${opt}</button>`;
  });
  document.getElementById("options-container").innerHTML = html;

  attachEvents();
}

function attachEvents() {
  const buttons = document.querySelectorAll(".option");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.disabled = true);

      const selectedIndex = parseInt(btn.dataset.index);
      const correctIndex = questions[current].correct;

      if (selectedIndex === correctIndex) {
        btn.classList.add("correct");
        score++;
      } else {
        btn.classList.add("wrong");
        buttons[correctIndex].classList.add("correct");
      }

      setTimeout(() => {
    current++;
    if (current < questions.length) {
      loadQuestion();
    } else {
   
      localStorage.setItem("score", score);

      window.location.href = "result.html";
    }
}, 1000);
    });
  });
}
