import React, { useState } from "react";
import { UserSolution } from "../../../types/content/solution.type";
import { useAuth } from "../../../context/auth/AuthContext";
import { addUsrSoltion } from "../../../service/api/usersolution/addUsrSolution";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { updateUsrSolution } from "../../../service/api/usersolution/updateUsrSolution";
import { deletUsrSolution } from "../../../service/api/usersolution/deletUsrSolution";

const useFormUSSolution = (
  initialData: Partial<UserSolution>,
  update: boolean = false
) => {
  const { token } = useAuth();
  const { user_sub_id, user_solution_id } = useParams();

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
      toast.error("Failed add solution");
      throw error;
    } finally {
      setUploading(false);
    }
  };

  const fetchUpdateSol = async () => {
    const newUS = {
      id: user_solution_id,
      name: formData.name,
      description: formData.description,
      content: formData.content,
    } as Omit<
      UserSolution,
      "created_at" | "upadated_at" | "user_submission" | "status"
    >;
    try {
      setUploading(true);
      const { user_solution } = await updateUsrSolution(token || "", newUS);
      toast.success("Update solution success");
      console.log(user_solution);
    } catch (error) {
      console.log("fetchUpdateSol", error);
      toast.error("Failed solution ");
      throw error;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // console.log(formData);
    update ? fetchAddSolution() : fetchUpdateSol();
  };

  const handlDelete = async () => {
    const isDelete = confirm("Do you want to delete your problem");
    if (!isDelete) {
      return;
    }
    try {
      setUploading(true);
      await deletUsrSolution(user_solution_id || "", token || "");
      toast.success("delete success");
    } catch (error) {
      console.log("error: handlDelete");
      toast.error("fail to delete");
    } finally {
      setUploading(false);
    }
  };

  return {
    formData,
    uploading,
    handleChange,
    handleContentChange,
    handleSubmit,
    handlDelete,
  };
};

export default useFormUSSolution;
