const body = document.body;
const modeSwitch = document.getElementById('modeSwitch');
const iconSwitch = document.getElementById('iconSwitch');
const nav = document.getElementById('nav');

function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value}; expires=${d.toUTCString()}; path=/`;
}

function toggleTheme(theme) {
  const isDark = theme === 'dark';
  body.classList.toggle('dark-mode', isDark);
  body.classList.toggle('light-mode', !isDark);
  iconSwitch.classList.toggle('bi-moon', isDark);
  iconSwitch.classList.toggle('text-white', isDark);
  iconSwitch.classList.toggle('bi-brightness-high', !isDark);
  iconSwitch.classList.toggle('text-black', !isDark);
  nav.classList.toggle('navbar-dark', isDark);
  nav.classList.toggle('bg-dark', isDark);
  nav.classList.toggle('navbar-light', !isDark);
  nav.classList.toggle('bg-light', !isDark);
}

document.addEventListener('DOMContentLoaded', () => {
  const theme = getCookie('theme') || 'light';
  toggleTheme(theme);
});

modeSwitch.addEventListener('click', () => {
  const newTheme = body.classList.contains('dark-mode') ? 'light' : 'dark';
  setCookie('theme', newTheme, 30);
  toggleTheme(newTheme);
});