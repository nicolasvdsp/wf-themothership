import lottie from 'lottie-web';

function headerLottieAnimation() {
  // Wacht tot de DOM geladen is

  const coinIcon = document.querySelector('.icon-coin img[data-icon-type="coin"]');

  if (coinIcon) {
    // Vervang de afbeelding door een div-container voor Lottie
    const lottieContainer = document.createElement("div");
    lottieContainer.setAttribute("data-icon-type", "coin");
    // lottieContainer.style.width = "100%"; // Past zich aan de parent aan
    // lottieContainer.style.height = "100%"; // Past zich aan de parent aan
    coinIcon.parentNode.appendChild(lottieContainer);

    // Laad de Lottie animatie
    lottie.loadAnimation({
      container: lottieContainer, // Injecteer Lottie in de div
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "https://cdn.prod.website-files.com/60d5a96fc98e9b43b33e3ebc/67dd82eacb9df19aae9b6ef1_4f29336864ab353514ababd9e20d714d_lottie-coin.json",
    });

    // coinIcon.remove();
  }
}
function headerLottieAnimation2() {
  // Wacht tot de DOM geladen is

  const spanIconCoin = document.querySelector('.icon-coin');

  if (spanIconCoin) {
    // Vervang de afbeelding door een div-container voor Lottie
    const lottieContainer = document.createElement("div");
    lottieContainer.setAttribute("data-icon-type", "coin");
    // lottieContainer.style.width = "100%"; // Past zich aan de parent aan
    // lottieContainer.style.height = "100%"; // Past zich aan de parent aan
    spanIconCoin.appendChild(lottieContainer);

    // Laad de Lottie animatie
    lottie.loadAnimation({
      container: lottieContainer, // Injecteer Lottie in de div
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "https://cdn.prod.website-files.com/60d5a96fc98e9b43b33e3ebc/67dd82eacb9df19aae9b6ef1_4f29336864ab353514ababd9e20d714d_lottie-coin.json",
    });

    // coinIcon.remove();
  }
}

function allLottieAnimations() {
  // headerLottieAnimation()
  // headerLottieAnimation2()
}

export default allLottieAnimations;