import tarotMeanings from './tarotMeanings.js';

const cardContainer = document.getElementById('card-container');
const submitButton = document.getElementById('submitButton');
const resultBox = document.getElementById('result');
const topicButtons = document.querySelectorAll('.topic-btn');

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

let selectedTopic = null;
let selectedCards = [];

function shuffleArray(array) {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

function createCard(cardName) {
  const card = document.createElement('div');
  card.classList.add('card');

  const isReversed = Math.random() < 0.5;
  card.dataset.cardName = cardName;
  card.dataset.isReversed = isReversed;

  const imageUrl = `imagescards/${cardFileNames[cardName]}`;

  card.innerHTML = `
    <div class="card-inner">
      <div class="card-back"></div>
      <div class="card-front ${isReversed ? 'reversed' : ''}">
        <img src="${imageUrl}" alt="${cardName}">
      </div>
    </div>
  `;

  card.addEventListener('click', () => {
    if (selectedCards.includes(card)) {
      card.classList.remove('selected', 'revealed');
      selectedCards = selectedCards.filter(c => c !== card);
    } else {
      if (selectedCards.length >= 3) {
        alert("คุณสามารถเลือกไพ่ได้แค่ 3 ใบเท่านั้น");
        return;
      }
      card.classList.add('selected', 'revealed');
      selectedCards.push(card);
    }

    submitButton.disabled = selectedCards.length !== 3;
    resultBox.textContent = '';
  });

  return card;
}

function displayCards() {
  cardContainer.innerHTML = '';
  selectedCards = [];
  submitButton.disabled = true;
  resultBox.textContent = '';

  const allCardNames = Object.keys(cardFileNames);
  const shuffledNames = shuffleArray(allCardNames);

  shuffledNames.forEach(name => {
    const cardEl = createCard(name);
    cardContainer.appendChild(cardEl);
  });
}

function getCardMeaning(name, isReversed, topic) {
  const cardData = tarotMeanings[name];
  if (!cardData) return 'ไม่พบคำทำนาย';
  const side = isReversed ? 'reversed' : 'upright';
  return cardData[side]?.[topic] || 'ไม่มีคำทำนายสำหรับหัวข้อนี้';
}

submitButton.addEventListener('click', () => {
  if (selectedCards.length !== 3) return;

  let text = `\n🃏 หัวข้อ "${selectedTopic}" คำทำนายของคุณ:\n\n`;
  selectedCards.forEach((card, index) => {
    const name = card.dataset.cardName;
    const isRev = card.dataset.isReversed === 'true';
    const meaning = getCardMeaning(name, isRev, selectedTopic);
    text += `ไพ่ใบที่ ${index + 1}: ${name} (${isRev ? 'หัวกลับ' : 'หัวตั้ง'})\n${meaning}\n\n`;
  });

  resultBox.textContent = text;
});

topicButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    selectedTopic = btn.dataset.topic;
    displayCards();
  });
});
