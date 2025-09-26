(async () => {
  const response = await fetch('/assets/reviews/review.json');
  const reviews = await response.json();

  const caruselContainer = document.querySelector('.carousel');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  let currentReviewIndex = 0;

  const getQuoteSvg = (id) => `
                <svg id="${id}" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-quote-icon text-gray-400">
                    <path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"/>
                    <path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"/>
                </svg>
            `;
  const renderReviews = (reviews) => {
    reviews.forEach((review, index) => {
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('carousel_content');

      if (index === 0) {
        itemDiv.classList.add('carousel_content--selected');
      }

      const img = document.createElement('img');

      img.src = `/assets/lockers/charging-locker-tablet-${review.id}.webp`
      img.srcset = `/assets/lockers/charging-locker-mobil-${review.id}.webp 400w, /assets/lockers/charging-locker-tablet-${review.id}.webp 800w, /assets/lockers/charging-locker-desktop-${review.id}.webp 1200w`
      img.alt = `charging locker example-${review.id}`;
      img.loading = "lazy"
      img.classList.add('carousel_img');

      const reviewContainer = document.createElement('div');
      reviewContainer.classList.add('carousel_review');

      const reviewText = document.createElement('p');
      reviewText.classList.add('review');
      reviewText.innerHTML = `${getQuoteSvg('quote__up')}${review.review}${getQuoteSvg('quote__down')}`;

      const venueText = document.createElement('span');
      venueText.classList.add('venue');
      venueText.textContent = review.venue;

      reviewContainer.appendChild(reviewText);
      reviewContainer.appendChild(venueText);
      itemDiv.appendChild(img);
      itemDiv.appendChild(reviewContainer);
      caruselContainer.appendChild(itemDiv);
    })
  };

  const showReview = (index) => {
    const items = caruselContainer.querySelectorAll('.carousel_content');
    if (!items.length) return;

    items[currentReviewIndex].classList.remove('carousel_content--selected');
    currentReviewIndex = (index + items.length) % items.length;
    items[currentReviewIndex].classList.add('carousel_content--selected');
  };

  prevBtn.addEventListener('click', () => {
    showReview(currentReviewIndex - 1);
  });

  nextBtn.addEventListener('click', () => {
    showReview(currentReviewIndex + 1);
  });
            
  renderReviews(reviews);
})();