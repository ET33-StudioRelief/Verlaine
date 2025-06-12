import './index.css';

import { initFormHandling } from './utils/form';
import {
  animateFaqItems,
  animatePricingFeatures,
  animatePricingGrid,
  animatePricingTable,
  animateSummarizeCards,
} from './utils/gsap';
import { initPopupFormHandling } from './utils/popup';
import { initTableSwiper } from './utils/swiper';

// Initialiser la gestion du formulaire
window.Webflow ||= [];
window.Webflow.push(() => {
  initFormHandling();
  initPopupFormHandling();
  animatePricingTable();
  animateSummarizeCards();
  animateFaqItems();
  animatePricingGrid();
  if (window.location.pathname === '/') {
    animatePricingFeatures();
  }
  initTableSwiper();
});
