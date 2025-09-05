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

function enableSubmitButton() {
  const forms = document.querySelectorAll('form[data-enable-submit-form]');

  forms.forEach(form => {
    const triggerButton = form.querySelector('[data-enable-submit-form="button"]'); // jouw custom styled knop
    const triggerButtonText = triggerButton.querySelector('.button_text');
    console.log(triggerButtonText);
    const hiddenSubmit = form.querySelector('.hiddensubmit'); // verborgen echte submit (type="submit")

    const requiredFields = form.querySelectorAll('input[required], textarea[required]');
    const requiredCheckboxTerms = form.querySelector('input[type="checkbox"]:not([data-require-group])');
    const requiredCheckboxes = form.querySelectorAll('input[type="checkbox"][data-require-group]');

    // ✅ bij klikken op custom knop
    triggerButton.addEventListener('click', (e) => {
      e.preventDefault();
      if (triggerButton.classList.contains('is-enabled')) {
        hiddenSubmit.click(); // trigger de echte submit
      }
    });

    // ✅ validatie
    form.addEventListener('input', function () {
      const allFieldsFilled = Array.from(requiredFields).every(field => field.value.trim() !== '');
      const checkboxGroupValid = requiredCheckboxes.length > 0
        ? Array.from(requiredCheckboxes).some(checkbox => checkbox.checked)
        : true;
      const termsChecked = requiredCheckboxTerms ? requiredCheckboxTerms.checked : true;

      if (allFieldsFilled && checkboxGroupValid && termsChecked) {
        triggerButton.classList.add('is-enabled');
        triggerButtonText.setAttribute('data-scramble-text', 'Engage Flux Capacitor');
      } else {
        triggerButtonText.setAttribute('data-scramble-text', 'All fields are required');
        triggerButton.classList.remove('is-enabled');
      }
    });
  });
}

function contact() {
  feedbackCopied();
  enableSubmitButton();
}

export default contact;