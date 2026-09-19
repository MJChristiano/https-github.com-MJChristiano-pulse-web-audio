const beginStory = document.getElementById('begin-story');
const revealSecret = document.getElementById('reveal-secret');
const storyReveal = document.getElementById('story-reveal');

beginStory.addEventListener('click', () => {
  document.getElementById('chapter-one').scrollIntoView({ behavior: 'smooth' });
});

revealSecret.addEventListener('click', () => {
  storyReveal.textContent = 'Its light grew brighter whenever someone shared a kindness.';
  revealSecret.textContent = 'The secret is revealed';
  revealSecret.disabled = true;
});
