const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const costumeOutput = document.getElementById('costume-output');
const costumeButton = document.getElementById('costume-button');
const activityOutput = document.getElementById('activity-output');
const activityButton = document.getElementById('activity-button');
const treatOutput = document.getElementById('treat-output');
const treatButton = document.getElementById('treat-button');
const timerOutput = document.getElementById('timer-output');
const startTimer = document.getElementById('start-timer');
const pauseTimer = document.getElementById('pause-timer');
const resetTimer = document.getElementById('reset-timer');
const recipientName = document.getElementById('recipient-name');
const holidayChoice = document.getElementById('holiday-choice');
const greetingOutput = document.getElementById('greeting-output');
const greetingButton = document.getElementById('greeting-button');
const halloweenFact = document.getElementById('halloween-fact');
const factButton = document.getElementById('fact-button');
const storyText = document.getElementById('story-text');
const storyButton = document.getElementById('story-button');
const readStoryButton = document.getElementById('read-story-button');
const pauseStoryButton = document.getElementById('pause-story-button');
const stopStoryButton = document.getElementById('stop-story-button');
const storyStatus = document.getElementById('story-status');
const halloweenCountdown = document.getElementById('halloween-countdown');

let secondsLeft = 25 * 60;
let timerId;

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark');
});

costumeButton.addEventListener('click', () => {
  revealContent(costumeOutput, chooseRandomItem(costumeIdeas));
});

activityButton.addEventListener('click', () => {
  revealContent(activityOutput, chooseRandomItem(halloweenActivities));
});

treatButton.addEventListener('click', () => {
  revealContent(treatOutput, chooseRandomItem(treatIdeas));
});

function updateTimer() {
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  timerOutput.textContent = `${minutes}:${String(seconds).padStart(2, '0')}`;
}

startTimer.addEventListener('click', () => {
  if (timerId) {
    return;
  }

  timerId = setInterval(() => {
    if (secondsLeft > 0) {
      secondsLeft -= 1;
      updateTimer();
    } else {
      clearInterval(timerId);
      timerId = null;
    }
  }, 1000);
});

pauseTimer.addEventListener('click', () => {
  clearInterval(timerId);
  timerId = null;
});

resetTimer.addEventListener('click', () => {
  clearInterval(timerId);
  timerId = null;
  secondsLeft = 25 * 60;
  updateTimer();
});

greetingButton.addEventListener('click', () => {
  const name = recipientName.value.trim();

  if (name === '') {
    greetingOutput.textContent = 'Please enter a name first.';
    return;
  }

  greetingOutput.textContent = createGreeting(name, holidayChoice.value);
});

function revealContent(element, content) {
  element.textContent = content;
  element.parentElement.classList.remove('reveal');
  void element.parentElement.offsetWidth;
  element.parentElement.classList.add('reveal');
}

factButton.addEventListener('click', () => {
  revealContent(halloweenFact, chooseRandomItem(halloweenFacts));
});

storyButton.addEventListener('click', () => {
  revealContent(storyText, chooseRandomItem(sillyStories));
});

readStoryButton.addEventListener('click', () => {
  speechSynthesis.cancel();
  const story = new SpeechSynthesisUtterance(storyText.textContent);
  story.rate = 0.9;
  speechSynthesis.speak(story);
  storyStatus.textContent = 'Narration is playing.';
});

pauseStoryButton.addEventListener('click', () => {
  speechSynthesis.pause();
  storyStatus.textContent = 'Narration is paused.';
});

stopStoryButton.addEventListener('click', () => {
  speechSynthesis.cancel();
  storyStatus.textContent = 'Narration is stopped.';
});

function updateHalloweenCountdown() {
  const now = new Date();
  let halloween = new Date(now.getFullYear(), 9, 31);

  if (halloween <= now) {
    halloween = new Date(now.getFullYear() + 1, 9, 31);
  }

  const difference = halloween - now;
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(difference / (1000 * 60 * 60)) % 24;
  const minutes = Math.floor(difference / (1000 * 60)) % 60;
  const seconds = Math.floor(difference / 1000) % 60;

  halloweenCountdown.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

updateHalloweenCountdown();
setInterval(updateHalloweenCountdown, 1000);