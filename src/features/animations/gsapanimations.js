import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { CustomBounce } from 'gsap/CustomBounce';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin, CustomEase);

function initScrambleOnHover() {
  let targets = document.querySelectorAll('[data-scramble-hover="link"]')

  targets.forEach((target) => {
    let textEl = target.querySelector('[data-scramble-hover="target"]')
    let originalText = textEl.textContent // save original text
    let customHoverText = textEl.getAttribute("data-scramble-text") // if this attribute is present, take a custom hover text
    let scrambleChars = originalText.replace(/\s/g, '');

    let split = new SplitText(textEl, {
      type: "words, chars",
      wordsClass: "word",
      charsClass: "char"
    })


    target.addEventListener("mouseenter", () => {
      gsap.to(textEl, {
        duration: 1,
        scrambleText: {
          text: customHoverText ? customHoverText : originalText,
          chars: originalText.replace(/\s/g, ''),
        }
      })
    })

    target.addEventListener("mouseleave", () => {
      gsap.to(textEl, {
        duration: .4,
        scrambleText: {
          text: originalText,
          speed: 2,
          chars: originalText.replace(/\s/g, ''),
        }
      })
    })
  })
}



//H1 ICON ANIMATIONS
function alianAnimation() {
  const folder = document.querySelector(".icon-folder");
  const alian = folder.querySelector('[data-icon-type="alian"]');

  console.log(folder + " " + alian);
  folder.addEventListener("click", function () {
    gsap.to(alian, {
      duration: .6,
      x: 20,  // Beweeg naar rechts
      y: -40, // Beweeg omhoog
      rotation: 135, // Volledige draai
      scale: 1.5, // 1.5 keer groter
      ease: "back.out", // Bouncy effect bij het einde
      onComplete: () => {
        // Na 3 seconden terugzetten
        gsap.to(alian, {
          duration: 0.5,
          delay: 3, // Wacht 3 seconden
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          ease: "power2.inOut"
        });
      }
    })
    gsap.to(folder, {
      duration: .6,
      rotate: 15,
      ease: "back.out", // Bouncy effect bij het einde
      onComplete: () => {
        // Na 3 seconden terugzetten
        gsap.to(folder, {
          duration: 0.5,
          delay: 3, // Wacht 3 seconden
          rotate: 0,
          ease: "power2.inOut"
        });
      }
    })
  })
}

function allGsapAnimations() {
  initScrambleOnHover()
  alianAnimation()
}

export default allGsapAnimations;