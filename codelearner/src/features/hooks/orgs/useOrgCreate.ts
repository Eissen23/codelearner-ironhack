import { useState } from "react";
import { useNavigate } from "react-router";
import { createOrg } from "../../../service/api/org-manage/createOrg";
import { useAuth } from "../../../context/auth/AuthContext";
import { OrgFormData } from "../../../types/org/org.type";
import { toast } from "react-toastify";

export const useOrgCreate = () => {
  const { isAuthenticated, token } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<OrgFormData>({
    name: "",
    contact_email: "",
    description: "",
    website: "",
    logo: undefined,
  });
  const [isLoading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files?.[0] : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add your API call or logic to handle form submission here

    try {
      setLoading(true);

      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (typeof value === "string" || value instanceof Blob) {
            formDataToSend.append(key, value); // Appends File or string
          }
        }
      });

      console.log(formDataToSend);

      const { organization } = await createOrg(token, formDataToSend);
      toast.success("Organization created");
      setTimeout(() => {
        navigate(`/dashboard/org-manage/${organization.id}`);
      }, 5000);
    } catch (error) {
      toast.error("Failed to create Org!");

      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    isLoading,
    isAuthenticated,
    handleChange,
    handleSubmit,
    setFormData,
  };
};
