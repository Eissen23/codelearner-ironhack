import { Link, useParams } from "react-router";
import { useSArticleList } from "../../features/hooks/solution/useSArticleList";
import { Alert, Button, ListGroup, Spinner } from "react-bootstrap";
const SolutionArticleList = () => {
  const { problem_id } = useParams();
  const { loading, solutionArticle } = useSArticleList(problem_id || "");
  return (
    <>
      <h6 className="bg-body-secondary ps-3 py-2">Official solution article</h6>
      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" />
        </div>
      ) : solutionArticle?.length != 0 ? (
        <div className="solution_article list mb-3">
          <ListGroup>
            {solutionArticle?.map((solution, index) => (
              <ListGroup.Item key={index}>
                <h6>{solution.name}</h6>
                <span
                  className="overflow-hidden"
                  dangerouslySetInnerHTML={{
                    __html: solution.description || "",
                  }}
                ></span>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      ) : (
        <Alert variant="info">No solution article published</Alert>
      )}

      <div className="add_solution">
        <Button variant="primary" size="sm">
          <Link className="text-decoration-none text-white" to={`add-solution`}>
            Add solution article
          </Link>
        </Button>
      </div>
    </>
  );
};

export default SolutionArticleList;
