import Split from "react-split";
import Problem from "../components/Problem";
import Codespace from "../components/Codespace";
import "../assets/style/Code.css";
import LayoutHome from "../layout/LayoutMain";
import Output from "../components/Output";

const Code = () => {
  return (
    <div>
      <LayoutHome noGutter>
        <Split className="split">
          <Problem />
          <Split
            className="vertical-split"
            direction="vertical"
            minSize={100}
            maxSize={1000}
            gutterSize={5}
            gutterAlign="end"
          >
            <Codespace />
            <Output />
          </Split>
        </Split>
      </LayoutHome>
    </div>
  );
};

export default Code;
