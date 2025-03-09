import Split from "react-split";
import Problem from "../components/Problem";
import Codespace from "../components/Codespace";

const Code = () => {
  return (
    <div>
      <Split
        sizes={[25, 75]}
        minSize={100}
        expandToMin={false}
        gutterSize={10}
        gutterAlign="center"
        snapOffset={30}
        dragInterval={1}
        direction="horizontal"
        cursor="col-resize"
      >
        <Problem />
        <Codespace />
      </Split>
    </div>
  );
};

export default Code;
