import LayoutHome from "../../layout/LayoutHome";
import ProblemSetList from "../../components/problemset/ProblemSetList";
import { Tab, Tabs } from "react-bootstrap";
import { useState } from "react";
import { useAuth } from "../../context/auth/AuthContext";
import CreateProblemSet from "../../components/form/CreateProblemSet";
import Filter from "../../features/main/filter/Filter";

const ProblemSetPage = () => {
  const [key, setKey] = useState("home");
  const { isAuthenticated } = useAuth();
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
        {isAuthenticated && (
          <Tab eventKey="Create" title="Create">
            <CreateProblemSet />
          </Tab>
        )}
      </Tabs>
    </LayoutHome>
  );
};

export default ProblemSetPage;
