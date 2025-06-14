import LayoutHome from "../../layout/LayoutHome";
import ProblemSetList from "../../components/problemset/ProblemSetList";
import { Tab, Tabs } from "react-bootstrap";
import { useState } from "react";
import Filter from "../../features/main/filter/Filter";

const ProblemSetPage = () => {
  const [key, setKey] = useState("home");
  return (
    <LayoutHome>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k || "")}
        className="mb-3 mt-4"
      >
        <Tab eventKey="home" title="Home">
          <Filter />
          <ProblemSetList />
        </Tab>
      </Tabs>
    </LayoutHome>
  );
};

export default ProblemSetPage;
