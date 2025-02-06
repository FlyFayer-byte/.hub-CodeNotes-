let lastDatabaseState = []; // Зберігаємо останній стан бази

// ⚡ Функція для збереження даних у LocalStorage
function saveToLocalStorage(data) {
    localStorage.setItem('codeNotesDB', JSON.stringify(data));
}

// ⚡ Завантаження даних із LocalStorage
function loadFromLocalStorage() {
    const savedDB = localStorage.getItem('codeNotesDB');
    return savedDB ? JSON.parse(savedDB) : [];
}

// ⚡ Завантаження даних із сервера та оновлення таблиці
async function loadEntries() {
    try {
        const response = await fetch('http://localhost:5000/api/get-entries');
        const data = await response.json();

        const table = document.querySelector("#dbTable");
        const tbody = document.querySelector("#dbTable tbody");

        if (!table || !tbody) {
            console.error("❌ Помилка: Таблиця не знайдена в DOM! Переконайтеся, що `db.html` містить <table id='dbTable'>.");
            return;
        }

        // Перевіряємо, чи база змінилася
        if (JSON.stringify(data) !== JSON.stringify(lastDatabaseState)) {
            lastDatabaseState = data; // Оновлюємо стан бази
            tbody.innerHTML = ""; // Очищаємо перед оновленням

            data.forEach(entry => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td contenteditable="true" onBlur="updateEntry(${entry.id}, this, 'type')">${entry.type}</td>
                    <td contenteditable="true" onBlur="updateEntry(${entry.id}, this, 'name')">${entry.name}</td>
                    <td contenteditable="true" onBlur="updateEntry(${entry.id}, this, 'description')">${entry.description}</td>
                    <td>
                        <button class="btn-edit" onclick="editEntry(${entry.id})">✏️</button>
                        <button class="btn-delete" onclick="deleteEntry(${entry.id})">🗑️</button>
                    </td>
                `;
                tbody.appendChild(row);
            });

            saveToLocalStorage(data); // Оновлюємо LocalStorage
            console.log("✅ Дані оновлено в таблиці.");
        } else {
            console.log("🔹 Дані не змінилися, оновлення не потрібне.");
        }
    } catch (error) {
        console.error('❌ Помилка завантаження даних:', error);
        lastDatabaseState = loadFromLocalStorage(); // Використовуємо LocalStorage при помилці сервера
    }
}

// ⚡ Оновлення запису після редагування комірки
function updateEntry(id, element, field) {
    const newValue = element.innerText.trim();
    
    fetch(`http://localhost:5000/api/edit-entry/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [field]: newValue })
    }).then(() => console.log(`✅ Поле ${field} оновлено для ID ${id}`));
}

// ⚡ Додавання нового запису
function addEntry() {
    const type = prompt("Введіть тип (HTML/CSS/JavaScript)");
    const name = prompt("Введіть назву");
    const description = prompt("Введіть опис");

    if (!type || !name || !description) {
        alert("❌ Всі поля мають бути заповнені!");
        return;
    }

    fetch('http://localhost:5000/api/add-entry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, name, description })
    }).then(() => loadEntries()); // ✅ Оновлення тільки після змін
}

// ⚡ Видалення запису з підтвердженням
function deleteEntry(id) {
    if (!confirm("⚠ Ви впевнені, що хочете видалити цей запис?")) {
        return;
    }

    fetch(`http://localhost:5000/api/delete-entry/${id}`, {
        method: 'DELETE'
    }).then(() => loadEntries()); // ✅ Оновлення тільки після змін
}

// ⚡ Завантаження даних після завантаження сторінки
document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector("#dbTable")) {
        console.log("✅ Таблиця знайдена, виконуємо loadEntries()");
        loadEntries();
    } else {
        console.log("ℹ️ Таблиці немає на цій сторінці, loadEntries() не виконується.");
    }
});
