import tarotMeanings from './tarotMeanings.js';

const cardContainer = document.getElementById('card-container');
const submitButton = document.getElementById('submitButton');
const predictionBox = document.querySelector('.prediction-box');
let selectedTopic = '';
let drawnCards = [];

const topics = ["destiny", "love", "career", "finance", "health", "general"];

document.querySelectorAll('.topic-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    selectedTopic = btn.dataset.topic;
    drawnCards = [];
    predictionBox.textContent = '';
    cardContainer.innerHTML = '';

    const cards = Object.keys(tarotMeanings);
    const selected = [];
    while (selected.length < 3) {
      const rand = Math.floor(Math.random() * cards.length);
      const name = cards[rand];
      if (!selected.includes(name)) selected.push(name);
    }

    selected.forEach(name => {
      const isReversed = Math.random() < 0.5;
      drawnCards.push({ name, reversed: isReversed });

      const card = document.createElement('div');
      card.className = `card ${isReversed ? 'reversed' : ''}`;
      card.innerHTML = `
        <div class="card-inner">
          <div class="card-back"></div>
          <div class="card-front">
            <img src="images/${name}.jpg" alt="${name}">
          </div>
        </div>
      `;
      cardContainer.appendChild(card);
    });

    submitButton.disabled = false;
  });
});

submitButton.addEventListener('click', () => {
  if (!selectedTopic || drawnCards.length === 0) return;

  let message = '';
  drawnCards.forEach((card, index) => {
    const meaning = tarotMeanings[card.name];
    const orientation = card.reversed ? 'reversed' : 'upright';
    const topicMeaning = meaning?.[orientation]?.[selectedTopic];

    message += `ไพ่ใบที่ ${index + 1}: ${card.name} (${card.reversed ? 'กลับหัว' : 'ปกติ'})\n`;
    message += topicMeaning ? `\u{1F4AC} ${topicMeaning}\n\n` : 'ไม่มีคำทำนายสำหรับไพ่ใบนี้\n\n';
  });

  predictionBox.textContent = message;
});
