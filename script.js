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

        console.log("✅ Оновлені дані:", data);

        const tbody = document.querySelector("#dbTable tbody");
        tbody.innerHTML = "";
        
        data.forEach(entry => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td contenteditable="true" onBlur="updateEntry(${entry.id}, this, 'type')">${entry.type}</td>
                <td contenteditable="true" onBlur="updateEntry(${entry.id}, this, 'name')">${entry.name}</td>
                <td contenteditable="true" onBlur="updateEntry(${entry.id}, this, 'description')">${entry.description}</td>
                <td contenteditable="true" onBlur="updateEntry(${entry.id}, this, 'category')">${entry.category}</td>
                <td contenteditable="true" onBlur="updateEntry(${entry.id}, this, 'example_code')"><pre>${entry.example_code}</pre></td>
                <td>
                    <button onclick="editEntry(${entry.id})">✏️</button>
                    <button onclick="deleteEntry(${entry.id})">🗑️</button>
                </td>
            `;
            tbody.appendChild(row);
        });

        console.log("✅ Таблиця оновлена.");
    } catch (error) {
        console.error('❌ Помилка завантаження даних:', error);
    }
}




// ⚡ Оновлення запису після редагування комірки
function updateEntry(id, element, field) {
    const newValue = element.innerText.trim();

    fetch(`http://localhost:5000/api/edit-entry/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [field]: newValue })
    }).then(() => {
        console.log(`✅ Поле ${field} оновлено для ID ${id}`);
        loadEntries(); // Оновлення таблиці після редагування
    });
}


// ⚡ Додавання нового запису
function addEntry() {
    const type = document.getElementById("entryType").value;
    const name = document.getElementById("entryName").value.trim();
    const description = document.getElementById("entryDescription").value.trim();
    const category = document.getElementById("entryCategory").value.trim();
    const example_code = document.getElementById("entryExample").value.trim();

    console.log("📝 Відправляємо дані:", { type, name, description, category, example_code });

    if (!type || !name || !description || !category || !example_code) {
        alert("❌ Всі поля мають бути заповнені!");
        return;
    }

    fetch('http://localhost:5000/api/add-entry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, name, description, category, example_code })
    }).then(() => 
        loadEntries()); // ✅ Оновлення тільки після змін
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

// (Додає автопідказки під час введення пошуку)

document.getElementById("searchInput").addEventListener("input", async function() {
    const query = this.value;
    if (query.length < 2) return;
    
    const response = await fetch(`/api/search?q=${query}`);
    const suggestions = await response.json();
    console.log("🔍 Автопідказки:", suggestions);
});