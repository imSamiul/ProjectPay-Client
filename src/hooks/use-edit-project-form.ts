import { useState } from "react";
import { ProjectType, UpdateProjectType } from "@/types/project";
import phone from "phone";
import * as EmailValidator from "email-validator";
import { useUpdateProjectDetails } from "@/services/mutations/use-project-mutations";

type CombinedProjectType = ProjectType & UpdateProjectType;

export function useEditProjectForm(initialData: CombinedProjectType) {
  const editProjectDetailsMutation = useUpdateProjectDetails();
  const [editProjectValues, setEditProjectValues] =
    useState<CombinedProjectType>(() => ({ ...initialData }));
  const [formError, setFormError] = useState<string | null>(null);

  const totalPaid = initialData.totalPaid || 0;

  function handleInputChange(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setEditProjectValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setEditProjectValues((prev) => ({
        ...prev,
        endDate: date.toISOString().split("T")[0],
      }));
    }
  };

  function validateForm(): boolean {
    if (
      editProjectValues.name === "" ||
      editProjectValues.budget === 0 ||
      editProjectValues.advance === 0 ||
      editProjectValues.clientName === "" ||
      editProjectValues.clientPhone === "" ||
      editProjectValues.clientEmail === "" ||
      editProjectValues.endDate === ""
    ) {
      setFormError("All fields must be filled.");
      return false;
    }
    if (Number(editProjectValues.advance) > Number(editProjectValues.budget)) {
      setFormError("Advance cannot exceed the total budget.");
      return false;
    }
    const phoneNum = "+880" + editProjectValues.clientPhone;
    const isValidPhone = phone(phoneNum);

    if (!isValidPhone.isValid && editProjectValues.clientPhone.length !== 10) {
      setFormError(
        "Client phone number must be valid and 10 digits long (excluding country code).",
      );
      return false;
    }
    const isValidEmail = EmailValidator.validate(editProjectValues.clientEmail);
    if (!isValidEmail) {
      setFormError("Invalid email.");
      return false;
    }
    if (totalPaid > editProjectValues.budget) {
      setFormError("Total paid amount cannot exceed the total budget.");
      return false;
    }
    if (totalPaid > editProjectValues.budget - editProjectValues.advance) {
      setFormError(
        "The total paid amount cannot be more than the remaining budget after subtracting the advance payment.",
      );
      return false;
    }
    const calculatedDue =
      editProjectValues.budget - editProjectValues.advance - totalPaid;
    if (calculatedDue < 0) {
      setFormError("Due amount cannot be negative.");
      return false;
    }

    return true;
  }

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    if (!validateForm()) {
      return;
    }

    editProjectDetailsMutation.mutate(editProjectValues);
  };

  return {
    editProjectValues,
    handleInputChange,
    handleDateChange,
    formError,
    onSubmitHandler,
  };
}
