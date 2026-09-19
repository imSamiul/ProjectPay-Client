import { useState } from "react";
import { phone as validatePhone } from "phone";
import * as EmailValidator from "email-validator";
import { SignUpPayload } from "@/types/user";
import { useCreateUser } from "@/services/mutations/use-user-mutations";

type SignUpFormValues = {
  identifier: string;
  password: string;
  userType: "client" | "project manager";
};

const initialValues: SignUpFormValues = {
  identifier: "",
  password: "",
  userType: "client",
};

function isEmailLike(value: string): boolean {
  return value.includes("@");
}

export function useSignUpForm() {
  const [formValues, setFormValues] = useState<SignUpFormValues>(initialValues);
  const [error, setError] = useState<string | null>(null);

  const createUserMutation = useCreateUser();

  const handleFormValues = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setError(null);
    setFormValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const setFieldValue = (name: keyof SignUpFormValues, value: string) => {
    setError(null);
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Form validation logic
  const validateForm = (): boolean => {
    if (formValues.identifier === "" || formValues.password === "") {
      setError("Please fill all the fields");
      return false;
    }

    if (isEmailLike(formValues.identifier)) {
      if (!EmailValidator.validate(formValues.identifier)) {
        setError("Email must be valid");
        return false;
      }
    } else {
      const phoneNum = "+880" + formValues.identifier;
      const isValidPhone = validatePhone(phoneNum);
      if (!isValidPhone.isValid && formValues.identifier.length !== 10) {
        setError("Enter a valid email or a 10-digit phone number");
        return false;
      }
    }

    if (
      formValues.password.length < 6 ||
      formValues.password.includes("password")
    ) {
      setError(
        "Password must be at least 6 characters long and should not contain the word 'password'",
      );
      return false;
    }
    if (
      formValues.userType?.toLowerCase() !== "client" &&
      formValues.userType?.toLowerCase() !== "project manager"
    ) {
      setError("User type must be either client or project manager");
      return false;
    }

    return true;
  };

  // Handle form submission
  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    const payload: SignUpPayload = {
      password: formValues.password,
      userType: formValues.userType,
      ...(isEmailLike(formValues.identifier)
        ? { email: formValues.identifier }
        : { phone: formValues.identifier }),
    };

    createUserMutation.mutate(payload, {
      onSuccess: () => setFormValues(initialValues),
    });
  };

  return {
    formValues,
    error,
    handleFormValues,
    setFieldValue,
    onSubmitHandler,
  };
}
