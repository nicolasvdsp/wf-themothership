function allowHorizontalScroll(parentClass) {
  const scrollContainer = document.querySelector('.horizontal-scroll-content');
  if (scrollContainer) {
    scrollContainer.addEventListener('wheel', (evt) => {
      evt.preventDefault();
      scrollContainer.scrollLeft += evt.deltaY;
    });
  }
}

function horizontalScrollWithMouseDrag(parentClass) {

}

function horizontalScroll() {
  allowHorizontalScroll("hello broll");
  horizontalScrollWithMouseDrag('.portfolio1_list');
}

export default horizontalScroll;