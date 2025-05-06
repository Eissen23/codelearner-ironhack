import FilterBar from "../../features/main/filter/FilterBar";
import OrgList from "../../features/main/org/OrgList";
import LayoutHome from "../../layout/LayoutHome";
import { Tab, Tabs } from "react-bootstrap";
import { useState } from "react";
import { useAuth } from "../../context/auth/AuthContext";
import CreateOrganizationForm from "../../components/form/CreateOrganizationForm";
const Org = () => {
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
          <OrgList />
        </Tab>
        {isAuthenticated && (
          <Tab eventKey="Create" title="Create">
            <CreateOrganizationForm />
          </Tab>
        )}
      </Tabs>
    </LayoutHome>
  );
};

export default Org;
