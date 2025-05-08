import Banner from "../features/main/Banner";
import SwiperCustom from "../features/main/custom-swiper/SwiperCustom";
import LayoutHome from "../layout/LayoutHome";
import "../assets/style/Home.css";
import ProblemAccordionList from "../features/main/problems/ProblemsAccordion";

const slideInfo = [
  {
    title: "Welcome to Codelearner",
    description: "Welcome to Codelearner",
    image: "/assets/images/Frontpage/code.png",
  },
  {
    title: "New Course",
    description: "New Course",
    image: "/assets/images/Frontpage/online-learning.png",
  },
  {
    title: "Programming",
    description: "Programming",
    image: "/assets/images/Frontpage/programing.png",
  },
  {
    title: "Learn with community",
    description: "Learn with community",
    image: "/assets/images/Frontpage/stakeholder.png",
  },
];

const options = {
  slidesPerView: 3,
  spaceBetween: 15,
};

const Home = () => {
  return (
    <LayoutHome className="home">
      <Banner title="Welcome to Codelearner" variant="info">
        <h1>Welcome to codelearner</h1>
      </Banner>
      <div className="py-5">
        <h3 className="mb-4 text-center">Why us</h3>
        <SwiperCustom slides={slideInfo} options={options} />
      </div>
      <div className="py-5">
        <ProblemAccordionList />
      </div>
    </LayoutHome>
  );
};

export default Home;
