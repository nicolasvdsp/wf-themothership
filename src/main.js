import './scss/app.scss';
import customAnimations from './features/animations/animations';
import changesOnBreakpoints from './features/breakpoints';
import horizontalScroll from './features/horizontalscroll';
import imagesequence from './features/imagesequence';
import contact from './features/contact';
import flickity from './features/flickity';

customAnimations();
changesOnBreakpoints();
horizontalScroll();
imagesequence();
contact();
flickity();

if (import.meta.env.DEV) {
  console.log("In development");
} else {
  console.log("Flux Capacitator engaged 🚀");
}