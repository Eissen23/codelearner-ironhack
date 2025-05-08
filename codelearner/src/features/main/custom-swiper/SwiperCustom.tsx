import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { SwiperOptions } from "swiper/types";
import { SwiperCustomProps } from "../../../types/feature-data/swiper.type";
import { BasicSlide } from "./slide-view/BasicSlide";
import PillSlide from "./slide-view/PillSlide";

const defaultOptions = {
  spaceBetween: 30,
  slidesPerView: 1,
  navigation: true,
  pagination: { clickable: true },
};

export default ({
  slides,
  slider_view,
  options = {},
  className,
}: SwiperCustomProps) => {
  const mergedOptions: SwiperOptions = { ...defaultOptions, ...options };

  const renderOption = (slider_view = "basic") => {
    switch (slider_view) {
      case "pill":
        return PillSlide;
      default:
        return BasicSlide;
    }
  };

  const SlideView = renderOption(slider_view);

  return (
    <Swiper {...mergedOptions} className={className}>
      {/* slides */}
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <SlideView {...slide} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
