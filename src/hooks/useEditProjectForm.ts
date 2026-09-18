import { useEffect, useState } from "react";
import { ProjectType, UpdateProjectType } from "../types/projectType";
import { useGetProjectDetails } from "../services/queries/projectQueries";
import phone from "phone";
import * as EmailValidator from "email-validator";
import { useUpdateProjectDetails } from "../services/mutations/projectMutation";

// custom hook for validate and submit form

const INITIAL_VALUES = {
  projectCode: "",
  name: "",
  budget: 0,
  advance: 0,
  clientName: "",
  clientEmail: "",
  clientAddress: "",
  clientDetails: "",
  clientPhone: "",
  demoLink: "",
  endDate: "",
  typeOfWeb: "",
  description: "",
  startDate: "",
  status: false,
};
type CombinedProjectType = ProjectType & UpdateProjectType;
export function useEditProjectForm(projectCode: string) {
  const { data, isLoading, isError, error } = useGetProjectDetails(projectCode);
  const editProjectDetailsMutation = useUpdateProjectDetails();
  const [editProjectValues, setEditProjectValues] =
    useState<CombinedProjectType>(INITIAL_VALUES);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (data) {
      setEditProjectValues((prevValues) => ({
        ...prevValues,
        ...data,
      }));
    }
  }, [data]);

  const totalPaid = data?.totalPaid || 0;

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
    // check if advance is greater than budget
    if (Number(editProjectValues.advance) > Number(editProjectValues.budget)) {
      setFormError("Advance cannot exceed the total budget.");
      return false;
    }
    // check if phone number is valid
    const phoneNum = "+880" + editProjectValues.clientPhone;
    const isValidPhone = phone(phoneNum); // phone() returns an array

    if (!isValidPhone) {
      setFormError("Invalid phone number.");
      return false;
    }
    // check if phone number is 10 digits long
    if (editProjectValues.clientPhone.length !== 11) {
      setFormError("Phone number must be 11 digits long.");
      return false;
    }
    // check if email is valid
    const isValidEmail = EmailValidator.validate(editProjectValues.clientEmail);
    if (!isValidEmail) {
      setFormError("Invalid email.");
      return false;
    }
    // check if totalPaid is greater than budget
    if (totalPaid > editProjectValues.budget) {
      setFormError("Total paid amount cannot exceed the total budget.");
      return false;
    }
    // ensure total paid does not exceed remaining amount after advance
    if (totalPaid > editProjectValues.budget - editProjectValues.advance) {
      setFormError(
        "The total paid amount cannot be more than the remaining budget after subtracting the advance payment.",
      );
      return false;
    }
    // Ensure due is valid: budget - advance - totalPaid
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

    // Add logic to handle form submission (e.g., mutation, API call, etc.)
    editProjectDetailsMutation.mutate(editProjectValues);
    // Reset form after successful submission
  };

  return {
    editProjectValues,
    isLoading,
    isError,
    error,
    handleInputChange,
    handleDateChange,
    formError,
    onSubmitHandler,
  };
}
