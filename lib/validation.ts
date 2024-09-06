import { useState } from "react";
import { FormData } from "./profile";

export const useFormValidation = (activeTab: string) => {
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = (formData: FormData): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (
      activeTab === "signup" &&
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { errors, validateForm };
};
