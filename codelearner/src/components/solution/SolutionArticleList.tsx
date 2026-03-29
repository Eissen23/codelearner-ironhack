import { Link, useParams } from "react-router";
import { useSArticleList } from "../../features/hooks/solution/useSArticleList";
import { Alert, Button, ListGroup, Spinner } from "react-bootstrap";
import { getVersionName } from "../../data/LanguageVersion";
import { getLanguageKey } from "../../data/LanguageMapping";
const SolutionArticleList: React.FC<{ editable?: boolean }> = ({
  editable = false,
}) => {
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
                <div className="d-flex justify-content-between">
                  <h6>
                    {solution.name ||
                      `${getLanguageKey(solution.language)} solution #${
                        index + 1
                      }`}
                  </h6>
                  <div>{getVersionName(solution.language)}</div>
                  {editable ? (
                    <Link to={`/setting/solution-article/${solution.id}`}>
                      To solution
                    </Link>
                  ) : (
                    <Link to={{
                      search: `?solution=${solution.id}`
                    }}>
                      To solution
                    </Link>
                  )}
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      ) : (
        <Alert variant="info">No solution article published</Alert>
      )}
      {editable && (
        <div className="add_solution">
          <Button variant="primary" size="sm">
            <Link
              className="text-decoration-none text-white"
              to={`add-solution`}
            >
              Add solution article
            </Link>
          </Button>
        </div>
      )}
    </>
  );
};

export default SolutionArticleList;
