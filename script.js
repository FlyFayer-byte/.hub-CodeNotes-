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
            <li><a href="#html/text-formatting.html" onclick="loadSubPage('html/text-formatting.html', event);">HTML Форматування</a></li>
            <li><a href="#html/quotations.html" onclick="loadSubPage('html/quotations.html', event);">HTML Цитування</a></li>
            <li><a href="#html/colors.html" onclick="loadSubPage('html/colors.html', event);">HTML Кольори</a></li>
            <li><a href="#html/styles-css.html" onclick="loadSubPage('html/styles-css.html', event);">HTML Стилі CSS</a></li>
            <li><a href="#html/links.html" onclick="loadSubPage('html/links.html', event);">HTML Посилання</a></li>
            <li><a href="#html/block-elements.html" onclick="loadSubPage('html/block-elements.html', event);">Блокові елементи</a></li>
            <li><a href="#html/inline-elements.html" onclick="loadSubPage('html/inline-elements.html', event);">Вбудовані елементи</a></li>
            <li><a href="#html/div-element.html" onclick="loadSubPage('html/div-element.html', event);">Елемент &lt;div&gt;</a></li>
            <li><a href="#html/head-element.html" onclick="loadSubPage('html/head-element.html', event);">Елемент &lt;head&gt; ?</a></li>
            <li><a href="#html/html-forms.html" onclick="loadSubPage('html/html-forms.html', event);">Елемент &lt;form&gt;</a></li>
            <li><a href="#html/attributea-forms.html" onclick="loadSubPage('html/attributea-forms.html', event);">Атрибути &lt;form></a></li>
            <li><a href="#html/elements-forms.html" onclick="loadSubPage('html/elements-forms.html', event);">Елементи &lt;form></a></li>
            <li><a href="#html/input-types.html" onclick="loadSubPage('html/input-types.html', event);">Типи &lt;input></a></li>
            <li><a href="#html/input-attributes.html" onclick="loadSubPage('html/input-attributes.html', event);">Атрибути &lt;input></a></li>
            <li><a href="#html/form-attributes.html" onclick="loadSubPage('html/form-attributes.html', event);">Атрибути &lt;form></a></li>
            <li><a href="#html/html-canvas.html" onclick="loadSubPage('html/html-canvas.html', event);">HTML Canvas + JS</a></li>
            <li><a href="#html/svg-graphics.html" onclick="loadSubPage('html/svg-graphics.html', event);">HTML SVG Графіка</a></li>
          </ul>`;
        sidebar.style.display = 'block'; // Відображаємо бокове меню
    } else if (page.startsWith('css')) {
        sidebar.innerHTML = `
          <ul>
            <li><a href="#css/introduction.html" onclick="loadSubPage('css/introduction.html', event);">Введення в CSS</a></li>
            <li><a href="#css/syntax-css.html" onclick="loadSubPage('css/syntax-css.html', event);">CSS Синтаксис</a></li>
            <li><a href="#css/selectors-css.html" onclick="loadSubPage('css/selectors-css.html', event);">CSS Селектори</a></li>
            <li><a href="#css/connection-css.html" onclick="loadSubPage('css/connection-css.html', event);">Підключення CSS</a></li>
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

// Функція для завантаження підсторінок у відповідну область контенту
function loadSubPage(subPage, event = null) {
    if (event) event.preventDefault(); // Запобігаємо стандартному переходу  
    console.log("Завантажуємо сторінку:", subPage);

    location.hash = subPage; // 🔹 Додаємо підсторінку до URL

    fetch(`${subPage}`) // Завантажуємо  вибрану підсторінку
        .then(response => response.text()) // Перетворюємо відповідь у текст
        .then(data => {
            document.getElementById('content').innerHTML = data; // Оновлюємо вміст основного блоку
        })
        .catch(error => console.log("Помилка завантаження підсторінки: " + error)); // Виводимо помилку, якщо щось пішло не так
}

// Функція для приховування бокового меню
document.getElementById('toggle-sidebar').addEventListener('click', function () {
  document.getElementById('sidebar').classList.toggle('hidden');
});

// Функції для html/html-canvas.html
// Оголошення функції drawLine - Намалювати лінію
function drawLine() {
  var c = document.getElementById("draw-line");
  var ctx = c.getContext("2d");
  ctx.moveTo(0, 0);
  ctx.lineTo(200, 100);
  ctx.stroke();
}

// Оголошення функції drawLine - Намалювати коло
function drawCircle() {
  var c = document.getElementById("draw-circle");
  var ctx = c.getContext("2d");
  ctx.beginPath();
  ctx.arc(95, 50, 40, 0, 2 * Math.PI);
  ctx.stroke();
}

// Оголошення функції drawText - Намалюйте текст
function drawText() {
  var c = document.getElementById("draw-text");
  var ctx = c.getContext("2d");
  ctx.font = "30px Arial";
  ctx.fillText("Hello World", 10, 50);
}

// Оголошення функції strokeText - Обведення тексту
function strokeText() {
  var c = document.getElementById("stroke-text");
  var ctx = c.getContext("2d");
  ctx.font = "30px Arial";
  ctx.strokeText("Hello World", 10, 50);
}

// Оголошення функції DrawLinearGradient - Малювання лінійного градієнта
function DrawLinearGradient () {
  var c = document.getElementById("draw-linear-gradient");
  var ctx = c.getContext("2d");

  // Create gradient
  var grd = ctx.createLinearGradient(0, 0, 200, 0);
  grd.addColorStop(0, "red");
  grd.addColorStop(1, "white");

  // Fill with gradient
  ctx.fillStyle = grd;
  ctx.fillRect(10, 10, 150, 80);
}

// Оголошення функції DrawCircularGradient - Малювання кругового градієнта
function DrawCircularGradient() {
  var c = document.getElementById("draw-circular-gradient");
  var ctx = c.getContext("2d");

  // Create gradient
  var grd = ctx.createRadialGradient(75, 50, 5, 90, 60, 100);
  grd.addColorStop(0, "red");
  grd.addColorStop(1, "white");

  // Fill with gradient
  ctx.fillStyle = grd;
  ctx.fillRect(10, 10, 150, 80);
}

// Оголошення функції DrawCircularGradient - Малювання зображення
function drawImage() {
  var c = document.getElementById("draw-image");
  var ctx = c.getContext("2d");
  var img = document.getElementById("scream");
  ctx.drawImage(img, 10, 10);
}
