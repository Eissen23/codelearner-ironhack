// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import { SwiperOptions } from 'swiper/types';
import { SwiperCustomProps } from '../../../types/swiper.type';


const defaultOptions = {
    spaceBetween: 30,
    slidesPerView: 1,
    navigation: true,
    pagination: { clickable: true },
};


export default ({slides, options = {}, className}: SwiperCustomProps) => {
    const mergedOptions: SwiperOptions = { ...defaultOptions, ...options };
    return (
    <Swiper
      {...mergedOptions}
      className={className}
    >
      {/* slides */}
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <img src={slide.image} alt={slide.title} />
          <h3>{slide.title}</h3>
          <p>{slide.description}</p>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};