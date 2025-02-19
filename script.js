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
    if (page.startsWith('html')) {
        sidebar.innerHTML = `
          <ul>
            <li><a href="#html/introduction.html" onclick="loadSubPage('html/introduction.html', event);">Введення в HTML</a></li>
            <li><a href="#html/basic.html" onclick="loadSubPage('html/basic.html', event);">Основи HTML</a></li>
            <li><a href="#html/attributes.html" onclick="loadSubPage('html/attributes.html', event);">HTML Атрибути</a></li>
            <li><a href="#html/styles.html" onclick="loadSubPage('html/styles.html', event);">HTML Стилі</a></li>
            <!--
            <li><a href="#html/quotation.html" onclick="loadSubPage('html/quotation.html', event);">HTML Цитати</a></li>
            <li><a href="#html/html-css.html" onclick="loadSubPage('html/html-css.html', event);">HTML CSS</a></li>
            <li>...</li>
            <li><a href="#html/tags.html" onclick="loadSubPage('html/tags.html', event)">Теги HTML</a></li>-->
          </ul>`;
        sidebar.style.display = 'block'; // Відображаємо бокове меню
    } else if (page.startsWith('css')) {
        sidebar.innerHTML = `
          <ul>
            <li><a href="#css/intro.html" onclick="loadSubPage('css/intro.html', event);">Введення в CSS</a></li>  
          </ul>`
        sidebar.style.display = 'block'; // Відображаємо бокове меню
    } else if (page.startsWith('js')) {
        sidebar.innerHTML = `
          <ul>
            <li><a href="#js/intro.html" onclick="loadSubPage('js/intro.html', event);">Введення в JS</a></li>  
          </ul>`
        sidebar.style.display = 'block'; // Відображаємо бокове меню
    } else if (page.startsWith('sql')) {
        sidebar.innerHTML = `
          <ul>
            <li><a href="#sql/intro.html" onclick="loadSubPage('sql/intro.html', event);">Введення в SQL</a></li>  
          </ul>`
        sidebar.style.display = 'block'; // Відображаємо бокове меню
    } else if (page.startsWith('dsa')) {
        sidebar.innerHTML = `
          <ul>
            <li><a href="#dsa/intro.html" onclick="loadSubPage('dsa/intro.html', event);">Введення в DSA</a></li>  
          </ul>`
        sidebar.style.display = 'block'; // Відображаємо бокове меню
    } else {
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