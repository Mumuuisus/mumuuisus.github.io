import tarotMeanings from './tarotMeanings.js';

const cardContainer = document.getElementById('card-container');
const submitButton = document.getElementById('submitButton');
const predictionBox = document.getElementById('result');
const topicButtons = document.querySelectorAll('.topic-btn');

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
let selectedTopic = null;

function createCardElement(cardName) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.title = cardName;

  const img = document.createElement('img');
  img.src = getCardImage(cardName);
  img.alt = cardName;
  card.appendChild(img);

  card.addEventListener('click', () => {
    if (!selectedTopic) {
      alert('กรุณาเลือกหัวข้อก่อนเลือกไพ่');
      return;
    }
    if (card.classList.contains('selected')) {
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
  cardNames.forEach(cardName => {
    const cardElem = createCardElement(cardName);
    cardContainer.appendChild(cardElem);
  });
  updateSubmitButton();
}

function updateSubmitButton() {
  submitButton.disabled = !(selectedCards.length === 3 && selectedTopic);
}

function generatePrediction() {
  let result = `หัวข้อที่เลือก: ${selectedTopic}\n\n`;
  selectedCards.forEach(cardName => {
    const orientation = Math.random() < 0.5 ? 'upright' : 'reversed';
    const meanings = tarotMeanings[cardName][orientation];
    const meaningText = meanings[selectedTopic] || 'ไม่มีคำทำนายสำหรับหัวข้อนี้';
    result += `ไพ่: ${cardName} (${orientation})\n${meaningText}\n\n`;
  });
  predictionBox.textContent = result;
}

// ตั้ง listener ให้ปุ่มหัวข้อ เลือกหัวข้อแล้วแสดงไพ่
topicButtons.forEach(button => {
  button.addEventListener('click', () => {
    selectedTopic = button.getAttribute('data-topic');
    predictionBox.textContent = ''; // ล้างคำทำนายเดิม
    selectedCards = [];
    // ล้างการเลือกไพ่เก่า
    document.querySelectorAll('.card.selected').forEach(card => card.classList.remove('selected'));
    updateSubmitButton();
    renderAllCards();
  });
});

submitButton.addEventListener('click', () => {
  if (selectedCards.length !== 3) {
    alert('กรุณาเลือกไพ่ 3 ใบก่อนกดทำนาย');
    return;
  }
  generatePrediction();
});

// เริ่มต้นยังไม่แสดงไพ่ รอเลือกหัวข้อก่อน
cardContainer.innerHTML = '<p>กรุณาเลือกหัวข้อด้านบนก่อน</p>';
