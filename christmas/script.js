const snowLayer = document.querySelector('.snow-layer');
const giftOutput = document.getElementById('gift-output');
const giftButton = document.getElementById('gift-button');
const messageOutput = document.getElementById('message-output');
const messageButton = document.getElementById('message-button');
const christmasCountdown = document.getElementById('christmas-countdown');

const giftIdeas = [
	'A cozy handmade blanket',
	'A book chosen just for them',
	'A winter tea and cocoa basket',
	'A framed favorite memory',
	'A family game night box'
];

const winterMessages = [
	'Kindness is a gift anyone can give.',
	'The warmest traditions are the ones we share.',
	'A thoughtful moment can brighten a winter day.',
	'Wonder grows when we make room for one another.',
	'The best gifts are wrapped in care.'
];

let currentMessage = messageOutput.textContent;

function chooseRandomItem(items) {
	const randomIndex = Math.floor(Math.random() * items.length);
	return items[randomIndex];
}

for (let index = 0; index < 20; index += 1) {
	const snowball = document.createElement('span');
	snowball.className = 'snowball';
	snowball.style.setProperty('--left', `${Math.random() * 100}%`);
	snowball.style.setProperty('--size', `${8 + Math.random() * 12}px`);
	snowball.style.setProperty('--duration', `${8 + Math.random() * 8}s`);
	snowball.style.setProperty('--delay', `${Math.random() * -12}s`);
	snowball.style.setProperty('--sway', `${-80 + Math.random() * 160}px`);
	snowLayer.appendChild(snowball);
}

giftButton.addEventListener('click', () => {
	giftOutput.textContent = chooseRandomItem(giftIdeas);
});

messageButton.addEventListener('click', () => {
	const availableMessages = winterMessages.filter(
		(message) => message !== currentMessage
	);
	currentMessage = chooseRandomItem(availableMessages);
	messageOutput.textContent = currentMessage;
});

function updateChristmasCountdown() {
	const now = new Date();
	let christmas = new Date(now.getFullYear(), 11, 25);

	if (christmas <= now) {
		christmas = new Date(now.getFullYear() + 1, 11, 25);
	}

	const difference = christmas - now;
	const days = Math.floor(difference / (1000 * 60 * 60 * 24));
	const hours = Math.floor(difference / (1000 * 60 * 60)) % 24;
	const minutes = Math.floor(difference / (1000 * 60)) % 60;
	const seconds = Math.floor(difference / 1000) % 60;

	christmasCountdown.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

updateChristmasCountdown();
setInterval(updateChristmasCountdown, 1000);
