"use strict";


// Плавное появление текста в header
function onEntry(entry) {
  entry.forEach(change => {
    if (change.isIntersecting) {
     change.target.classList.add('header_content_full-show');
    }
  });
}
function dontEntry(entry) {
  entry.forEach(change => {
    if (change.isIntersecting) {
     change.target.classList.add('header_content_full-dont-show');
    }
  });
}
let options = {
  threshold: [0.5] };
let observer = new IntersectionObserver(onEntry, options);
let elements = document.querySelectorAll('.header_content_full');
let observer1 = new IntersectionObserver(onEntry, options);
let elements1 = document.querySelectorAll('.header_content_shirt');
let observer2 = new IntersectionObserver(onEntry, options);
let elements2 = document.querySelectorAll('.main_btn_buy');
let observer4 = new IntersectionObserver(onEntry, options);
let elements4 = document.querySelectorAll('.section_1_unique');
let observer5 = new IntersectionObserver(onEntry, options);
let elements5 = document.querySelectorAll('.section_1_text');
for (let elm of elements) {
  observer.observe(elm);
}
for (let elm1 of elements1) {
  observer1.observe(elm1);
}
for (let elem2 of elements2) {
  observer2.observe(elem2);
}
setTimeout(() => {
  let observer3 = new IntersectionObserver(dontEntry, options);
  for (let elem3 of elements2) {
    observer3.observe(elem3);
  }
}, 2000);
for (let elem4 of elements4) {
  observer4.observe(elem4);
}
for (let elem5 of elements5) {
  observer5.observe(elem5);
}


// Плавное появление текста в header(КОНЕЦ)


///////////////////////////////////////////////////
// Получаем элементы div, которые будут появляться
const div1 = document.getElementById('div1');
const div2 = document.getElementById('div2');
const div3 = document.getElementById('div3');
const desription_product = document.getElementById('desription_product');
const windowHeightLap = window.innerHeight - 100;
let desription_product_flag = true;
// Устанавливаем начальное состояние элементов
div1.style.opacity = '0';
div2.style.opacity = '0';
div3.style.opacity = '0';
// Функция для плавного появления элементов
function my() {
  const desription_product_top = desription_product.getBoundingClientRect().top;
  if(desription_product_top < windowHeightLap && desription_product_flag === true) {
    function fadeIn(element, duration) {
      let start = null;
      function step(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        element.style.opacity = `${progress / duration}`;
    
        if (progress < duration) {
          window.requestAnimationFrame(step);
        }
      }
      window.requestAnimationFrame(step);
    }
    // Задаем задержку перед появлением каждого элемента
    const delay1 = 200; // Задержка перед появлением первого элемента (в миллисекундах)
    const delay2 = 400; // Задержка перед появлением второго элемента (в миллисекундах)
    const delay3 = 600; // Задержка перед появлением третьего элемента (в миллисекундах)
    // Плавное появление первого элемента
    setTimeout(() => {
      fadeIn(div1, 500); // 1000 миллисекунд (1 секунда) для плавного появления первого элемента
    }, delay1);
    // Плавное появление второго элемента
    setTimeout(() => {
      fadeIn(div2, 500); // 1000 миллисекунд (1 секунда) для плавного появления второго элемента
    }, delay2);
    // Плавное появление третьего элемента
    setTimeout(() => {
      fadeIn(div3, 500); // 1000 миллисекунд (1 секунда) для плавного появления третьего элемента
    }, delay3);
    desription_product_flag = false;
  }
  if(desription_product_top > windowHeightLap && desription_product_flag === false) {
    desription_product_flag = true;
    div1.style.opacity = '0';
    div2.style.opacity = '0';
    div3.style.opacity = '0';
  }
}
window.addEventListener('scroll', my);
////////////////////////////////////////////////////////


// Получаем элемент div, который будет передвигаться
const movingDiv = document.getElementById('section_1_img');
let flag = true;
// Функция для обработки скроллинга страницы
function handleScroll() {
  // Получаем позиции верхней и нижней границы элемента и высоту окна просмотра
  const elementTop = movingDiv.getBoundingClientRect().top;
  const elementBottom = movingDiv.getBoundingClientRect().bottom;
  const windowHeight = window.innerHeight;
  //console.log(elementBottom);
  // Проверяем, находится ли верхняя граница элемента в видимой области окна просмотра
  if (elementTop < windowHeight) {
    // Если элемент появился в видимой области, запускаем функцию для плавного передвижения элемента вправо
    moveRight();
  } else {
    flag = true;
  }

  // Пока под вопросом. Доделать. Когда прокручиваем с низу в верх - анимация тоже должна включиться
  if(elementBottom < 0) {
    movingDiv.style.transform = `translateX(${0}px)`;
  }
}

// Функция для плавного передвижения элемента вправо
function moveRight() {
  let position = 0;
  const endPosition = 200; // Желаемая конечная позиция элемента вправо
  const duration = 1500; // Длительность анимации в миллисекундах
  const increment = (endPosition / duration) * 5; // Расчет инкремента для плавного движения
  if(flag === true) {
    const interval = setInterval(() => {
        // Плавно сдвигаем элемент вправо
        position += increment;
        movingDiv.style.transform = `translateX(${position}px)`;
        //console.log(`${position}px`);
        // Как только достигнута конечная позиция, останавливаем анимацию
        if (position >= endPosition) {
            clearInterval(interval);
        }
    }, 10);
    flag = false;
  }
}

// Добавляем обработчик события скроллинга
window.addEventListener('scroll', handleScroll);

////////////////////////////////////////////////////

const backgroundDiv = document.getElementById('section_6');
// Устанавливаем начальное значение размера фона
let backgroundSize = 200;
let intermediateScroll = 0;
// Функция обработки события скроллинга
function myScroll() {
  // Получаем значение скроллинга страницы
  const scrollY = window.scrollY;
  const section_6_Top = section_6.getBoundingClientRect().top;
  const windowH = window.innerHeight;
  if(section_6_Top < windowH) {
    if(scrollY > intermediateScroll) {
      backgroundSize = Math.max(backgroundSize - 2.5, 120);
      intermediateScroll = scrollY;
    } else {
      backgroundSize = Math.min(backgroundSize + 2.5, 250);
      intermediateScroll = scrollY;
    }
  } else {
    backgroundSize = 200;
  }
  // Применяем измененный размер фона
  backgroundDiv.style.backgroundSize = `${backgroundSize}%`;
}
window.addEventListener('scroll', myScroll);

//////////////////////////////////////////////

var slider = tns({
  container: '.section_3_galary',
  items: 6,
  // slideBy: 'page',
  slideBy: 1,
  autoplay: true,
  controls: false,    // отображение кнопок "назад" "вперед"
  nav: false,    // отображение точек слайдера
  autoplayButtonOutput: false, // отображение кнопки "стоп" "старт"
  speed: 2000,
  autoplayTimeout: 1500
});

