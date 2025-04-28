import { useEffect, useState } from "react";
import { getProblemList } from "../../../service/api/problem-manage/getProblemList";
import { ProblemResponse } from "../../../types/problem.type";

const ProblemList = () => {
  const [problems, setProblems] = useState<ProblemResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await getProblemList();
        setProblems(response);
        // console.log(response);
      } catch (err) {
        setError("Failed to fetch problems");
      }
    };

    fetchProblems();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!problems) {
    return <div>Loading...</div>;
  }
  console.log(problems);


  return (
    <div className="problem-list">
      {problems.data.map((problem, index) => (
        <div key={index} className="problem-item">
          <h3>{problem.name}</h3>
          <p>{problem.description}</p>
          <p>Difficulty: {problem.difficulty}</p>
        </div>
      ))}
      
      {/* {problems.links && (
        <div className="pagination">
          {problems.links.map((link, index) => (
            <button 
              key={index}
              className={`page-link ${link.active ? 'active' : ''}`}
              disabled={!link.url}
            >
              {link.label}
            </button>
          ))}
        </div>
      )} */}
    </div>
  );
};

export default ProblemList;
