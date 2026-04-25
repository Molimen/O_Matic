export function hiddenNotification() {
    const notificationWindow = document.querySelector('.notification-window');

    notificationWindow.classList.remove('opacity-100');
    notificationWindow.classList.add('opacity-0');

    setTimeout(() => {
        notificationWindow.classList.add('hidden');
        document.querySelector('.notification-content').innerHTML = '';
    }, 100);
}

export function showNotification(content) {
    const notificationWindow = document.querySelector('.notification-window');

    document.querySelector('.notification-content').innerHTML = content;

    notificationWindow.classList.remove('hidden');

    setTimeout(() => {
        notificationWindow.classList.add('opacity-100');
        notificationWindow.classList.remove('opacity-0');
    }, 100);
}

document.querySelector('.notification-close-button').addEventListener('click', () => {
    hiddenNotification();
});

document.querySelector('.notification-bg-blur').addEventListener('click', () => {
    hiddenNotification();   
});