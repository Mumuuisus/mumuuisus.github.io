import tarotMeanings from './tarotMeanings.js';

const cardNameToImage = {
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
  "The World": "RWS_Tarot_21_World.jpg",
};

const cardContainer = document.getElementById('card-container');
const submitButton = document.getElementById('submitButton');
const predictionBox = document.querySelector('.prediction-box');

let selectedCards = [];

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getCardImage(cardName) {
  return "imagescards/" + (cardNameToImage[cardName] || "default.jpg");
}

function shuffleArray(array) {
  for (let i = array.length -1; i > 0; i--) {
    const j = getRandomInt(i +1);
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function generateCards() {
  cardContainer.innerHTML = '';
  selectedCards = [];

  // เอาชื่อไพ่ทั้งหมดมาไว้ใน array
  const allCards = Object.keys(tarotMeanings);
  shuffleArray(allCards);

  // เอา 3 ใบแรกมาแสดง
  const cardsToShow = allCards.slice(0, 3);

  cardsToShow.forEach(cardName => {
    // สุ่มแบบ upright หรือ reversed
    const isReversed = Math.random() < 0.5;

    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');
    if (isReversed) cardDiv.classList.add('reversed');

    const cardInner = document.createElement('div');
    cardInner.classList.add('card-inner');

    const cardFront = document.createElement('div');
    cardFront.classList.add('card-front');
    const imgFront = document.createElement('img');
    imgFront.src = getCardImage(cardName);
    imgFront.alt = cardName;
    cardFront.appendChild(imgFront);

    const cardBack = document.createElement('div');
    cardBack.classList.add('card-back');
    cardBack.textContent = "ไพ่";

    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    cardDiv.appendChild(cardInner);

    cardDiv.addEventListener('click', () => {
      cardDiv.classList.toggle('revealed');
    });

    cardContainer.appendChild(cardDiv);

    selectedCards.push({
      name: cardName,
      reversed: isReversed
    });
  });

  submitButton.disabled = false;
  predictionBox.textContent = '';
}

function showPredictions() {
  if (selectedCards.length === 0) return;

  let resultText = '';

  selectedCards.forEach((card, index) => {
    const meaningSet = tarotMeanings[card.name];
    const orientation = card.reversed ? 'reversed' : 'upright';
    const meanings = meaningSet[orientation];

    resultText += `ไพ่ใบที่ ${index + 1}: ${card.name} (${orientation})\n`;
    resultText += `คำทำนายทั่วไป: ${meanings.general}\n`;
    resultText += `โชคชะตา: ${meanings.destiny}\n`;
    resultText += `ความรัก: ${meanings.love}\n`;
    resultText += `การงาน: ${meanings.career}\n`;
    resultText += `การเงิน: ${meanings.finance}\n`;
    resultText += `สุขภาพ: ${meanings.health}\n\n`;
  });

  predictionBox.textContent = resultText;
}

submitButton.addEventListener('click', () => {
  showPredictions();
  submitButton.disabled = true;
});

// เริ่มต้นแสดงไพ่ตอนโหลดเว็บ
generateCards();
