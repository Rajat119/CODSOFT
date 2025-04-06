    // Dark Mode Toggle
    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        const icon = document.querySelector('.toggle-mode i');
        if (document.body.classList.contains('dark-mode')) {
          icon.classList.remove('fa-moon');
          icon.classList.add('fa-sun');
          document.querySelector('.toggle-mode').innerHTML = '<i class="fas fa-sun"></i> Light Mode';
          localStorage.setItem('darkMode', 'enabled');
        } else {
          icon.classList.remove('fa-sun');
          icon.classList.add('fa-moon');
          document.querySelector('.toggle-mode').innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
          localStorage.setItem('darkMode', 'disabled');
        }
      }
  
      // Check for saved dark mode preference
      if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        document.querySelector('.toggle-mode').innerHTML = '<i class="fas fa-sun"></i> Light Mode';
      }
  
      // Header scroll effect
      const header = document.getElementById('header');
      window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      });
  
      // Back to top button
      const backToTopButton = document.getElementById('backToTop');
      window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
          backToTopButton.classList.add('active');
        } else {
          backToTopButton.classList.remove('active');
        }
      });
  
      backToTopButton.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
  
      // Form submission
      const contactForm = document.getElementById('contactForm');
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
      });
  
      // Scroll animation
      const animateElements = document.querySelectorAll('.animate-on-scroll');
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
          }
        });
      }, {
        threshold: 0.1
      });
  
      animateElements.forEach(element => {
        observer.observe(element);
      });
  
      // Smooth scrolling for anchor links
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          if (targetId === '#') return;
          
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop - 80,
              behavior: 'smooth'
            });
          }
        });
      });