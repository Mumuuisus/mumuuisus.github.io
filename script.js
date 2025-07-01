import tarotMeanings from './tarotMeanings.js';

const cardContainer = document.getElementById('card-container');
const submitButton = document.getElementById('submitButton');
const resultBox = document.getElementById('result');
const topicButtons = document.querySelectorAll('.topic-btn');

let selectedTopic = null;
let selectedCards = [];

const tarotCards = [
  "The Fool", "The Magician", "The High Priestess", "The Empress", "The Emperor",
  "The Hierophant", "The Lovers", "The Chariot", "Strength", "The Hermit",
  "Wheel of Fortune", "Justice", "The Hanged Man", "Death", "Temperance",
  "The Devil", "The Tower", "The Star", "The Moon", "The Sun", "Judgement", "The World"
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

function shuffle(array) {
  return array.map(value => ({ value, sort: Math.random() }))
              .sort((a, b) => a.sort - b.sort)
              .map(({ value }) => value);
}

function renderCards() {
  cardContainer.innerHTML = '';
  selectedCards = [];
  submitButton.disabled = true;
  resultBox.innerHTML = '';

  const shuffled = shuffle(tarotCards);

  shuffled.forEach(cardName => {
    const isReversed = Math.random() < 0.5;
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.name = cardName;
    card.dataset.reversed = isReversed;

    if (isReversed) card.classList.add('reversed');

    const cardInner = document.createElement('div');
    cardInner.classList.add('card-inner');

    const cardBack = document.createElement('div');
    cardBack.classList.add('card-back');

    const cardFront = document.createElement('div');
    cardFront.classList.add('card-front');

    const img = document.createElement('img');
    img.src = `imagescards/${cardFileNames[cardName]}`;
    img.alt = cardName;
    cardFront.appendChild(img);

    cardInner.appendChild(cardBack);
    cardInner.appendChild(cardFront);
    card.appendChild(cardInner);

    card.addEventListener('click', () => {
      if (selectedCards.length >= 3 || card.classList.contains('revealed')) return;

      card.classList.add('revealed');
      selectedCards.push({ name: card.dataset.name, reversed: card.dataset.reversed === 'true' });

      if (selectedCards.length === 3) {
        submitButton.disabled = false;
      }
    });

    cardContainer.appendChild(card);
  });
}

// เลือกหัวข้อเพื่อแสดงไพ่
topicButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    selectedTopic = btn.dataset.topic;
    renderCards();
  });
});

// แสดงคำทำนาย
submitButton.addEventListener('click', () => {
  let result = `🔮 หัวข้อ: ${selectedTopic.toUpperCase()}\n\n`;

  selectedCards.forEach((card, index) => {
    const meaning = tarotMeanings[card.name];
    const orientation = card.reversed ? "กลับหัว" : "ปกติ";
    const text = card.reversed ? meaning.reversed : meaning.upright;

    result += `ไพ่ใบที่ ${index + 1}: ${card.name} (${orientation})\n${text}\n\n`;
  });

  resultBox.textContent = result;
});
