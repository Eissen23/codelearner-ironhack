import React, { useState, useEffect, useRef } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import RichTextEditor from "../tiptap/RichTextEditor";
import CodeEditor from "../code/CodeEditor";
import useProblemDetail from "../../hooks/problems/useProblemDetail";
import { SolutionArticle } from "../../../types/content/solution.type";
import {
  getLanguageKey,
  LANGUAGE_MAPPING,
} from "../../../data/LanguageMapping";
import { makeSArticle } from "../../../service/api/solution-article/makeSArticle";
import { useAuth } from "../../../context/auth/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import CheckOutput from "../code/CheckOutput";
import { updateSArticle } from "../../../service/api/solution-article/updateSArticle";
import { deleteSarticle } from "../../../service/api/solution-article/deleteSAticle";
import { useNavigate, useParams } from "react-router";

// Define props type
interface SolutionArticleFormProps {
  initialData?: SolutionArticle | null;
  update?: boolean;
}

const SolutionArticleForm: React.FC<SolutionArticleFormProps> = ({
  initialData,
  update = false,
}) => {
  const editorRef = useRef<any>(null);
  const { problemData } = useProblemDetail();
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();
  const navigate = useNavigate();
  const [language, setLanguage] = useState("python");
  const [isExecuted, setIsExecuted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    solution: "",
    language: LANGUAGE_MAPPING[language],
  });
  const { sol_atricle_id } = useParams();

  // Map numeric language to string for CodeEditor
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        description: initialData.description || "",
        solution: initialData.solution || "",
        language: LANGUAGE_MAPPING[initialData.language],
      });
      setLanguage(getLanguageKey(initialData.language) || "python");
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRichTextUpdate = (content: string) => {
    setFormData((prev) => ({
      ...prev,
      description: content,
    }));
  };

  const handleCodeEditorChange = (value: string | undefined) => {
    setFormData((prev) => ({
      ...prev,
      solution: value || "",
    }));
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    setFormData((prev) => ({
      ...prev,
      language: LANGUAGE_MAPPING[newLanguage],
    }));
  };

  const addSArticle = async () => {
    try {
      setLoading(true);
      const { solution_articles } = await makeSArticle(
        problemData?.id || "",
        formData,
        token || ""
      );
      toast.success("Add solution article success");
      setTimeout(() => {
        navigate(`/setting/solution-article/${solution_articles.id}`);
      }, 4000);
    } catch (error) {
      console.log("addSArticle", error);
      toast.error("Add failed");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateArticle = async () => {
    try {
      setLoading(true);
      const {} = await updateSArticle(
        initialData?.id || "",
        formData,
        token || ""
      );
      toast.success("Update solution article success");
    } catch (error) {
      console.log("updateArticle", error);
      toast.error("update failed");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isExecuted) {
      toast.error("You need to check the solution code before sending");
      return;
    }
    update ? updateArticle() : addSArticle();
    console.log(formData);
  };

  const handleDelete = async () => {
    const isDelete = confirm("Do you want to delete this solution");

    if (!isDelete) {
      return;
    }

    try {
      setLoading(true);
      await deleteSarticle(sol_atricle_id || "", token || "");
      toast.success("successfully delete article");
    } catch (error) {
      toast.error("fail to delete article");
      console.log(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <ToastContainer />
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name (Optional)</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter solution name"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description (Optional)</Form.Label>
          <RichTextEditor
            content={formData.description}
            onUpdate={handleRichTextUpdate}
            editable={true}
          />
        </Form.Group>

        <Form.Group className="mb-3 solution-editor" controlId="solution">
          <Form.Label>Solution Code</Form.Label>
          <CodeEditor
            value={formData.solution}
            testCase={
              update
                ? initialData?.problem?.test_cases
                : problemData?.test_cases
            }
            language={language}
            onChange={handleCodeEditorChange}
            onLanguageChange={handleLanguageChange}
            editorRef={editorRef}
            readOnly={false}
          />
        </Form.Group>
        <div className="mb-3 p-1">
          <CheckOutput
            editorRef={editorRef}
            language={language}
            testCase={
              update
                ? initialData?.problem?.test_cases
                : problemData?.test_cases
            }
            setIsExecuted={setIsExecuted}
          />
        </div>
        <div className="d-flex justify-content-between">
          <Button variant="primary" type="submit">
            {loading && (
              <span>
                <Spinner animation="border" size="sm" color="bg-white" />
              </span>
            )}
            {update ? "Update solution" : "Submit solution"}
          </Button>
          {update && (
            <Button variant="danger" type="button" onClick={handleDelete}>
              Delete
            </Button>
          )}
        </div>
      </Form>
    </>
  );
};

export default SolutionArticleForm;
