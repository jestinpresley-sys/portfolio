// reveal on scroll
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('in'));
}

// contact form (AJAX submit via Formspree)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  const statusEl = document.getElementById('formStatus');
  const submitBtn = contactForm.querySelector('button[type="submit"]');

  const showStatus = (msg, ok) => {
    statusEl.textContent = msg;
    statusEl.className = 'form-status show ' + (ok ? 'ok' : 'err');
  };

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    try {
      const res = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        showStatus('Message sent — I\'ll get back to you soon.', true);
        contactForm.reset();
      } else {
        showStatus('Something went wrong — try emailing me directly instead.', false);
      }
    } catch (err) {
      showStatus('Something went wrong — try emailing me directly instead.', false);
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send message →';
    }
  });
}
