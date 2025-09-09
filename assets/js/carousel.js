document.querySelectorAll(".carousel").forEach(carousel => {
  const contents = carousel.querySelectorAll(".carousel_content");
  const buttonHtml = Array.from(contents, () => {
    return `<span class="carousel_button"></span>`;
  });
  carousel.insertAdjacentHTML("beforeend", `
    <div class="carousel_nav">
      ${buttonHtml.join("")}
    </div>
  `);

  let index = 0;
  const buttons = carousel.querySelectorAll(".carousel_button");
  const prevBtn = carousel.querySelector(".prev");
  const nextBtn = carousel.querySelector(".next");

  function displaySlide(n) {
    contents.forEach((content, i) => {
      content.classList.remove("carousel_content--selected");
      buttons[i]?.classList.remove("carousel_button--selected");
    });

    contents[n].classList.add("carousel_content--selected");
    buttons[n]?.classList.add("carousel_button--selected");
  }

  function changeSlide(step) {
    index += step;
    if (index >= contents.length) index = 0;
    if (index < 0) index = contents.length - 1;
    displaySlide(index);
  }

  buttons.forEach((button, i) => {
    button.addEventListener("click", () => {
      index = i;
      displaySlide(index);
    });
  });

  if (prevBtn) prevBtn.addEventListener("click", () => changeSlide(-1));
  if (nextBtn) nextBtn.addEventListener("click", () => changeSlide(1));

  displaySlide(index);

  let touchStartX = 0;
  let touchEndX = 0;
  const minSwipeDistance = 50; 

    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    }, {passive: true});

    carousel.addEventListener('touchmove', (e) => {
        touchEndX = e.touches[0].clientX;
    }, {passive: true});

    carousel.addEventListener('touchend', () => {
        const swipeDistance = touchEndX - touchStartX;

        if (swipeDistance > minSwipeDistance) {
            changeSlide(-1);
        } else if (swipeDistance < -minSwipeDistance) {
            changeSlide(1);
        }
        touchStartX = 0;
        touchEndX = 0;
    });

    
    carousel.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            changeSlide(-1);
        } else if (e.key === 'ArrowRight') {
            changeSlide(1);
        }
    });
});




