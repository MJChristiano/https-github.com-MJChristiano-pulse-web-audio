const leafLayer = document.querySelector('.leaf-layer');
const leafColors = ['#c9571d', '#e86f2d', '#d99a2b', '#8f3f25'];

for (let index = 0; index < 18; index += 1) {
  const leaf = document.createElement('span');
  leaf.className = 'leaf';
  leaf.style.setProperty('--left', `${Math.random() * 100}%`);
  leaf.style.setProperty('--size', `${12 + Math.random() * 14}px`);
  leaf.style.setProperty('--duration', `${8 + Math.random() * 8}s`);
  leaf.style.setProperty('--delay', `${Math.random() * -12}s`);
  leaf.style.setProperty('--sway', `${-80 + Math.random() * 160}px`);
  leaf.style.setProperty(
    '--leaf-color',
    leafColors[Math.floor(Math.random() * leafColors.length)]
  );
  leafLayer.appendChild(leaf);
}

const ghostLayer = document.querySelector('.ghost-layer');
const bagColors = ['#e86f2d', '#167d80', '#d99a2b', '#8f3f25'];
const ghostColors = ['#ffd8a8', '#b9e7e5', '#ead8ff', '#fff7e8'];

for (let index = 0; index < 4; index += 1) {
  const ghost = document.createElement('span');
  const bag = document.createElement('span');

  ghost.className = 'ghost';
  bag.className = 'ghost-bag';
  ghost.style.setProperty('--ghost-size', `${34 + Math.random() * 12}px`);
  ghost.style.setProperty('--bottom', `${8 + Math.random() * 18}px`);
  ghost.style.setProperty('--ghost-duration', `${18 + Math.random() * 12}s`);
  ghost.style.setProperty('--ghost-delay', `${Math.random() * -20}s`);
  ghost.style.setProperty(
    '--ghost-color',
    ghostColors[Math.floor(Math.random() * ghostColors.length)]
  );
  bag.style.setProperty(
    '--bag-color',
    bagColors[Math.floor(Math.random() * bagColors.length)]
  );

  ghost.appendChild(bag);
  ghostLayer.appendChild(ghost);
}