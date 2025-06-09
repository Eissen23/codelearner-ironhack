import { Button, Spinner, Offcanvas } from "react-bootstrap";
import { ResultData } from "../../../../types/code/judge0.type";
import { useCallback, useEffect, useState } from "react";
import {  generateCodeEvaluation } from "../../../../service/ai-service/generateEvaluation";
import { getLanguageKey } from "../../../../data/LanguageMapping";
import { ProblemData } from "../../../../types/content/problem.type";

const PopupAIEval: React.FC<{
  data?: ResultData;
  problemData?: ProblemData
}> = ({ data, problemData }) => {

  const [showPopup, setShowPopup] = useState(false);
  const [evaluation, setEval] = useState<string>()
  const [isLoading, setIsLoading] = useState(false);


  const fetchAIEvaluate = useCallback(async () => {
    if (!data || !problemData){
      return;
    }

    if(data.result !== 'Accepted'){
      return;
    }


    try{
      setIsLoading(true);
      const evaluation = await generateCodeEvaluation(
        data?.source_code,  // Your source code as a string
        getLanguageKey(data?.language_id),    // Programming language
        {
          description: problemData?.description,
        }
      );
      setEval(evaluation);
      console.log("True evaluation", evaluation)
    }catch(error) {
      console.log("error fetchAIEvaluate", error);
    }finally{
      setIsLoading(false);
    }
  }, [data, problemData]);

  const handleShowPopup = useCallback(() => {
    setShowPopup(true);
  }, []);

  const handleHidePopup = useCallback(() => {
    setShowPopup(false);
  }, []);

  useEffect(() => {
    if (!data){
      return;
    }
    if (!evaluation){
      fetchAIEvaluate();
    }
  }, [data, problemData]);

  return (
    <>
      <Button
        className={`popup_ai_eval ${(data?.result === 'Accepted') ? "" : "none"}`}
        onClick={handleShowPopup}
      >
        <div className="popup_ai_eval_content button">
          <i className="bi bi-info-circle-fill"></i>
          <span>Evaluation</span>
        </div>
      </Button>

      <Offcanvas show={showPopup} onHide={handleHidePopup} style={{  width: "50vw"}}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Evaluation</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {!isLoading ? (
            <div className="evaluation-content">
              {evaluation ? (
                <p >
                  <pre>{evaluation}</pre>
                  
                </p>
              ) : (
                <p>No evaluation available</p>
              )}
            </div>
          ) : (
            <div className="d-flex justify-content-center">
              <Spinner animation="border" />
            </div>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default PopupAIEval;
