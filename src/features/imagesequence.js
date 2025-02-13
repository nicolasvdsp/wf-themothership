import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function sequenceAnimation(parentClass, bucketURL, width, height, frames) {
  const container = document.querySelector(`.${parentClass}`);
  if (!container) {
    console.error(`❌ Container ${parentClass} niet gevonden!`);
    return;
  }

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  container.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  const frameCount = frames;
  const images = [];

  for (let i = 0; i < frameCount; i++) {
    let img = new Image();
    img.src = `${bucketURL}${String(i).padStart(4, '0')}.png`;
    images.push(img);
  }

  let currentFrame = 0;

  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(images[currentFrame], 0, 0, canvas.width, canvas.height);
  }
  render();

  // ✅ Automatische animatie op standaard snelheid (20 FPS)
  // gsap.to({}, {
  //   repeat: -1,
  //   duration: 2,
  //   onUpdate: () => {
  //     currentFrame = (currentFrame + 1) % frameCount;
  //     render();
  //   }
  // });

  // ✅ Scroll versnelt de animatie
  // gsap.to({}, {
  //   scrollTrigger: {
  //     trigger: container,
  //     start: "top",
  //     end: "bottom",
  //     scrub: 2,
  //   },
  //   onUpdate: () => {
  //     currentFrame = (currentFrame + 3) % frameCount;
  //     render();
  //   }
  // });
}

function imagesequence() {

  // sequenceAnimation(
  //   "image-sequence",
  //   "https://the-mothership-collective.s3.eu-north-1.amazonaws.com/image_sequence-phone/phone-",
  //   390,
  //   390,
  //   40
  // );


}

export default imagesequence;