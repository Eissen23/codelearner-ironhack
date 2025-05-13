import SwiperCustom from "../../features/main/custom-swiper/SwiperCustom";
import type { SwiperOptions } from "swiper/types";
import "../../assets/style/ProblemSetSlide.css";
import { Navigation } from "swiper/modules";
import { useProblemSets } from "../../features/hooks/problemsets/useProblemSets";

const ProblemSetSlide = () => {
  const opt: SwiperOptions = {
    slidesPerView: "auto",
    spaceBetween: 15,
    navigation: true,
    modules: [Navigation],
  };
  const { isLoading, problemSets } = useProblemSets();

  if (isLoading) {
    return <div>is loading ....</div>;
  }

  if (!problemSets) {
    return <div>No data ....</div>;
  }
  const slideData = problemSets.map((problemSet) => ({
    title: problemSet.name,
    description: problemSet.description ? problemSet.description : "",
    url: `/problem-sets/${problemSet.id}`,
  }));

  return (
    <div className="swiper_problemset">
      <SwiperCustom
        slides={slideData}
        options={opt}
        slider_view="pill"
      ></SwiperCustom>
    </div>
  );
};

export default ProblemSetSlide;
