import HeadNav from "../components/HeadNav";
import Banner from "../components/Banner";

const Home = () => {
  return (
    <div>
      <HeadNav></HeadNav>
      <Banner title="Welcome to Codelearner" variant="info">
        <h1>Welcome to codelearner</h1>
      </Banner>
    </div>
  );
};

export default Home;
