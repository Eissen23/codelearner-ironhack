import { SlideData } from "../../../../types/feature-data/swiper.type";
import { Button } from "react-bootstrap";
import { Link } from "react-router";

export const BasicSlide = (slide: SlideData) => {
  return (
    <div className="d-flex">
      {slide.image && (
        <div className="inner-image">
          <img className="img-fluid" src={slide.image} alt={slide.title} />
        </div>
      )}

      <div className="ms-3">
        <h3>{slide.title}</h3>
        <p>{slide.description}</p>
        {slide.url && (
          <Link to={`${slide.url}`} className="text-text-decoration-none">
            <Button variant="outline-primary" size="sm">
              See more
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};
