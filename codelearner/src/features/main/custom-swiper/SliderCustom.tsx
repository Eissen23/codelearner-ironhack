import { Swiper, SwiperSlide } from "swiper/react";
import { SlideData } from "../../../types/swiper.type";
import { SwiperOptions } from "swiper/types";

interface SliderCustomProps {
    slides: SlideData;
    options?: SwiperOptions;
    className?: string;
}



const defaultSlide: SlideData = {
    title: "Default Title",
    description: "Default Description",
    image: "https://via.placeholder.com/150"
}



export default () => {


}


