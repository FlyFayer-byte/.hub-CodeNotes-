// Функція для завантаження основних сторінок у контентну область без перезавантаження сайту
function loadPage(page) {
    fetch(`${page}`) // Виконуємо HTTP-запит для отримання вмісту сторінки

        .then(response => response.text()) // Перетворюємо відповідь у текст
        .then(data => {
            
            document.getElementById('content').innerHTML = data; // Вставляємо вміст у блок 'content'
            updateSidebar(page); // Оновлюємо бокове меню відповідно до вибраної сторінки
        })
        .catch(error => console.log("Помилка завантаження сторінки: " + error)); // Виводимо помилку, якщо щось пішло не так
}

// Функція для оновлення бокового меню в залежності від обраного розділу
function updateSidebar(page) {
    
    let sidebar = document.getElementById('sidebar'); // Отримуємо блок бокового меню

    // Перевіряємо, яку сторінку було завантажено, і формуємо відповідне бокове меню
    if (page === 'html.html') {
        sidebar.innerHTML = `
          <ul>
            <li><a onclick="loadSubPage('html/intro.html')">Введення в HTML</a></li>
            <li><a onclick="loadSubPage('html/attributes.html')">HTML Атрибути</a></li>
            <li><a onclick="loadSubPage('html/styles.html')">HTML Стилі</a></li>
            <li><a onclick="loadSubPage('html/text-formatting.html')">HTML Форматування</a></li>
            <li><a onclick="loadSubPage('html/quotation.html')">HTML Цитати</a></li>
            
            <li>...</li>
            <li><a onclick="loadSubPage('html/tags.html')">Теги HTML</a></li>
          </ul>`;
        sidebar.style.display = 'block'; // Відображаємо бокове меню
    } 
    else {
        sidebar.innerHTML = ''; // Очищаємо бокове меню, якщо сторінка не передбачає підпунктів
        sidebar.style.display = 'none'; // Ховаємо бокове меню
    }
}

// Фкнкція для завантаження підсторінок у відповідну область контенту
function loadSubPage(subPage) {
    console.log("Завнтажуємо сторінку:", subPage);
    fetch(`${subPage}`) // Завантажуємо  вибрану підсторінку
        .then(response => response.text()) // Перетворюємо відповідь у текст
        .then(data => {
            document.getElementById('content').innerHTML = data; // Оновлюємо вміст основного блоку
        })
        .catch(error => console.log("Помилка завантаження підсторінки: " + error)); // Виводимо помилку, якщо щось пішло не так
}