const upToTopBtn = document.querySelector("#btn__up_to_top");

function processUpToTopBtnVision() {
  if (
    document.body.scrollTop > 400 ||
    document.documentElement.scrollTop > 400
  ) {
    upToTopBtn.style["right"] = "20px";
    upToTopBtn.addEventListener("click", (ev) => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  } else {
    upToTopBtn.style["right"] = "-200px";
  }
}

document.addEventListener("scroll", (ev) => {
  processUpToTopBtnVision();
});

document.addEventListener("DOMContentLoaded", (ev) => {
  processUpToTopBtnVision();
});
