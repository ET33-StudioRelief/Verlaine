import 'swiper/css';
import 'swiper/css/navigation';

import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

export const initTableSwiper = () => {
  const swiper = new Swiper('.swiper.is-table', {
    modules: [Navigation],
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    navigation: {
      nextEl: '.my-swiper-button-next',
      prevEl: '.my-swiper-button-prev',
    },
  });

  return swiper;
};
