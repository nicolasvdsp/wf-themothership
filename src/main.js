import './scss/app.scss';
import customAnimations from './features/animations/animations';
import changesOnBreakpoints from './features/breakpoints';
import horizontalScroll from './features/horizontalscroll';
import imagesequence from './features/imagesequence';
import contact from './features/contact';

customAnimations();
changesOnBreakpoints();
horizontalScroll();
imagesequence();
contact();

if (import.meta.env.DEV) {
  console.log("In development");
} else {
  console.log("Flux Capacitator engaged 🚀");
}