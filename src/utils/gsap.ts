import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const isDesktop = (): boolean => window.innerWidth > 992;

export const animatePricingGrid = (): void => {
  if (!isDesktop()) return;

  const section = document.querySelector('.section_pricing');
  if (!section) return;

  const gridItems = section.querySelectorAll('.pricing_grid > *');

  if (gridItems.length) {
    gsap.fromTo(
      gridItems,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power.out',
        scrollTrigger: {
          trigger: section,
          start: 'top center',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }
};

export const animatePricingTable = (): void => {
  if (!isDesktop()) return;

  const section = document.querySelector('.section_summarize');
  if (!section) return;

  const content = section.querySelector('.summarize_table');
  if (content) {
    gsap.fromTo(
      content,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }
};

export const animatePricingFeatures = (): void => {
  if (!isDesktop()) return;

  const section = document.querySelector('.section_pricing');
  if (!section) return;

  const features = section.querySelector('.pricing_features');
  const decorativeWrapper = section.querySelector('.pricing_decorativ-wrapper');

  if (features) {
    gsap.set(features, { opacity: 0, visibility: 'hidden' });
  }
  if (decorativeWrapper) {
    gsap.set(decorativeWrapper, { opacity: 0, visibility: 'hidden' });
  }

  if (features) {
    gsap.to(features, {
      opacity: 1,
      visibility: 'visible',
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.pricing_grid',
        start: 'bottom 60%',
        toggleActions: 'play none none reverse',
      },
    });
  }

  if (decorativeWrapper) {
    gsap.set(decorativeWrapper, {
      opacity: 0,
      visibility: 'hidden',
      x: 50,
    });

    gsap.to(decorativeWrapper, {
      opacity: 1,
      visibility: 'visible',
      x: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.pricing_grid',
        start: 'bottom 60%',
        toggleActions: 'play none none reverse',
      },
    });
  }
};

export const animateSummarizeCards = (): void => {
  if (!isDesktop()) return;

  const section = document.querySelector('.summarize_step');
  if (!section) return;

  const cards = section.querySelectorAll('.summarize_cards-wrapper > *');

  if (cards.length) {
    gsap.fromTo(
      cards,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }
};

export const animateFaqItems = (): void => {
  if (!isDesktop()) return;

  const section = document.querySelector('.faq1_content');
  if (!section) return;

  const faqItems = section.querySelectorAll('.faq1_list > *');

  if (faqItems.length) {
    gsap.fromTo(
      faqItems,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }
};
