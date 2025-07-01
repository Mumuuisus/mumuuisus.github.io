import tarotMeanings from './tarotMeanings.js';

const cardContainer = document.getElementById('card-container');
const submitButton = document.getElementById('submitButton');
const predictionBox = document.getElementById('prediction-box');

const cardNames = Object.keys(tarotMeanings);

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
  "The World": "RWS_Tarot_21_World.jpg"
};

function getCardImage(cardName) {
  return "imagescards/" + (cardNameToImage[cardName] || "default.jpg");
}

let selectedCards = [];
let cardElements = [];

function createCardElement(cardName) {
  const card = document.createElement('div');
  card.classList.add('card');
  
  const img = document.createElement('img');
  img.src = getCardImage(cardName);
  img.alt = cardName;
  card.appendChild(img);
  
  card.addEventListener('click', () => {
    if (card.classList.contains('selected')) {
      // เลิกเลือก
      card.classList.remove('selected');
      selectedCards = selectedCards.filter(name => name !== cardName);
    } else {
      if (selectedCards.length >= 3) {
        alert('เลือกได้แค่ 3 ใบเท่านั้น');
        return;
      }
      card.classList.add('selected');
      selectedCards.push(cardName);
    }
    updateSubmitButton();
  });
  
  return card;
}

function renderAllCards() {
  cardContainer.innerHTML = '';
  selectedCards = [];
  cardElements = [];
  cardNames.forEach(cardName => {
    const cardElem = createCardElement(cardName);
    cardContainer.appendChild(cardElem);
    cardElements.push(cardElem);
  });
  updateSubmitButton();
}

function updateSubmitButton() {
  submitButton.disabled = selectedCards.length !== 3;
}

function generatePrediction() {
  let result = '';
  selectedCards.forEach(cardName => {
    // สุ่มเปิดหัวหรือตัวคว่ำ
    const orientation = Math.random() < 0.5 ? 'upright' : 'reversed';
    const meanings = tarotMeanings[cardName][orientation];
    result += `ไพ่ ${cardName} (${orientation}):\n`;
    result += `- ชะตาชีวิต: ${meanings.destiny}\n`;
    result += `- ความรัก: ${meanings.love}\n`;
    result += `- การงาน: ${meanings.career}\n`;
    result += `- การเงิน: ${meanings.finance}\n`;
    result += `- สุขภาพ: ${meanings.health}\n`;
    result += `- ภาพรวม: ${meanings.general}\n\n`;
  });
  predictionBox.textContent = result;
}

// เริ่มต้นแสดงไพ่ทั้ง 22 ใบให้เลือก
renderAllCards();

submitButton.addEventListener('click', () => {
  if (selectedCards.length !== 3) {
    alert('กรุณาเลือกไพ่ 3 ใบก่อนกดทำนาย');
    return;
  }
  generatePrediction();
});
