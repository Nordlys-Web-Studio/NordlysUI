function loadTecmImagesPopUp() {
  // sweet alert with technology info
  const tech_images = document.querySelectorAll(".tech_image");
  tech_images.forEach((el) => {
    el.addEventListener("click", (ev) => {
      Swal.fire({
        title: `<strong>${
          el.dataset.alert_title ? el.dataset.alert_title : ""
        }<\strong>`,
        html: `<img src="${
          el.src ? el.src : "#"
        }" style="max-width: 128px;"/> <br /> <p class="mt-4">${
          el.dataset.alert_text ? el.dataset.alert_text : ""
        }</p>`,
      });
    });
  });
}

function fixEtapiSection() {
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
}

function setOurProductsSwiper() {
  // Slider for Наші послуги section
  return new Swiper(".swiper2", {
    // Optional parameters
    effect: "cards",
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
}

// Section Stages of development. Swap section 4 and 6 if screen width is less than 768px.А
document.addEventListener("DOMContentLoaded", (ev) => {
  fixEtapiSection();
  loadTecmImagesPopUp();
  setPopovers();
  setOurProductsSwiper();
});
