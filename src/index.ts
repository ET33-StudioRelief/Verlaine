import './index.css';

import { initFormHandling } from './utils/form';
import {
  animateFaqItems,
  animatePricingFeatures,
  animatePricingGrid,
  animatePricingTable,
  animateSummarizeCards,
} from './utils/gsap';
import { initTableSwiper } from './utils/swiper';

// Initialiser la gestion du formulaire
window.Webflow ||= [];
window.Webflow.push(() => {
  initFormHandling();
  animatePricingTable();
  animateSummarizeCards();
  animateFaqItems();
  animatePricingGrid();
  animatePricingFeatures();
  initTableSwiper();
});
