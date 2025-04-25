import { SwiperOptions } from "swiper/types";

export interface SlideData {
    title: string;
    description: string;
    image: string;
}

export interface SwiperCustomProps {
    slides: SlideData[];
    options?: SwiperOptions;
    className?: string;
}