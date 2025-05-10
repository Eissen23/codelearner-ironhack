import OrgList from "../../components/org/org/OrgList";
import LayoutHome from "../../layout/LayoutHome";
import { Tab, Tabs } from "react-bootstrap";
import { useState } from "react";
import { useAuth } from "../../context/auth/AuthContext";
import CreateOrganizationForm from "../../components/form/CreateOrganizationForm";
import Filter from "../../features/main/filter/Filter";
import UserOrg from "../../components/org/moderator/UserOrg";
const Org = () => {
  const [key, setKey] = useState("home");
  const { isAuthenticated, token } = useAuth();
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
          <OrgList />
        </Tab>
        {isAuthenticated && (
          <Tab eventKey="Create" title="Create">
            <CreateOrganizationForm />
          </Tab>
        )}
        {token && (
          <Tab eventKey="YourOrg" title="Your Org">
            <UserOrg token={token || ""} />
          </Tab>
        )}
      </Tabs>
    </LayoutHome>
  );
};

export default Org;
