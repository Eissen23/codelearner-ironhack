import React, { useState } from "react";
import { UserSolution } from "../../../types/content/solution.type";
import { useAuth } from "../../../context/auth/AuthContext";
import { addUsrSoltion } from "../../../service/api/usersolution/addUsrSolution";
import { useParams } from "react-router";
import { toast } from "react-toastify";

const useFormUSSolution = (initialData: Partial<UserSolution>) => {
  const { token } = useAuth();
  const { user_sub_id } = useParams();

  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    description: initialData.description || "",
    content: initialData.content || "",
    status: initialData.status || "unpublished",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (content: string) => {
    setFormData((prev) => ({ ...prev, content }));
  };

  const fetchAddSolution = async () => {
    try {
      setUploading(true);
      const { user_solution } = await addUsrSoltion(
        user_sub_id || "",
        formData,
        token || ""
      );
      toast.success("Add solution success");
      console.log(user_solution);
    } catch (error) {
      console.log("fetchAddSolution", error);
      toast.error("Failed add solution success");
      throw error;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // console.log(formData);
    fetchAddSolution();
  };

  return {
    formData,
    uploading,
    handleChange,
    handleContentChange,
    handleSubmit,
  };
};

export default useFormUSSolution;
