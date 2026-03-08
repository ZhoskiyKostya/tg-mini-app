// Initialize Telegram Web App
const tg = window.Telegram.WebApp;

// Main initialization
tg.ready();

// Expand the app to full height
tg.expand();

// Get user info
const user = tg.initDataUnsafe?.user;
const userInfoDiv = document.getElementById('userInfo');

if (user) {
    userInfoDiv.innerHTML = `
        <p><strong>ID:</strong> ${user.id}</p>
        <p><strong>Name:</strong> ${user.first_name} ${user.last_name || ''}</p>
        <p><strong>Username:</strong> @${user.username || 'N/A'}</p>
        <p><strong>Language:</strong> ${user.language_code || 'N/A'}</p>
    `;
} else {
    userInfoDiv.innerHTML = '<p>Running outside Telegram or user data unavailable</p>';
}

// Set Main Button
tg.MainButton.setText('MAIN ACTION');
tg.MainButton.onClick(() => {
    tg.showAlert('Main Button clicked!');
});

// Show Main Button
tg.MainButton.show();

// Counter functionality
let count = 0;
const counterSpan = document.getElementById('counter');

function increment() {
    count++;
    counterSpan.textContent = count;

    // Optional: Update Main Button text
    tg.MainButton.setText(`Count: ${count}`);

    // Haptic feedback (if available)
    if (tg.HapticFeedback) {
        tg.HapticFeedback.impactOccurred('light');
    }
}

function reset() {
    count = 0;
    counterSpan.textContent = count;
    tg.MainButton.setText('MAIN ACTION');
}

// Show alert function
function showAlert() {
    tg.showAlert('Hello from Telegram Mini App! 👋');

    // Show popup with more options
    tg.showPopup({
        title: 'Popup Example',
        message: 'This is a popup with buttons',
        buttons: [
            { id: 'ok', type: 'default', text: 'OK' },
            { id: 'cancel', type: 'destructive', text: 'Cancel' }
        ]
    }, (buttonId) => {
        if (buttonId === 'ok') {
            tg.showAlert('You clicked OK!');
        }
    });
}

// Share message function
function shareMessage() {
    const shareText = 'Check out this awesome Telegram Mini App!';
    const currentUrl = window.location.href;

    // Try to use Telegram share
    tg.openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareText)}`);
}

// Close app function
function closeApp() {
    tg.close();
}

// Handle theme changes
tg.onEvent('themeChanged', () => {
    // Theme colors are automatically applied via CSS variables
    console.log('Theme changed');
});

// Handle viewport changes
tg.onEvent('viewportChanged', () => {
    console.log('Viewport changed');
});

// Set Back Button (optional)
tg.BackButton.show();
tg.BackButton.onClick(() => {
    tg.showAlert('Back button clicked');
    tg.BackButton.hide();
});

// Cloud storage example (if available)
if (tg.CloudStorage) {
    // Save data
    tg.CloudStorage.setItem('counter', count.toString(), (error, success) => {
        if (!error && success) {
            console.log('Counter saved to cloud storage');
        }
    });

    // Get data
    tg.CloudStorage.getItem('counter', (error, value) => {
        if (!error && value) {
            count = parseInt(value);
            counterSpan.textContent = count;
        }
    });
}

// Log that app is ready
console.log('Telegram Mini App is ready!');