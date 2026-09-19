import { useState } from "react";
import { LoginPayload } from "@/types/user";
import { useLoginUser } from "@/services/mutations/use-user-mutations";

const initialValues: LoginPayload = {
  identifier: "",
  password: "",
};

export function useLoginForm() {
  const [formValues, setFormValues] = useState<LoginPayload>(initialValues);
  const loginUserMutation = useLoginUser();

  const [error, setError] = useState<string | null>(null);

  // Handle form changes
  const handleFormValues = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  // Form validation logic
  const validateForm = (): boolean => {
    if (formValues.identifier === "" || formValues.password === "") {
      setError("Please fill all the fields");
      return false;
    }

    if (formValues.password.length < 6) {
      setError("Password must be valid");
      return false;
    }

    return true;
  };

  // Handle form submission
  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateForm()) {
      loginUserMutation.mutate(formValues);
    }
  };

  return {
    formValues,
    handleFormValues,
    onSubmitHandler,
    error,
  };
}
