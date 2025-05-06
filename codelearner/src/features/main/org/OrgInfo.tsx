import { Org } from "../../../types/org/org.type";
import { getOrgsDetail } from "../../../service/api/org-manage/getOrgDetail";
import { useState, useEffect } from "react";
import { Card, Spinner } from "react-bootstrap";

const OrgInfo = ({ id }: { id: string }) => {
  const [data, setData] = useState<Org | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getOrgData = async () => {
      setLoading(true);
      try {
        const response = await getOrgsDetail(id);
        setData(response);
      } catch (error) {
        console.error("Error fetching org data:", error);
      } finally {
        setLoading(false);
      }
    };

    getOrgData();
  }, [id]);

  return (
    <Card className="OrgInfo">
      {loading ? (
        <div className="d-flex justify-content-center p-3">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : data ? (
        <Card.Body className="org-details">
          <Card.Title>{data.org_name || ""}</Card.Title>
          <Card.Text>{data.description}</Card.Text>
          <Card.Text>
            <strong>Email:</strong> {data.contact_email}
          </Card.Text>
          {data.website && (
            <Card.Text>
              <strong>Website:</strong>
              {data.website}
            </Card.Text>
          )}
          <Card.Text>
            <strong>Created in:</strong>{" "}
            {new Date(data.created_at).toLocaleDateString()}
          </Card.Text>
        </Card.Body>
      ) : (
        <Card.Body>
          <Card.Text>No organization data available.</Card.Text>
        </Card.Body>
      )}
    </Card>
  );
};

export default OrgInfo;
