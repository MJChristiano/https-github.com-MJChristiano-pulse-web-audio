const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const clearTasksButton = document.getElementById('clear-tasks');

const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const THEME_KEY = 'halloweenTheme';

const quoteText = document.getElementById('quote-text');
const newQuoteBtn = document.getElementById('new-quote');
const clock = document.getElementById('clock');
const date = document.getElementById('date');
const factText = document.getElementById('fact-text');
const newFactBtn = document.getElementById('new-fact');
const beatStatus = document.getElementById('beat-status');
const beatGrid = document.getElementById('beat-grid');
const playBeatButton = document.getElementById('play-beat');
const stopBeatButton = document.getElementById('stop-beat');
const clearBeatButton = document.getElementById('clear-beat');
const characterMessage = document.getElementById('character-message');
const characterButton = document.getElementById('character-button');

const savedTasks = localStorage.getItem('halloweenTasks');
let tasks = savedTasks ? JSON.parse(savedTasks) : ['Find a costume', 'Decorate a pumpkin'];

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
  localStorage.setItem('halloweenTasks', JSON.stringify(tasks));

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

clearTasksButton.addEventListener('click', () => {
  tasks = [];
  renderList();
});

function applyTheme(isDark) {
  body.classList.toggle('dark', isDark);
  themeToggle.textContent = isDark ? 'Light Mode' : 'Dark Mode';
  localStorage.setItem(THEME_KEY, String(isDark));
}

const savedTheme = localStorage.getItem(THEME_KEY) === 'true';
applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  applyTheme(!body.classList.contains('dark'));
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

let audioContext;
let beatTimer;
let beatStep = 0;

const soundDefinitions = {
  thump: { frequency: 110, type: 'sine' },
  bell: { frequency: 330, type: 'triangle' },
  wobble: { frequency: 165, type: 'sawtooth' },
  sparkle: { frequency: 660, type: 'sine' }
};

const beatPattern = {
  thump: [true, false, false, false, true, false, false, false],
  bell: [false, false, true, false, false, false, true, false],
  wobble: [false, true, false, false, false, true, false, false],
  sparkle: [false, false, false, true, false, false, false, true]
};

function renderBeatGrid() {
  beatGrid.innerHTML = '';

  Object.keys(beatPattern).forEach((soundName) => {
    const row = document.createElement('div');
    row.className = 'beat-row';

    const label = document.createElement('span');
    label.className = 'beat-row-label';
    label.textContent = soundName;
    row.appendChild(label);

    beatPattern[soundName].forEach((isActive, step) => {
      const cell = document.createElement('button');
      cell.className = 'beat-cell';
      cell.type = 'button';
      cell.dataset.sound = soundName;
      cell.dataset.step = step;
      cell.setAttribute('aria-label', `${soundName}, step ${step + 1}`);
      cell.setAttribute('aria-pressed', isActive);
      cell.classList.toggle('active', isActive);

      cell.addEventListener('click', () => {
        beatPattern[soundName][step] = !beatPattern[soundName][step];
        cell.classList.toggle('active', beatPattern[soundName][step]);
        cell.setAttribute('aria-pressed', beatPattern[soundName][step]);

        audioContext ??= new AudioContext();

        if (audioContext.state === 'suspended') {
          audioContext.resume();
        }

        playTone(soundName, audioContext.currentTime);
        beatStatus.textContent = `${soundName} sound, step ${step + 1}.`;
      });

      row.appendChild(cell);
    });

    beatGrid.appendChild(row);
  });
}

function playTone(soundName, startTime) {
  const { frequency, type } = soundDefinitions[soundName];
  const oscillator = audioContext.createOscillator();
  const volume = audioContext.createGain();

  oscillator.frequency.value = frequency;
  oscillator.type = type;

  volume.gain.setValueAtTime(0.1, startTime);
  volume.gain.exponentialRampToValueAtTime(0.001, startTime + 0.18);

  oscillator.connect(volume);
  volume.connect(audioContext.destination);

  oscillator.start(startTime);
  oscillator.stop(startTime + 0.18);
}

document.querySelectorAll('.sound-button').forEach((button) => {
  button.addEventListener('click', () => {
    audioContext ??= new AudioContext();

    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }

    playTone(button.dataset.sound, audioContext.currentTime);
    beatStatus.textContent = `${button.textContent} sound preview.`;
  });
});

function playBeatStep() {
  const start = audioContext.currentTime;

  Object.keys(beatPattern).forEach((soundName) => {
    if (beatPattern[soundName][beatStep]) {
      playTone(soundName, start);
    }
  });

  document.querySelectorAll('.beat-cell').forEach((cell) => {
    cell.classList.toggle('current', Number(cell.dataset.step) === beatStep);
  });

  beatStep = (beatStep + 1) % 8;
}

function stopBeat() {
  clearInterval(beatTimer);
  beatTimer = undefined;
  beatStep = 0;
  document.querySelectorAll('.beat-cell').forEach((cell) => cell.classList.remove('current'));
}

playBeatButton.addEventListener('click', () => {
  audioContext ??= new AudioContext();

  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }

  stopBeat();
  playBeatStep();
  beatTimer = setInterval(playBeatStep, 250);
  beatStatus.textContent = 'Playing your spooky beat.';
});

stopBeatButton.addEventListener('click', () => {
  stopBeat();
  beatStatus.textContent = 'Beat stopped.';
});

clearBeatButton.addEventListener('click', () => {
  stopBeat();
  Object.keys(beatPattern).forEach((soundName) => {
    beatPattern[soundName].fill(false);
  });
  renderBeatGrid();
  beatStatus.textContent = 'Your beat is clear. Choose some sounds.';
});

characterButton.addEventListener('click', () => {
  const availableMessages = booMessages.filter(
    (message) => message !== characterMessage.textContent
  );
  const randomIndex = Math.floor(Math.random() * availableMessages.length);
  const message = availableMessages[randomIndex];
  characterMessage.textContent = message;

  if ('speechSynthesis' in window) {
    speechSynthesis.cancel();
    speechSynthesis.speak(new SpeechSynthesisUtterance(message));
  }
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
renderBeatGrid();
updateClock();
setInterval(updateClock, 1000);