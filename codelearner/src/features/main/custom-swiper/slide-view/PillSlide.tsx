import { SlideData } from "../../../../types/feature-data/swiper.type";
import { Link } from "react-router";

const PillSlide = (slide: SlideData) => {
  return (
    <div className="">
      <Link to={`${slide.url}`}>
        <button
          type="button"
          className="btn btn-pill rounded-pill btn-outline-secondary btn-sm"
        >
          {slide.title}
        </button>
      </Link>
    </div>
  );
};

export default PillSlide;
