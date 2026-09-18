const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

const quoteText = document.getElementById('quote-text');
const newQuoteBtn = document.getElementById('new-quote');
const clock = document.getElementById('clock');
const date = document.getElementById('date');
const factText = document.getElementById('fact-text');
const newFactBtn = document.getElementById('new-fact');
const characterMessage = document.getElementById('character-message');
const characterButton = document.getElementById('character-button');

let tasks = ['Find a costume', 'Decorate a pumpkin'];

const quotes = [
  'Every pumpkin has a little light inside.',
  'A friendly ghost is just a hello waiting to happen.',
  'The best Halloween adventures begin with curiosity.',
  'Even tiny bats can make a big discovery.',
  'A little mystery makes the night more magical.'
];

const facts = [
  'Pumpkins are fruits, because they grow from a flower.',
  'Bats are the only mammals that can truly fly.',
  'Spiders are not insects; they have eight legs instead of six.',
  'The first jack-o-lanterns were made from turnips.',
  'Some pumpkins can grow heavier than a small car.'
];

const booMessages = [
  'Boo Bean says hello! Let us discover something amazing.',
  'Boo Bean found a curious clue behind the pumpkin patch.',
  'Boo Bean thinks every friendly ghost needs a favorite fact.',
  'Boo Bean is ready for a silly spooky adventure.',
  'Boo Bean heard a giggle coming from the old oak tree.',
  'Boo Bean believes the best mysteries always include snacks.',
  'Boo Bean is polishing a lantern for tonight’s moonlight parade.',
  'Boo Bean wonders what secret the next falling leaf might hold.'
];

function renderList() {
  list.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');

    const text = document.createElement('span');
    text.textContent = task;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');

    deleteBtn.addEventListener('click', () => {
      tasks.splice(index, 1);
      renderList();
    });

    li.appendChild(text);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const taskText = input.value.trim();

  if (taskText !== '') {
    tasks.push(taskText);
    input.value = '';
    renderList();
  }
});

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark');
});

function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  quoteText.textContent = quotes[randomIndex];
}

newQuoteBtn.addEventListener('click', showRandomQuote);

function showRandomFact() {
  const randomIndex = Math.floor(Math.random() * facts.length);
  factText.textContent = facts[randomIndex];
}

newFactBtn.addEventListener('click', showRandomFact);

characterButton.addEventListener('click', () => {
  const availableMessages = booMessages.filter(
    (message) => message !== characterMessage.textContent
  );
  const randomIndex = Math.floor(Math.random() * availableMessages.length);
  const message = availableMessages[randomIndex];
  characterMessage.textContent = message;

  speechSynthesis.cancel();
  speechSynthesis.speak(new SpeechSynthesisUtterance(message));
});

function updateClock() {
  const now = new Date();
  const time = now.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  clock.textContent = time;
  date.textContent = now.toLocaleDateString([], {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}

renderList();
showRandomQuote();
showRandomFact();
updateClock();
setInterval(updateClock, 1000);