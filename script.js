// script.js

// Збереження і завантаження бази даних у LocalStorage
const database = {
    htmlTags: [
        { tag: '<div>', description: 'Блочний елемент' },
        { tag: '<p>', description: 'Абзац' }
    ]
};

// Функція для збереження даних в LocalStorage
function saveToLocalStorage() {
    localStorage.setItem('codeNotesDB', JSON.stringify(database));
}

// Завантаження даних з LocalStorage
function loadFromLocalStorage() {
    const savedDB = localStorage.getItem('codeNotesDB');
    if (savedDB) {
        return JSON.parse(savedDB);
    }
    return database;
}

// Функція для синхронізації з сервером (через API)
async function syncWithServer() {
    try {
        const response = await fetch('https://yourserver.com/api/sync', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(database)
        });
        const data = await response.json();
        console.log('Синхронізація успішна', data);
    } catch (error) {
        console.error('Помилка при синхронізації з сервером', error);
    }
}

// Завантаження даних після завантаження сторінки
document.addEventListener('DOMContentLoaded', () => {
    const loadedDB = loadFromLocalStorage();
    console.log('Завантажена база даних:', loadedDB);
    // Додатково, можна відображати ці дані на сторінці
});
