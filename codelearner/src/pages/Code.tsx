import Split from "react-split";
import Problem from "../components/Problem";
import Codespace from "../components/Codespace";
import "../assets/style/Code.css";
import LayoutHome from "../layout/LayoutMain";

const Code = () => {
  return (
    <div>
      <LayoutHome noGutter>
        <Split className="split">
          <Problem />
          <Codespace />
        </Split>
      </LayoutHome>
    </div>
  );
};

export default Code;
