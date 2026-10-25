import './style.css';
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;

// Check if the user already chose a theme previously, otherwise default to dark mode
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