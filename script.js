document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const fontsizeInput = document.getElementById('fontsize');
    const fontcolorInput = document.getElementById('fontcolor');

    // Function to set a cookie
    function setCookie(name, value, days) {
        const expires = new Date(Date.now() + days * 864e5).toUTCString();
        document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/';
    }

    // Function to get a cookie
    function getCookie(name) {
        return document.cookie.split('; ').reduce((r, v) => {
            const parts = v.split('=');
            return parts[0] === name ? decodeURIComponent(parts[1]) : r
        }, '');
    }

    // Apply the saved preferences if available
    const savedFontSize = getCookie('fontsize');
    const savedFontColor = getCookie('fontcolor');
    if (savedFontSize) {
        document.documentElement.style.setProperty('--fontsize', savedFontSize + 'px');
        fontsizeInput.value = savedFontSize;
    }
    if (savedFontColor) {
        document.documentElement.style.setProperty('--fontcolor', savedFontColor);
        fontcolorInput.value = savedFontColor;
    }

    // Save preferences on form submit
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent form from reloading the page

        const fontsize = fontsizeInput.value;
        const fontcolor = fontcolorInput.value;

        // Set the cookies
        setCookie('fontsize', fontsize, 365); // Save for 1 year
        setCookie('fontcolor', fontcolor, 365); // Save for 1 year

        // Apply the preferences immediately
        document.documentElement.style.setProperty('--fontsize', fontsize + 'px');
        document.documentElement.style.setProperty('--fontcolor', fontcolor);
    });
});