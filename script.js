
(() => {
  const header = document.querySelector('.site-header');
  const progress = document.querySelector('.scroll-progress');
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.primary-nav');
  const navLinks = [...document.querySelectorAll('.nav-link')];
  const form = document.querySelector('#contact-form');
  const status = document.querySelector('#form-status');
  const packageSelect = document.querySelector('#package-select');

  // Sticky header + reading progress.
  const updateScrollUI = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progressWidth = scrollable > 0
      ? (window.scrollY / scrollable) * 100
      : 0;

    progress.style.width = `${progressWidth}%`;
    header.classList.toggle('scrolled', window.scrollY > 30);
  };

  window.addEventListener('scroll', updateScrollUI, { passive: true });
  updateScrollUI();

  // Mobile navigation.
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';

    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    menuToggle.setAttribute(
      'aria-label',
      isOpen ? 'Open navigation' : 'Close navigation'
    );

    nav.classList.toggle('open', !isOpen);
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation');
    });
  });

  // Reveal sections on scroll.
  const revealItems = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -35px 0px'
      }
    );

    revealItems.forEach(item => revealObserver.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('is-visible'));
  }

  // Package selection.
  document.querySelectorAll('[data-plan]').forEach(button => {
    button.addEventListener('click', () => {
      const plan = button.dataset.plan;

      const options = [...packageSelect.options];

      const matchingOption = options.find(option =>
        option.textContent.toLowerCase().startsWith(plan.toLowerCase())
      );

      if (matchingOption) {
        packageSelect.value = matchingOption.value || matchingOption.textContent;
      }

      if (plan === 'Custom') {
        packageSelect.value = 'Custom website';
      }
    });
  });

  // Contact form feedback.
  form.addEventListener('submit', event => {
    event.preventDefault();

    if (!form.reportValidity()) return;

    status.textContent =
      'Thanks! Your enquiry is ready. Connect this form to your email or form service to receive submissions.';

    status.classList.add('success');

    form.reset();
  });

  // Automatic copyright year.
  document.querySelector('#year').textContent = new Date().getFullYear();

})();
