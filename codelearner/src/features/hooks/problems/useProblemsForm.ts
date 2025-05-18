import { useState, useCallback, useEffect } from "react";
import { Editor } from "@tiptap/react";
import { ProblemData } from "../../../types/content/problem.type";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../../../context/auth/AuthContext";
import { addProblem } from "../../../service/api/problem-manage/addProblem";
import { updateProblem } from "../../../service/api/problem-manage/updateProblem";
import { toast } from "react-toastify";

interface TestCases {
  test_cases: {
    input: string[];
    output: string[];
  };
}

export const useProblemForm = (
  editor: Editor | null,
  problemData?: ProblemData,
  noEdit: boolean = false
) => {
  const { problemSetId } = useParams();
  const { token } = useAuth();
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const [problem, setProblem] = useState<Partial<ProblemData>>({
    id: "",
    name: "",
    description: "<p></p>",
    test_cases: { input: [""], output: [""] },
    difficulty: 1,
    is_rich_text: true,
    tags: [],
  });

  // Initialize problem state when problemData changes
  useEffect(() => {
    if (problemData) {
      setProblem((prev) => ({
        ...problemData,
        description:
          problemData.description && problemData.description !== "<p></p>"
            ? problemData.description
            : prev.description || "<p></p>",
      }));
    }
  }, [problemData]);

  useEffect(() => {
    if (editor && problem.description && problem.is_rich_text) {
      if (editor.getHTML() !== problem.description) {
        editor.commands.setContent(problem.description);
      }
    }
  }, [editor, problem.description, problem.is_rich_text]);

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      const { name, value } = e.target;
      if (name === "is_rich_text") {
        const isRichText = value === "true";
        setProblem((prev) => ({
          ...prev,
          is_rich_text: isRichText,
        }));
        if (editor) {
          editor.setEditable(isRichText);
          if (!isRichText) {
            editor.commands.setContent("<p></p>"); // Set default content for non-rich-text mode
          } else {
            // Restore the description if available
            editor.commands.setContent(problem.description || "<p></p>");
          }
        }
        return;
      }
      setProblem((prev) => ({
        ...prev,
        [name]:
          name === "difficulty"
            ? Number(value)
            : name === "tags"
            ? Array.isArray(value)
              ? value
              : value.split(",").map((v) => v.trim())
            : value,
      }));
    },
    [editor, problem.description]
  );

  // Handle test cases update from KeyValueForm
  const handleTestCasesChange = useCallback((data: TestCases) => {
    setProblem((prev) => ({
      ...prev,
      test_cases: {
        input: data.test_cases.input,
        output: data.test_cases.output,
      },
    }));
  }, []);

  const fetchAddProblem = async () => {
    const newProblem: Omit<ProblemData, "id"> = {
      name: problem.name ?? "",
      description: problem.is_rich_text
        ? problem.description ?? ""
        : problem.description ?? "",
      test_cases: {
        input: problem.test_cases?.input ?? [],
        output: problem.test_cases?.output ?? [],
      },
      difficulty: problem.difficulty ?? 1,
      is_rich_text: problem.is_rich_text ?? true,
      problem_set: problemSetId ? parseInt(problemSetId, 10) : 0,
      tags: problem.tags ?? [],
    };
    try {
      setUploading(true);
      const { id } = await addProblem(token || "", newProblem);
      toast("Create problem success. Redirecting to problem setting");
      setTimeout(() => {
        navigate(`/setting/problem/${id}`);
      }, 4000);
    } catch (error) {
      console.log("error adding problem", error);
      toast("Failed to create problem");
    } finally {
      setUploading(false);
    }
  };

  const fetchUpdateProblem = async () => {
    const data: ProblemData = {
      id: problem.id ?? "",
      name: problem.name ?? "",
      description: problem.is_rich_text
        ? problem.description ?? ""
        : problem.description ?? "",
      test_cases: {
        input: problem.test_cases?.input ?? [],
        output: problem.test_cases?.output ?? [],
      },
      difficulty: problem.difficulty ?? 1,
      is_rich_text: problem.is_rich_text ?? true,
      problem_set: problemSetId ? parseInt(problemSetId, 10) : 0,
      tags: problem.tags ?? [],
    };
    try {
      setUploading(true);
      await updateProblem(token || "", data);
      toast("Create update success");
    } catch (error) {
      console.log("error updating problem", error);
      toast("Failed to update problem");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      !noEdit ? fetchAddProblem() : fetchUpdateProblem();
      console.log(problem);
    },
    [problem, problemSetId, token]
  );

  return {
    problem,
    setProblem,
    handleChange,
    handleTestCasesChange,
    handleSubmit,
    uploading,
  };
};
