/**
 * Road Dev - Main JavaScript
 * Handles navigation, form submission, and smooth interactions
 */

// Mobile menu toggle
function initMobileMenu() {
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');

  if (!mobileMenuButton || !mobileMenu) return;

  mobileMenuButton.addEventListener('click', () => {
    const isHidden = mobileMenu.classList.toggle('hidden');
    mobileMenuButton.setAttribute('aria-expanded', String(!isHidden));
  });

  // Close menu when a link is clicked
  const menuLinks = mobileMenu.querySelectorAll('a');
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      mobileMenuButton.setAttribute('aria-expanded', 'false');
    });
  });
}

// Smooth scroll for anchor links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// Form submission handler
function initFormHandling() {
  const contactForm = document.querySelector('form');
  if (!contactForm) return;

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    };

    // Validate form
    if (!data.name || !data.email || !data.message) {
      showNotification('Please fill in all fields', 'error');
      return;
    }

    if (!isValidEmail(data.email)) {
      showNotification('Please enter a valid email', 'error');
      return;
    }

    // Simulate form submission
    const button = this.querySelector('button[type="submit"]');
    const originalText = button.textContent;
    button.textContent = 'Sending...';
    button.disabled = true;

    setTimeout(() => {
      button.textContent = originalText;
      button.disabled = false;
      showNotification("Message sent successfully! We'll be in touch soon.", 'success');
      this.reset();
    }, 1500);
  });
}

// Email validation utility
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Show notification message
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `fixed bottom-4 right-4 px-6 py-4 rounded-lg text-white shadow-lg ${
    type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500'
  }`;
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transition = 'opacity 0.3s';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Active nav link indicator (optional)
function initNavIndicator() {
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  
  const updateActiveLink = () => {
    let currentSection = '';
    
    document.querySelectorAll('section[id]').forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 100) {
        currentSection = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('text-indigo-600', 'font-semibold');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('text-indigo-600', 'font-semibold');
      }
    });
  };

  window.addEventListener('scroll', updateActiveLink);
}

// Initialize all functionality
function initApp() {
  console.log('Initializing Road Dev app...');
  initMobileMenu();
  initSmoothScroll();
  initFormHandling();
  initNavIndicator();
  console.log('App initialized successfully');
}

// Run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
