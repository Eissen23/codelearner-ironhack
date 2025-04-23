import Split from "react-split";
import Problem from "../components/Problem";
import Codespace from "../components/Codespace";
import "../assets/style/Code.css";

const Code = () => {
  return (
    <div>
      <Split className="split">
        <Problem />
        <Codespace />
      </Split>
    </div>
  );
};

export default Code;
