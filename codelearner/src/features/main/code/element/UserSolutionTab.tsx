import React from "react";
import USolutionView from "../../../../components/solution/elements/USolutionView";
import { useUSolutionInfo } from "../../../hooks/solution/useUSolutionInfo";
import { Spinner } from "react-bootstrap";

const UserSolutionTab: React.FC<{ user_sol_id: string }> = ({
  user_sol_id,
}) => {
  const { loading, user_solution } = useUSolutionInfo(user_sol_id);
  if (loading) {
    return (
      <>
        <h4>User Solution</h4>
        <Spinner animation="border"/>
      </>
    )
  }

  return (
    <div>
      <h4>User Solution</h4>
      <USolutionView solution={user_solution!} />
    </div>
  );
};

export default UserSolutionTab;
