import { useState } from "react";
import { ProjectType } from "../types/projectType";
import phone from "phone";
import * as EmailValidator from "email-validator";
import { useCreateNewProject } from "../services/mutations/projectMutation";

const initialProject: ProjectType = {
  name: "",
  budget: 0,
  advance: 0,
  clientName: "",
  clientPhone: "",
  clientEmail: "",
  clientAddress: "",
  clientDetails: "",
  startDate: new Date().toISOString().split("T")[0],
  endDate: "",
  demoLink: "",
  typeOfWeb: "",
  description: "",
  status: false,
};

export function useProjectForm() {
  const [project, setProject] = useState<ProjectType>(initialProject);
  const [error, setError] = useState<string | null>(null);

  const createNewProjectMutation = useCreateNewProject();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setError(null);
    const { name, value } = e.target;
    setProject((prevProject) => ({ ...prevProject, [name]: value }));
  };

  const validateForm = (): boolean => {
    if (
      project.name === "" ||
      project.budget === undefined ||
      project.advance === undefined ||
      project.clientName === "" ||
      project.clientPhone === "" ||
      project.clientEmail === "" ||
      project.startDate === "" ||
      project.endDate === ""
    ) {
      setError("All fields must be filled.");
      return false;
    }

    if (Number(project.advance) > Number(project.budget)) {
      setError("Advance cannot exceed the total budget.");
      return false;
    }

    const phoneNum = "+880" + project.clientPhone;
    const isValidPhone = phone(phoneNum);

    if (!isValidPhone.isValid && project.clientPhone?.length !== 10) {
      setError(
        "Client phone number must be valid and 10 digits long (excluding country code).",
      );
      return false;
    }

    const isValidEmail = EmailValidator.validate(project.clientEmail);
    if (!isValidEmail) {
      setError("Client email must be valid.");
      return false;
    }

    return true;
  };

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    createNewProjectMutation.mutate(project);

    // Add logic to handle form submission (e.g., mutation, API call, etc.)
    console.log("Form submitted successfully!", project);
    setProject(initialProject); // Reset form after successful submission
  };

  return {
    project,
    error,
    handleInputChange,
    onSubmitHandler,
  };
}
