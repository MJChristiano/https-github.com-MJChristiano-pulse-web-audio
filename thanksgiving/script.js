const gratitudeForm = document.getElementById('gratitude-form');
const gratitudeInput = document.getElementById('gratitude-input');
const gratitudeList = document.getElementById('gratitude-list');
const thoughtText = document.getElementById('thought-text');
const thoughtButton = document.getElementById('thought-button');
const gatheringCountdown = document.getElementById('gathering-countdown');

let gratitudeItems = ['Family laughter', 'A warm meal'];
let currentThought = thoughtText.textContent;

const thankfulThoughts = [
  'Small kindnesses can become big memories.',
  'A shared meal is also a shared moment.',
  'Gratitude helps us notice what is already here.',
  'The best tables have room for one more story.',
  'A simple thank-you can brighten someone\'s whole day.'
];

function renderGratitudeList() {
  gratitudeList.innerHTML = '';

  gratitudeItems.forEach((item) => {
    const listItem = document.createElement('li');
    listItem.textContent = item;
    gratitudeList.appendChild(listItem);
  });
}

gratitudeForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const item = gratitudeInput.value.trim();

  if (item !== '') {
    gratitudeItems.push(item);
    gratitudeInput.value = '';
    renderGratitudeList();
  }
});

thoughtButton.addEventListener('click', () => {
  const availableThoughts = thankfulThoughts.filter(
    (thought) => thought !== currentThought
  );
  const randomIndex = Math.floor(Math.random() * availableThoughts.length);
  currentThought = availableThoughts[randomIndex];
  thoughtText.textContent = currentThought;
});

function updateGatheringCountdown() {
  const now = new Date();
  let thanksgiving = new Date(now.getFullYear(), 10, 26);

  while (thanksgiving.getDay() !== 4 || thanksgiving <= now) {
    thanksgiving.setDate(thanksgiving.getDate() + 1);
  }

  const difference = thanksgiving - now;
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(difference / (1000 * 60 * 60)) % 24;
  const minutes = Math.floor(difference / (1000 * 60)) % 60;
  const seconds = Math.floor(difference / 1000) % 60;

  gatheringCountdown.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

renderGratitudeList();
updateGatheringCountdown();
setInterval(updateGatheringCountdown, 1000);
