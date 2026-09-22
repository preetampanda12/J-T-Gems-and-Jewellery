/**
 * MESSIKA-Style Luxury Jewelry Website
 * Interactive functionality, smooth scrolling, and animations
 */

document.addEventListener('DOMContentLoaded', () => {


  // ===== Page Loader =====
  const pageLoader = document.getElementById('pageLoader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      pageLoader.classList.add('loaded');
    }, 800);
  });

  // Fallback: hide loader after 3s
  setTimeout(() => {
    pageLoader.classList.add('loaded');
  }, 3000);

  // ===== Header Scroll Behavior =====
  const header = document.getElementById('mainHeader');
  const heroSection = document.getElementById('hero');
  
  function updateHeader() {
    const scrollY = window.scrollY;
    const heroBottom = heroSection ? heroSection.offsetHeight - 100 : 300;
    const bottomNav = document.querySelector('.mobile-bottom-nav');

    if (scrollY > heroBottom) {
      header.classList.remove('header--transparent');
      header.classList.add('header--solid');
      if (bottomNav) bottomNav.classList.add('solid');
    } else {
      header.classList.add('header--transparent');
      header.classList.remove('header--solid');
      if (bottomNav) bottomNav.classList.remove('solid');
    }
  }

  window.addEventListener('scroll', () => {
    requestAnimationFrame(updateHeader);
  });

  updateHeader();

  // ===== Mobile Navigation =====
  const mobileNavToggleBottom = document.getElementById('mobileNavToggleBottom');
  const mobileNav = document.getElementById('mobileNav');

  if (mobileNavToggleBottom && mobileNav) {
    mobileNavToggleBottom.addEventListener('click', () => {
      mobileNavToggleBottom.classList.toggle('active');
      mobileNav.classList.toggle('active');
      document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';

      if (!mobileNav.classList.contains('active')) {
        updateHeader();
      }
    });
  }

  // ===== Scroll Reveal Animations Disabled =====

  // ===== Back to Top Button =====
  const backToTop = document.getElementById('backToTop');

  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > window.innerHeight) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ===== Parallax Effect on Split Banners Disabled =====

  // ===== Smooth Hero Video Parallax =====
  const heroMedia = document.querySelector('.hero__media');
  
  let currentHeroTranslateY = 0;
  let targetHeroTranslateY = 0;
  let currentHeroOpacity = 1;
  let targetHeroOpacity = 1;

  function updateHeroParallax() {
    if (!heroMedia || !heroSection) return;
    const scrollY = Math.max(0, window.scrollY);
    const heroHeight = heroSection.offsetHeight;

    if (scrollY <= heroHeight + 100) {
      targetHeroTranslateY = scrollY * 0.4; // 40% parallax speed
      targetHeroOpacity = Math.max(0, 1 - (scrollY / heroHeight) * 1.2);
    }
  }

  function renderSmoothHeroParallax() {
    if (heroMedia && heroSection) {
      // 0.15 lerp is snappier, reducing "sluggish" feeling while maintaining smoothness
      currentHeroTranslateY += (targetHeroTranslateY - currentHeroTranslateY) * 0.15;
      currentHeroOpacity += (targetHeroOpacity - currentHeroOpacity) * 0.15;
      
      // Use translate3d for hardware acceleration (GPU rendering)
      heroMedia.style.transform = `translate3d(0, ${currentHeroTranslateY}px, 0)`;
      
      const content = heroSection.querySelector('.hero__content');
      if(content) {
        // Preserve the -50% translateX centering from CSS!
        content.style.transform = `translate3d(-50%, ${currentHeroTranslateY * 0.6}px, 0)`;
        content.style.opacity = currentHeroOpacity;
      }
    }
    requestAnimationFrame(renderSmoothHeroParallax);
  }

  window.addEventListener('scroll', () => {
    updateHeroParallax();
  }, { passive: true });
  
  // Start the smooth rendering loop
  renderSmoothHeroParallax();

  // ===== Smooth Anchor Scrolling =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      e.preventDefault();
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });

  // ===== Newsletter Form =====
  const newsletterForm = document.getElementById('newsletterForm');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input[type="email"]');
      const submitBtn = newsletterForm.querySelector('.newsletter__submit');

      if (input.value) {
        submitBtn.textContent = 'Thank you ✓';
        submitBtn.style.opacity = '0.5';
        input.value = '';
        input.placeholder = 'Successfully subscribed';
        input.disabled = true;

        setTimeout(() => {
          submitBtn.textContent = 'Subscribe';
          submitBtn.style.opacity = '1';
          input.placeholder = 'Enter your email address';
          input.disabled = false;
        }, 3000);
      }
    });
  }

  // ===== Hover Effects for Category Cards =====
  const categoryCards = document.querySelectorAll('.category-card');

  categoryCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      categoryCards.forEach(c => {
        if (c !== card) {
          c.style.opacity = '0.65';
          c.style.transition = 'opacity 0.6s ease';
        }
      });
    });

    card.addEventListener('mouseleave', () => {
      categoryCards.forEach(c => {
        c.style.opacity = '1';
      });
    });
  });

  // ===== Subtle Cursor Glow Disabled =====

  // ===== Image Lazy Loading Fade Disabled =====

  // ===== Stagger Animation for Service Items Disabled =====

  // ===== Rotating Announcement Messages =====
  const announcementText = document.querySelector('.announcement-bar__text');
  if (announcementText) {
    const messages = [
      'Complimentary Shipping & Returns · Discover Our New High Jewelry Collection · Book a Private Appointment',
      'Free Engraving on Selected Pieces · New Move Collection Available · Visit Our Flagship Boutique',
      'Exclusive Online Offers · Bespoke Jewelry Service · Schedule a Virtual Consultation'
    ];
    let messageIndex = 0;

    setInterval(() => {
      announcementText.style.opacity = '0';
      announcementText.style.transform = 'translateY(-10px)';

      setTimeout(() => {
        messageIndex = (messageIndex + 1) % messages.length;
        announcementText.textContent = messages[messageIndex];
        announcementText.style.opacity = '1';
        announcementText.style.transform = 'translateY(0)';
      }, 400);
    }, 5000);

    announcementText.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
  }

  // ===== Ensure Video Plays (4K) =====
  const heroVideoEl = document.getElementById('heroVideo');
  if (heroVideoEl) {
    // Force play on user interaction if autoplay fails
    heroVideoEl.play().catch(() => {
      document.addEventListener('click', () => {
        heroVideoEl.play();
      }, { once: true });
    });
  }
  // ===== Category Carousel Logic =====
  const categoryGrid = document.querySelector('.category-grid');
  const catPrev = document.getElementById('catPrev');
  const catNext = document.getElementById('catNext');
  const catDots = document.querySelectorAll('.carousel-dot');
  
  if (categoryGrid && catPrev && catNext) {
    const getScrollAmount = () => {
      const card = categoryGrid.querySelector('.category-card');
      return card ? card.offsetWidth + 16 : 300;
    };

    catPrev.addEventListener('click', () => {
      categoryGrid.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
    });

    catNext.addEventListener('click', () => {
      categoryGrid.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
    });

    // Update dots on scroll
    categoryGrid.addEventListener('scroll', () => {
      if (categoryGrid.scrollWidth <= categoryGrid.clientWidth) return;
      const scrollRatio = categoryGrid.scrollLeft / (categoryGrid.scrollWidth - categoryGrid.clientWidth);
      const dotIndex = Math.min(
        Math.max(0, Math.round(scrollRatio * (catDots.length - 1))),
        catDots.length - 1
      );
      
      catDots.forEach((dot, index) => {
        if (index === dotIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }, { passive: true });

    // Click dots to scroll
    catDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        if (categoryGrid.scrollWidth <= categoryGrid.clientWidth) return;
        const targetScroll = (index / (catDots.length - 1)) * (categoryGrid.scrollWidth - categoryGrid.clientWidth);
        categoryGrid.scrollTo({ left: targetScroll, behavior: 'smooth' });
      });
    });
  }

  // ===== Product Carousel Logic =====
  const productCarousel = document.getElementById('productCarousel');
  const prodPrev = document.getElementById('prodPrev');
  const prodNext = document.getElementById('prodNext');
  const prodDots = document.querySelectorAll('#prodDots .carousel-dot');
  
  if (productCarousel && prodPrev && prodNext) {
    const getScrollAmount = () => {
      const card = productCarousel.querySelector('.product-card');
      return card ? card.offsetWidth + 20 : 300;
    };

    prodPrev.addEventListener('click', () => {
      productCarousel.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
    });

    prodNext.addEventListener('click', () => {
      productCarousel.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
    });

    // Update dots on scroll
    productCarousel.addEventListener('scroll', () => {
      if (productCarousel.scrollWidth <= productCarousel.clientWidth) return;
      const scrollRatio = productCarousel.scrollLeft / (productCarousel.scrollWidth - productCarousel.clientWidth);
      const dotIndex = Math.min(
        Math.max(0, Math.round(scrollRatio * (prodDots.length - 1))),
        prodDots.length - 1
      );
      
      prodDots.forEach((dot, index) => {
        if (index === dotIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }, { passive: true });

    // Click dots to scroll
    prodDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        if (productCarousel.scrollWidth <= productCarousel.clientWidth) return;
        const targetScroll = (index / (prodDots.length - 1)) * (productCarousel.scrollWidth - productCarousel.clientWidth);
        productCarousel.scrollTo({ left: targetScroll, behavior: 'smooth' });
      });
    });
  }
});
