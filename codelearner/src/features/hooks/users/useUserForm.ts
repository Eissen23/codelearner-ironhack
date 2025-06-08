import { useState } from "react";
import { User } from "../../../types/auth.types";
import { updateInfo } from "../../../service/user-service/updateInfo";
import { toast } from "react-toastify";
import { UserDetail } from "../../../types/user.type";
import { AxiosError } from "axios";

export const useUserForm = (token: string | null) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      toast.error("Authentication token is missing");
      return;
    }

    const form = e.target as HTMLFormElement;
    const formElements = form.elements as HTMLCollection;
    const updatedData: Partial<UserDetail> = {};

    // Only include fields that have changed from their default values
    Array.from(formElements).forEach((element: Element) => {
      const input = element as HTMLInputElement | HTMLTextAreaElement;
      if (input.name && input.value !== input.defaultValue) {
        updatedData[input.name as keyof UserDetail] = input.value as any;
      }
    });

    // If no changes were made, show message and return
    if (Object.keys(updatedData).length === 0) {
      toast.info("No changes to save");
      return;
    }

    try {
      setLoading(true);
      const response = updateInfo(updatedData as User, token);
      toast.promise(response, {
        pending: "updating",
        success: "Update success",
      });
    } catch (error: any) {
      console.log("handleSubmit", error);
      if (error instanceof AxiosError && error.response?.data?.message) {
        toast.error(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleSubmit,
  };
};
