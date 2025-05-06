import LayoutHome from "../../layout/LayoutHome";
import ProblemSetList from "../../features/main/problems/ProblemSetList";
import FilterBar from "../../features/main/filter/FilterBar";
import { Tab, Tabs } from "react-bootstrap";
import { useState } from "react";
import { useAuth } from "../../context/auth/AuthContext";
import CreateProblemSet from "../../components/form/CreateProblemSet";

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
          <FilterBar />
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
