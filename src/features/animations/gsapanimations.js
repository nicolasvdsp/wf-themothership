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
  if (!folder) return;
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
          delay: 1.5, // Wacht 1.5 seconden
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
        // Na 1.5 seconden terugzetten
        gsap.to(folder, {
          duration: 0.5,
          delay: 1.5, // Wacht 3 seconden
          rotate: 0,
          ease: "power2.inOut"
        });
      }
    })
  })
}

function dragJoystick() {

  const joystick = document.querySelector('[data-icon-type="stick"]');
  if (joystick) {
    const maxRotation = 15; // Max 15 graden naar links/rechts
    const centerX = window.innerWidth / 2; // Center van het scherm (horizontaal)

    // Zet de rotatie oorsprong (center-bottom)
    joystick.style.transformOrigin = "50% 60%";

    document.addEventListener("mousemove", (event) => {
      const mouseX = event.clientX; // Muispositie op de X-as

      // Bereken het verschil tussen de muispositie en het midden van het scherm
      const deltaX = mouseX - centerX;

      // Beperk de rotatie tot max 15 graden
      const rotation = Math.max(-maxRotation, Math.min(maxRotation, deltaX / 10)); // deltaX wordt gedeeld om de rotatie geleidelijker te maken

      // Gebruik GSAP om de rotatie van de joystick te veranderen
      gsap.to(joystick, { rotation: rotation });
    });
  }
}

function allGsapAnimations() {
  initScrambleOnHover()
  alianAnimation()
  dragJoystick()
}

export default allGsapAnimations;