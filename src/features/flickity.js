function initFlickitySlider() {
  // Select all slider groups with the specified data attribute
  const sliderCards = document.querySelectorAll('[data-flickity-type="cases"]');

  sliderCards.forEach((slider, index) => {
    // Give each slider a unique ID
    const sliderIndexID = 'flickity-type-cases-id-' + index;
    slider.id = sliderIndexID;

    // Count slides
    let slidesCount = slider.querySelectorAll('[data-flickity-item]').length;
    slider.setAttribute('data-flickity-count', slidesCount);

    // Set Active status
    slider.setAttribute('data-flickity-status', 'active');

    // Select the element containing the slide list
    const sliderEl = document.querySelector('#' + sliderIndexID + ' [data-flickity-list]');
    console.log(sliderEl);
    if (!sliderEl) return;

    // Initialize Flickity on the slider element
    const flickitySlider = new Flickity(sliderEl, {
      watchCSS: true,
      contain: true,
      wrapAround: false,
      dragThreshold: 10,
      prevNextButtons: false,
      pageDots: false,
      cellAlign: 'left',
      selectedAttraction: 0.015,
      friction: 0.25,
      percentPosition: true,
      freeScroll: false,
      on: {
        dragStart: () => {
          // Disable pointer events during drag
          sliderEl.style.pointerEvents = "none";
        },
        dragEnd: () => {
          // Re-enable pointer events after drag
          sliderEl.style.pointerEvents = "auto";
        },
        change: function () {
          updateArrows();
          updateDots();
        }
      }
    });

    // Get Flickity instance data
    const flickity = Flickity.data(sliderEl);

    // Set up previous click functionality
    const prevButton = slider.querySelector('[data-flickity-control="prev"]');
    if (prevButton) {
      prevButton.setAttribute('disabled', '');
      prevButton.addEventListener('click', function () {
        flickity.previous();
      });
    }

    // Set up next click functionality
    const nextButton = slider.querySelector('[data-flickity-control="next"]');
    if (nextButton) {
      nextButton.addEventListener('click', function () {
        flickity.next();
      });
    }

    // Update arrows using CSS var(--flick-col) count
    function updateArrows() {
      const inviewColumns = parseInt(window.getComputedStyle(sliderEl).getPropertyValue('--flick-col'), 10);
      if (!flickity.cells[flickity.selectedIndex - 1]) {
        if (prevButton) prevButton.setAttribute('disabled', 'disabled');
        if (nextButton) nextButton.removeAttribute('disabled');
      } else if (!flickity.cells[flickity.selectedIndex + inviewColumns]) {
        if (nextButton) nextButton.setAttribute('disabled', 'disabled');
        if (prevButton) prevButton.removeAttribute('disabled');
      } else {
        if (prevButton) prevButton.removeAttribute('disabled');
        if (nextButton) nextButton.removeAttribute('disabled');
      }
    }

    // Set up dots click functionality
    const dots = slider.querySelectorAll('[data-flickity-dot]');
    if (dots.length) {
      dots.forEach((dot, index) => {
        dot.addEventListener('click', function () {
          const inviewColumns = parseInt(window.getComputedStyle(sliderEl).getPropertyValue('--flick-col'), 10);
          const maxIndex = flickity.cells.length - inviewColumns;
          let targetIndex = index;
          if (targetIndex > maxIndex) {
            targetIndex = maxIndex;
          }
          flickity.select(targetIndex);
        });
      });
    }

    // Update dots using CSS var(--flick-col) count
    function updateDots() {
      const inviewColumns = parseInt(window.getComputedStyle(sliderEl).getPropertyValue('--flick-col'), 10);
      const maxIndex = flickity.cells.length - inviewColumns;
      const activeIndex = flickity.selectedIndex < maxIndex ? flickity.selectedIndex : maxIndex;
      const dots = slider.querySelectorAll('[data-flickity-dot]');
      dots.forEach((dot, index) => {
        dot.setAttribute('data-flickity-dot', index === activeIndex ? 'active' : '');
      });
    }

  });
}

function flickity() {
  // Initialize Flickity Slider
  // document.addEventListener('DOMContentLoaded', function () {
  initFlickitySlider();
  // });

}

// initFlickitySlider();

export default flickity;