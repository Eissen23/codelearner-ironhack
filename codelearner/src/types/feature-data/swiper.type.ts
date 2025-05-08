import { SwiperOptions } from "swiper/types";

export type SlideData = {
  title: string;
  description: string;
  image?: string;
  url?: string;
  bg?: string;
};

export type SwiperCustomProps = {
  slides: SlideData[];
  slider_view?: string;
  options?: SwiperOptions;
  className?: string;
};
