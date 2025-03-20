import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
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


function allGsapAnimations() {
  initScrambleOnHover()
}

export default allGsapAnimations;