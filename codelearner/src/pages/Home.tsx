import Banner from "../features/main/Banner";
import SwiperCustom from "../features/main/custom-swiper/SwiperCustom";
import LayoutHome from "../layout/LayoutMain";
const slideInfo = [
  {
    title: "Welcome to Codelearner",
    description: "Welcome to Codelearner",
    image: "https://placehold.co/300x400",
  },
  {
    title: "New Course",
    description: "New Course",
    image: "https://placehold.co/300x400",
  },
  {
    title: "Programming",
    description: "Programming",
    image: "https://placehold.co/300x400",
  },
  {
    title: "Learn with community",
    description: "Learn with community",
    image: "https://placehold.co/300x400",
  },
];

const options = {
  slidesPerView: 3,
  spaceBetween: 30,
};

const Home = () => {
  return (
    <LayoutHome>
      <Banner title="Welcome to Codelearner" variant="info">
        <h1>Welcome to codelearner</h1>
      </Banner>
      <SwiperCustom slides={slideInfo} options={options} />
    </LayoutHome>
  );
};

export default Home;
