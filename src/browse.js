// --- DARK MODE LOGIC ---
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;

// Read the theme the user selected on the index page
const savedTheme = localStorage.getItem('theme') || 'dark';
root.setAttribute('data-theme', savedTheme);
updateButtonText(savedTheme);

themeToggle.addEventListener('click', () => {
  const currentTheme = root.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  root.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateButtonText(newTheme);
});

function updateButtonText(theme) {
  themeToggle.textContent = theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
}

// ... Keep your existing games array and render logic below this ...

import './style.css'; // Don't forget to import your styles!

// 1. Array of 10 placeholder games
const games = [
  { id: 1, name: "Neon Runner", desc: "Dodge obstacles at light speed.", img: "https://placehold.co/400x200/27272a/60a5fa?text=Neon+Runner" },
  { id: 2, name: "Space Invaders 2.0", desc: "Defend the QR event from aliens.", img: "https://placehold.co/400x200/27272a/60a5fa?text=Space" },
  { id: 3, name: "Memory Match", desc: "Test your focus and memory.", img: "https://placehold.co/400x200/27272a/60a5fa?text=Memory" },
  { id: 4, name: "Flappy Bean", desc: "A frustratingly fun tapping game.", img: "https://placehold.co/400x200/27272a/60a5fa?text=Flappy" },
  { id: 5, name: "Puzzle Drop", desc: "Match the falling colors.", img: "https://placehold.co/400x200/27272a/60a5fa?text=Puzzle" },
  { id: 6, name: "Rhythm Tapper", desc: "Tap to the beat of the event.", img: "https://placehold.co/400x200/27272a/60a5fa?text=Rhythm" },
  { id: 7, name: "Cyber Pong", desc: "Classic pong with a modern twist.", img: "https://placehold.co/400x200/27272a/60a5fa?text=Pong" },
  { id: 8, name: "Snake Pit", desc: "Eat the dots, don't hit the walls.", img: "https://placehold.co/400x200/27272a/60a5fa?text=Snake" },
  { id: 9, name: "Math Whiz", desc: "Solve quickly to survive.", img: "https://placehold.co/400x200/27272a/60a5fa?text=Math" },
  { id: 10, name: "Treasure Hunt", desc: "Find the hidden clues in the image.", img: "https://placehold.co/400x200/27272a/60a5fa?text=Treasure" },
  { id: 11, name: "Robot Builder", desc: "Combine Parts to build a robot!", img: "https://placehold.co/400x200/27272a/597A59?text=Merge", url: "/robotbuilder.html" }
];

const container = document.getElementById('games-container');
const searchInput = document.getElementById('search-input');

// 2. Function to generate the HTML for the cards
function renderGames(gamesToRender) {
  container.innerHTML = '';

  gamesToRender.forEach(game => {
    const card = document.createElement('a');
    
    // This tells it to use the url if it exists, otherwise use the #play- ID
    card.href = game.url ? game.url : `#play-${game.id}`; 
    card.className = 'game-card';
    
    card.innerHTML = `
      <img src="${game.img}" alt="${game.name}" class="game-image" loading="lazy" />
      <div class="game-info">
        <h3 class="game-title">${game.name}</h3>
        <p class="game-desc">${game.desc}</p>
      </div>
    `;
    
    container.appendChild(card);
  });
}

// 3. Initial render of all 10 games
renderGames(games);

// 4. Search Filter Logic
searchInput.addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase();
  
  // Filter the array based on if the name or description includes the search term
  const filteredGames = games.filter(game => {
    return game.name.toLowerCase().includes(searchTerm) || 
           game.desc.toLowerCase().includes(searchTerm);
  });
  
  // Re-render the grid with only the matching games
  renderGames(filteredGames);
});