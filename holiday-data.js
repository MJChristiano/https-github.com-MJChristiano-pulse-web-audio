const holidayThemes = [
  'Halloween',
  'Thanksgiving',
  'Christmas',
  'New Year'
];

const halloweenFacts = [
  'Pumpkins are fruits, because they grow from a flower.',
  'Bats are the only mammals that can truly fly.',
  'Spiders are not insects; they have eight legs instead of six.',
  'The first jack-o-lanterns were made from turnips.'
];

const sillyStories = [
  'A tiny ghost tried to scare a pumpkin, but the pumpkin only giggled.',
  'A friendly bat wore a tiny hat and became the mayor of Moonlight Town.',
  'A witch lost her broom and found it giving rides to neighborhood cats.'
];

const costumeIdeas = [
  'A stargazing astronaut',
  'A friendly forest dragon',
  'A moonlight detective',
  'A time-traveling wizard',
  'A glow-in-the-dark robot'
];

const halloweenActivities = [
  'Make a silly monster mask.',
  'Tell a friendly spooky story.',
  'Decorate a pumpkin with a funny face.',
  'Have a flashlight shadow-puppet contest.',
  'Invent a new Halloween dance.'
];

const treatIdeas = [
  'Caramel apple',
  'Pumpkin-shaped cookie',
  'Warm apple cider',
  'Chocolate-covered pretzel',
  'Cinnamon popcorn'
];

function createGreeting(name, holiday) {
  return `Happy ${holiday}, ${name}! Wishing you a wonderful celebration.`;
}

function chooseRandomItem(items) {
  const randomIndex = Math.floor(Math.random() * items.length);
  return items[randomIndex];
}