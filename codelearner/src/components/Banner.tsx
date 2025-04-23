import "./assets/style/Banner.css";
import "/assets/images/Gradient_builder_2.jpg";

function Banner() {
  return (
    <div
      className="banner"
      style={{
        height: "70vh",
        backgroundImage: "url(../assets/images/Gradient_builder_2.jpg)",
        backgroundSize: "cover",
      }}
    >
      <div className="d-flex text-center justify-content-center flex-column">
        <h1>Welcome to Codelearner</h1>
        <p>Your journey to coding expertise starts here</p>
      </div>
    </div>
  );
}

export default Banner;
