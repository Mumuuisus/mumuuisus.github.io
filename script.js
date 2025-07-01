import tarotMeanings from './tarotMeanings.js';

let selectedTopic = null;
let selectedCards = [];

const majorArcana = [
  "The Fool", "The Magician", "The High Priestess", "The Empress",
  "The Emperor", "The Hierophant", "The Lovers", "The Chariot",
  "Strength", "The Hermit", "Wheel of Fortune", "Justice",
  "The Hanged Man", "Death", "Temperance", "The Devil",
  "The Tower", "The Star", "The Moon", "The Sun",
  "Judgement", "The World"
];

const cardFileNames = {
  "The Fool": "RWS_Tarot_00_Fool.jpg",
  "The Magician": "RWS_Tarot_01_Magician.jpg",
  "The High Priestess": "RWS_Tarot_02_High_Priestess.jpg",
  "The Empress": "RWS_Tarot_03_Empress.jpg",
  "The Emperor": "RWS_Tarot_04_Emperor.jpg",
  "The Hierophant": "RWS_Tarot_05_Hierophant.jpg",
  "The Lovers": "RWS_Tarot_06_Lovers.jpg",
  "The Chariot": "RWS_Tarot_07_Chariot.jpg",
  "Strength": "RWS_Tarot_08_Strength.jpg",
  "The Hermit": "RWS_Tarot_09_Hermit.jpg",
  "Wheel of Fortune": "RWS_Tarot_10_Wheel_of_Fortune.jpg",
  "Justice": "RWS_Tarot_11_Justice.jpg",
  "The Hanged Man": "RWS_Tarot_12_Hanged_Man.jpg",
  "Death": "RWS_Tarot_13_Death.jpg",
  "Temperance": "RWS_Tarot_14_Temperance.jpg",
  "The Devil": "RWS_Tarot_15_Devil.jpg",
  "The Tower": "RWS_Tarot_16_Tower.jpg",
  "The Star": "RWS_Tarot_17_Star.jpg",
  "The Moon": "RWS_Tarot_18_Moon.jpg",
  "The Sun": "RWS_Tarot_19_Sun.jpg",
  "Judgement": "RWS_Tarot_20_Judgement.jpg",
  "The World": "RWS_Tarot_21_World.jpg"
};

// ====================== จัดการหัวข้อ ======================

document.querySelectorAll(".topic-btn").forEach(btn => {
  btn.addEventListener("click", (e) => {
    selectedTopic = e.target.dataset.topic;
    selectedCards = [];
    resetCards();
    updateButtonState();
  });
});

// ====================== สร้างไพ่ ======================

function resetCards() {
  const container = document.getElementById("card-container");
  container.innerHTML = "";
  document.getElementById("result").innerText = "";

  for (let i = 0; i < 22; i++) {
    container.appendChild(createCardElement());
  }
}

function createCardElement() {
  const card = document.createElement("div");
  card.className = "card";

  const cardInner = document.createElement("div");
  cardInner.className = "card-inner";

  const cardFront = document.createElement("div");
  cardFront.className = "card-front";

  const cardBack = document.createElement("div");
  cardBack.className = "card-back";

  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);
  card.appendChild(cardInner);

  card.dataset.revealed = "false";

  card.addEventListener("click", () => {
    if (!selectedTopic) {
      alert("กรุณาเลือกหัวข้อก่อน");
      return;
    }

    if (selectedCards.length >= 3 || card.dataset.revealed === "true") return;

    const remaining = majorArcana.filter(
      name => !selectedCards.some(c => c.name === name)
    );
    const selectedName = remaining[Math.floor(Math.random() * remaining.length)];
    const reversed = Math.random() < 0.5;

    const img = document.createElement("img");
    img.src = `imagescards/${cardFileNames[selectedName]}`;
console.log("Loading card image:", img.src);
    img.alt = selectedName;
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.borderRadius = "8px";
    if (reversed) img.style.transform = "rotate(180deg)";

    cardFront.innerHTML = "";
    cardFront.appendChild(img);
    card.classList.add("revealed");
    if (reversed) card.classList.add("reversed");
    card.dataset.revealed = "true";

    selectedCards.push({ name: selectedName, reversed });
    updateButtonState();
  });

  return card;
}

// ====================== แสดงคำทำนาย ======================

document.getElementById("submitButton").addEventListener("click", () => {
  if (selectedCards.length === 3 && selectedTopic) {
    const prediction = getPrediction(selectedCards, selectedTopic);
    displayResult(prediction);
  }
});

function getPrediction(cards, topicKey) {
  const results = cards.map(card => {
    const cardData = tarotMeanings[card.name];
    if (!cardData) return `${card.name}: ❌ ไม่มีข้อมูลไพ่ในระบบ`;

    const side = card.reversed ? "reversed" : "upright";
    const meaning = cardData[side]?.[topicKey];

    return `${card.name}${card.reversed ? " (กลับหัว)" : ""}: ${meaning || "⚠️ ไม่มีคำทำนายสำหรับหัวข้อนี้"}`;
  });

  return results.join("\n\n");
}

function displayResult(text) {
  document.getElementById("result").innerText = text;
}

function updateButtonState() {
  document.getElementById("submitButton").disabled = selectedCards.length !== 3 || !selectedTopic;
}
