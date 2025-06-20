import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { CustomBounce } from 'gsap/CustomBounce';
import { CustomEase } from 'gsap/CustomEase';
import { compute } from 'three/tsl';

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
  const folder = document.querySelector(".icon.icon-folder");
  if (!folder) return;
  const alian = folder.querySelector('[data-icon-type="alian"]');

  gsap.set(alian, { xPercent: -50, yPercent: -50, x: 0, y: 0 }); // Center the icon

  folder.addEventListener("click", function () {
    const iconFolderWidth = parseFloat(window.getComputedStyle(folder).width);
    // const moveX = iconFolderWidth * 0.305; // ≈ 20px bij 4.1rem breedte
    // const moveY = -iconFolderWidth * 0.61; // ≈ -40px bij 4.1rem breedte
    const moveX = iconFolderWidth * 0.305; // ≈ 20px bij 4.1rem breedte
    const moveY = -iconFolderWidth * 0.61; // ≈ -40px bij 4.1rem breedte

    gsap.to(alian, {
      duration: .6,
      x: moveX,  // Beweeg naar rechts
      y: moveY, // Beweeg omhoog
      rotation: 135, // Volledige draai
      scale: 1.5, // 1.5 keer groter
      ease: "back.out", // Bouncy effect bij het einde
      onComplete: () => {
        gsap.to(alian, {
          duration: 0.5,
          delay: 1.5, // Wacht 1.5 seconden
          x: 0, // Terug naar originele X-positie
          y: 0, // Terug naar originele Y-positie
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
  gsap.set(joystick, { xPercent: -50, yPercent: -50, x: 0, y: 0, rotation: 0 });

  if (joystick) {
    const maxRotation = 25; // Max 15 graden naar links/rechts
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

function initMarqueeScrollDirection() {
  document.querySelectorAll('[data-marquee-scroll-direction-target]').forEach((marquee) => {
    // Query marquee elements
    const marqueeContent = marquee.querySelector('[data-marquee-collection-target]');
    const marqueeScroll = marquee.querySelector('[data-marquee-scroll-target]');
    if (!marqueeContent || !marqueeScroll) return;

    // Get data attributes
    const { marqueeSpeed: speed, marqueeDirection: direction, marqueeDuplicate: duplicate, marqueeScrollSpeed: scrollSpeed } = marquee.dataset;

    // Convert data attributes to usable types
    const marqueeSpeedAttr = parseFloat(speed);
    const marqueeDirectionAttr = direction === 'right' ? 1 : -1; // 1 for right, -1 for left
    const duplicateAmount = parseInt(duplicate || 0);
    const scrollSpeedAttr = parseFloat(scrollSpeed);
    const speedMultiplier = window.innerWidth < 479 ? 0.25 : window.innerWidth < 991 ? 0.5 : 1;

    let marqueeSpeed = marqueeSpeedAttr * (marqueeContent.offsetWidth / window.innerWidth) * speedMultiplier;

    // Precompute styles for the scroll container
    marqueeScroll.style.marginLeft = `${scrollSpeedAttr * -1}%`;
    marqueeScroll.style.width = `${(scrollSpeedAttr * 2) + 100}%`;

    // Duplicate marquee content
    if (duplicateAmount > 0) {
      const fragment = document.createDocumentFragment();
      for (let i = 0; i < duplicateAmount; i++) {
        fragment.appendChild(marqueeContent.cloneNode(true));
      }
      marqueeScroll.appendChild(fragment);
    }

    // GSAP animation for marquee content
    const marqueeItems = marquee.querySelectorAll('[data-marquee-collection-target]');
    const animation = gsap.to(marqueeItems, {
      xPercent: -100, // Move completely out of view
      repeat: -1,
      duration: marqueeSpeed,
      ease: 'linear'
    }).totalProgress(0.5);

    // Initialize marquee in the correct direction
    gsap.set(marqueeItems, { xPercent: marqueeDirectionAttr === 1 ? 100 : -100 });
    animation.timeScale(marqueeDirectionAttr); // Set correct direction
    animation.play(); // Start animation immediately

    // Set initial marquee status
    marquee.setAttribute('data-marquee-status', 'normal');

    // ScrollTrigger logic for direction inversion
    ScrollTrigger.create({
      trigger: marquee,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        const isInverted = self.direction === 1; // Scrolling down
        const currentDirection = isInverted ? -marqueeDirectionAttr : marqueeDirectionAttr;

        // Update animation direction and marquee status
        animation.timeScale(currentDirection);
        marquee.setAttribute('data-marquee-status', isInverted ? 'normal' : 'inverted');
      }
    });

    // Extra speed effect on scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: marquee,
        start: '0% 100%',
        end: '100% 0%',
        scrub: 0
      }
    });

    const scrollStart = marqueeDirectionAttr === -1 ? scrollSpeedAttr : -scrollSpeedAttr;
    const scrollEnd = -scrollStart;

    tl.fromTo(marqueeScroll, { x: `${scrollStart}vw` }, { x: `${scrollEnd}vw`, ease: 'none' });
  });
}

function allGsapAnimations() {
  initScrambleOnHover()
  alianAnimation()
  dragJoystick()
  initMarqueeScrollDirection();
}

export default allGsapAnimations;