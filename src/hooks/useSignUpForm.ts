import { useState } from "react";
import { phone } from "phone";
import * as EmailValidator from "email-validator";
import { UserType } from "../types/userType";
import { useCreateUser } from "../services/mutations/userMutations";

const initialValues: UserType = {
  name: "",
  email: "",
  phone: "",
  password: "",
  userType: "client",
};

export function useSignUpForm() {
  const [formValues, setFormValues] = useState<UserType>(initialValues);
  const [error, setError] = useState<string | null>(null);

  const createUserMutation = useCreateUser();

  // Handle form changes
  const handleFormValues = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setError(null);
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  // Form validation logic
  const validateForm = (): boolean => {
    if (
      formValues.name === "" ||
      formValues.email === "" ||
      formValues.phone === "" ||
      formValues.password === ""
    ) {
      setError("Please fill all the fields");
      return false;
    }

    const phoneNum = "+880" + formValues.phone;
    const isValidPhone = phone(phoneNum);

    if (!isValidPhone.isValid && formValues.phone?.length !== 10) {
      setError("Phone no must be valid");
      return false;
    }

    const isValidEmail = EmailValidator.validate(formValues.email);
    if (!isValidEmail) {
      setError("Email must be valid");
      return false;
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

    createUserMutation.mutate(formValues);
    setFormValues(initialValues);
  };

  return {
    formValues,
    error,
    handleFormValues,
    onSubmitHandler,
  };
}
