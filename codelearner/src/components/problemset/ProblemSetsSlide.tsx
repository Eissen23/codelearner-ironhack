import { useEffect, useState } from "react";
import { ProblemSet } from "../../types/org/problem_set.type";
import { getProblemSet } from "../../service/api/problem-set-manage/getProblemSet";
import SwiperCustom from "../../features/main/custom-swiper/SwiperCustom";
import type { SwiperOptions } from "swiper/types";
import "../../assets/style/ProblemSetSlide.css";
import { Navigation } from "swiper/modules";

const ProblemSetSlide = () => {
  const [problemSets, setProblemSets] = useState<ProblemSet[] | null>(null);
  const [loading, setLoading] = useState(false);
  const opt: SwiperOptions = {
    slidesPerView: "auto",
    spaceBetween: 15,
    navigation: true,
    modules: [Navigation],
  };

  useEffect(() => {
    const fetchProblemSets = async () => {
      try {
        setLoading(true);
        const response = await getProblemSet();
        setProblemSets(response.problem_sets.data);
      } catch (err) {
        console.log("Error when fetch problem set");
      } finally {
        setLoading(false);
      }
    };

    fetchProblemSets();
  }, []);

  if (loading) {
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
