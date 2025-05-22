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

// Define props type
interface SolutionArticleFormProps {
  initialData?: SolutionArticle | null;
}

const SolutionArticleForm: React.FC<SolutionArticleFormProps> = ({
  initialData,
}) => {
  const editorRef = useRef<any>(null);
  const { problemData } = useProblemDetail();
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();
  const [language, setLanguage] = useState("python");
  const [isExecuted, setIsExecuted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    solution: "",
    language: LANGUAGE_MAPPING[language],
  });

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
      const {} = await makeSArticle(
        problemData?.id || "",
        formData,
        token || ""
      );
      toast.success("Add solution article success");
    } catch (error) {
      console.log("addSArticle", error);
      toast.error("Add failed");
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
    addSArticle();
    console.log(formData);
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
            testCase={problemData?.test_cases}
            language={language}
            onChange={handleCodeEditorChange}
            onLanguageChange={handleLanguageChange}
            editorRef={editorRef}
          />
        </Form.Group>
        <div className="mb-3 p-1">
          <CheckOutput
            editorRef={editorRef}
            language={language}
            testCase={problemData?.test_cases}
            setIsExecuted={setIsExecuted}
          />
        </div>
        <Button variant="primary" type="submit" className="w-100">
          {loading && (
            <span>
              <Spinner animation="border" size="sm" color="bg-white" />
            </span>
          )}
          Submit Solution
        </Button>
      </Form>
    </>
  );
};

export default SolutionArticleForm;
