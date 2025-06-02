import Banner from "../features/main/Banner";
import SwiperCustom from "../features/main/custom-swiper/SwiperCustom";
import LayoutHome from "../layout/LayoutHome";
import "../assets/style/Home.css";
import ProblemAccordionList from "../components/problems/ProblemsAccordion";
import { Container } from "react-bootstrap";
import CourseList from "../components/courses/CourseList";
import OrgList from "../components/org/org/OrgList";

const slideInfo = [
  {
    title: "Welcome to Codelearner",
    description: "Welcome to Codelearner",
    image: "/assets/images/Frontpage/code.png",
  },
  {
    title: "Brand New Course",
    description: "New Course",
    image: "/assets/images/Frontpage/online-learning.png",
  },
  {
    title: "Stay Programming",
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
  slidesPerView: 4,
  spaceBetween: 15,
};

const Home = () => {
  return (
    <LayoutHome className="home" noGutter>
      <Banner title="Lorem ifsum" variant="info">
        <h1>Welcome to codelearner</h1>
      </Banner>
      <Container>
        <div className="py-5">
          <h3 className="mb-4 text-center">Why us</h3>
          <SwiperCustom slides={slideInfo} options={options} />
        </div>
        <div className="pb-5">
          <ProblemAccordionList />
        </div>

        <div className="pb-5">
          <h3 className="mb-4 text-center">Courses</h3>
          <CourseList />
        </div>

        <div className="pb-5">
          <h3 className="mb-4 text-center">Featured Org</h3>
          <OrgList />
        </div>
      </Container>
    </LayoutHome>
  );
};

export default Home;
