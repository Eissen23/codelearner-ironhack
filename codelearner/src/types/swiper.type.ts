import { SwiperOptions } from "swiper/types";

export type SlideData = {
  title: string;
  description: string;
  image: string;
};

export type SwiperCustomProps = {
  slides: SlideData[];
  options?: SwiperOptions;
  className?: string;
};
