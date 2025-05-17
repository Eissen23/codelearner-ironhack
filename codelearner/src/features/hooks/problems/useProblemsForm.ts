import { useState, useCallback } from "react";
import { Editor } from "@tiptap/react";
import { ProblemData } from "../../../types/content/problem.type";
import { useParams } from "react-router";
import { useAuth } from "../../../context/auth/AuthContext";
import { addProblem } from "../../../service/api/problem-manage/addProblem";
import { toast } from "react-toastify";

// Define the TestCase type

export const useProblemForm = (editor: Editor | null) => {
  const { problemSetId } = useParams();
  const { token } = useAuth();

  const [problem, setProblem] = useState<Partial<ProblemData>>({
    name: "",
    description: "",
    test_cases: { input: [], output: [] },
    difficulty: 1,
    is_rich_text: true,
  });
  const [testCaseInputRaw, setTestCaseInputRaw] = useState("");
  const [testCaseOutputRaw, setTestCaseOutputRaw] = useState("");
  const [uploading, setUploading] = useState(false);

  const parseRawInput = (raw: string): string[] =>
    raw
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item);

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      const { name, value } = e.target;
      if (name === "test_case_input") {
        setTestCaseInputRaw(value);
      } else if (name === "test_case_output") {
        setTestCaseOutputRaw(value);
      } else if (name === "is_rich_text") {
        setProblem((prev) => ({
          ...prev,
          is_rich_text: value === "true",
        }));
        if (editor) {
          editor.setEditable(value === "true");
          if (value !== "true") {
            setProblem((prev) => ({ ...prev, description: "" }));
            editor.commands.setContent("");
          }
        }
      } else {
        setProblem((prev) => ({
          ...prev,
          [name]: name === "difficulty" ? Number(value) : value,
        }));
      }
    },
    [editor]
  );

  const handleBlur = useCallback((e: React.FocusEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "test_case_input" || name === "test_case_output") {
      const arrayValue = parseRawInput(value);
      setProblem((prev) => ({
        ...prev,
        test_cases: {
          ...prev.test_cases!,
          [name === "test_case_input" ? "input" : "output"]: arrayValue,
        },
      }));
    }
  }, []);

  const fetchAddProblem = async (data: Omit<ProblemData, "id">) => {
    try {
      setUploading(true);
      await addProblem(token || "", data);
      toast("Create problem success");
    } catch (error) {
      console.log("error adding problem", error);
      toast("Failed to create problem");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // Parse raw inputs before submission
      const inputArray = parseRawInput(testCaseInputRaw);
      const outputArray = parseRawInput(testCaseOutputRaw);
      const newProblem: Omit<ProblemData, "id"> = {
        name: problem.name ?? "",
        description: problem.is_rich_text
          ? problem.description ?? ""
          : problem.description ?? "",
        test_cases: {
          input:
            inputArray.length > 0
              ? inputArray
              : problem.test_cases?.input ?? [],
          output:
            outputArray.length > 0
              ? outputArray
              : problem.test_cases?.output ?? [],
        },
        difficulty: problem.difficulty ?? 1,
        is_rich_text: problem.is_rich_text ?? true,
        problem_set: problemSetId ? parseInt(problemSetId, 10) : 0,
      };
      console.log("Problem Data:", newProblem);
      // Add your submit logic here (e.g., API call)
      fetchAddProblem(newProblem);
    },
    [problem, testCaseInputRaw, testCaseOutputRaw]
  );

  return {
    problem,
    setProblem,
    testCaseInputRaw,
    testCaseOutputRaw,
    handleChange,
    handleBlur,
    handleSubmit,
    uploading,
  };
};
