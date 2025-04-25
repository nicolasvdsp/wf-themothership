function feedbackCopied() {
  let contactItems = document.querySelectorAll(".contact_item");
  if (!contactItems) return;

  contactItems.forEach(item => {
    let msg = item.querySelector('.feedback-message')
    if (!msg) return;
    console.log(msg);
    item.addEventListener('click', () => {
      msg.classList.add('reveal-feedback-message');
      msg.style.opacity = 100;
      msg.style.transform = 'translateY(0px)';
      setTimeout(() => {
        msg.style.transform = 'translateY(2px)';
        msg.style.opacity = 0;
        setTimeout(() => {
          msg.classList.remove('reveal-feedback-message');
          msg.style.transform = 'translateY(-4px)';
        }, 200);
      }, 1200);
    })
  });
}

function contact() {
  feedbackCopied();
}

export default contact;