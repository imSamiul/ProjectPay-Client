import { useState } from "react";
import { ProjectType } from "@/types/project";
import { useCreateNewProject } from "@/services/mutations/use-project-mutations";

const initialProject: ProjectType = {
  name: "",
  budget: 0,
  advance: 0,
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

    return true;
  };

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    createNewProjectMutation.mutate(project, {
      onSuccess: () => setProject(initialProject),
    });
  };

  return {
    project,
    error,
    handleInputChange,
    onSubmitHandler,
  };
}
