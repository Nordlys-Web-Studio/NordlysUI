(function ($) {
  "use strict";
  $(function () {
    $(".menu__icon").on("click", function () {
      $(this).closest(".menu").toggleClass("menu_state_open");
    });
  });

  $(document).ready(function () {
    //initialize swiper when document ready
    var mySwiper = new Swiper(".swiper-container", {
      resistanceRatio: 0.7,
      spaceBetween: 30,
      effect: "fade",
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + (index + 1) + "</span>";
        },
      },
    });
  });

  AOS.init();
})(jQuery);

if (window.innerWidth < 768) {
  const block6Aos = document.getElementById("id_square_six");
  const block4Aos = document.getElementById("id_square_four");
  block4Aos.id = "id_square_six";
  document.getElementById("id_square_one").innerHTML =
    '<span class="square_one">1</span> <div class="b_brc" data-aos="fade-up" data-aos-duration="1000"> <h4>Аналіз</h4> <p>Досліджуємо тематику вашого бізнесу, аналізуємо конкурентів.</p> </div>';
  document.getElementById("id_square_three").innerHTML =
    '<span class="square_three">3</span> <div class="b_brc" data-aos="fade-up" data-aos-duration="1000"> <h4>Розробка</h4> <p>Робимо сайт з інтерактивним дизайном, динамічними елементами і адаптивною версткою.</p> </div>';
  block6Aos.innerHTML =
    '<span class="square_four">4</span> <div class="b_brc" data-aos="fade-up" data-aos-duration="1000"> <h4>Контент</h4> <p>Наповнюємо сайт актуальною інформацією</p> </div>';
  block4Aos.innerHTML =
    '<span class="square_six">6</span> <div class="b_brc" data-aos="fade-up" data-aos-duration="1000"> <h4>Відгук</h4> <p>Гарний відгук клієнта про бездоганно виконану роботу)</p> </div>';
}

const swiper = new Swiper(".swiper2", {
  // Optional parameters
  effect: 'cards',
  cardsEffect: {
    slideShadows: false,
  },
  loop: true,
  // If we need pagination
  pagination: {
    el: ".swiper-pagination2",
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next2",
    prevEl: ".swiper-button-prev2",
  },

  // And if we need scrollbar
  scrollbar: {
    el: ".swiper-scrollbar2",
  },
});
