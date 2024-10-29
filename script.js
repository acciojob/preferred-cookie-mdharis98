// Ensure the script runs after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Function to set a cookie
  function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/`;
  }

  // Function to get a cookie by name
  function getCookie(name) {
    const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
      const [key, value] = cookie.split('=');
      acc[key] = value;
      return acc;
    }, {});
    return cookies[name] || '';
  }

  // Function to apply saved preferences from cookies
  function applyPreferences() {
    const fontSize = getCookie('fontSize');
    const fontColor = getCookie('fontColor');

    if (fontSize) {
      document.documentElement.style.setProperty('--fontsize', `${fontSize}px`);
      document.getElementById('fontsize').value = fontSize;
    }
    if (fontColor) {
      document.documentElement.style.setProperty('--fontcolor', fontColor);
      document.getElementById('fontcolor').value = fontColor;
    }
  }

  // Event listener for form submission
  document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    const fontSize = document.getElementById('fontsize').value;
    const fontColor = document.getElementById('fontcolor').value;

    setCookie('fontSize', fontSize, 7); // Save font size in cookie for 7 days
    setCookie('fontColor', fontColor, 7); // Save font color in cookie for 7 days

    // Apply the changes immediately
    document.documentElement.style.setProperty('--fontsize', `${fontSize}px`);
    document.documentElement.style.setProperty('--fontcolor', fontColor);
  });

  // Apply preferences on page load
  applyPreferences();
});
