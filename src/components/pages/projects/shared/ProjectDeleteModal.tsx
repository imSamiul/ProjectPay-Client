import { useState } from "react";
import { Trash2Icon } from "lucide-react";
import { ProjectDeleteModalPropsType } from "@/types/project";
import { useDeleteProject } from "@/services/mutations/use-project-mutations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field";

function ProjectDeleteModal({
  projectName,
  projectCode,
  projectId,
}: ProjectDeleteModalPropsType) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [inputProjectCode, setInputProjectCode] = useState("");
  const deleteProject = useDeleteProject();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setInputProjectCode(e.target.value);
  };

  const validateForm = () => {
    if (!projectCode || projectCode !== inputProjectCode) {
      setError("Rewrite the project code to confirm.");
      return false;
    }

    setError(null);
    return true;
  };

  const deleteProjectHandler = () => {
    if (!validateForm()) return;

    deleteProject.mutate(projectId, {
      onSuccess: () => {
        setInputProjectCode("");
        setOpen(false);
      },
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (!nextOpen) {
          setInputProjectCode("");
          setError(null);
        }
      }}
    >
      <DialogTrigger render={<Button variant="destructive" size="sm" />}>
        <Trash2Icon data-icon="inline-start" />
        Delete Project
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Project: {projectName}</DialogTitle>
          <DialogDescription>
            This permanently removes the project. Confirm by typing the project
            code.
          </DialogDescription>
        </DialogHeader>

        <p className="text-sm">
          Write the project code to confirm:{" "}
          <span className="font-semibold">{projectCode}</span>
        </p>

        <Field data-invalid={Boolean(error) || undefined}>
          <FieldLabel htmlFor="confirmProjectCode">Project Code</FieldLabel>
          <Input
            id="confirmProjectCode"
            type="text"
            name="projectCode"
            value={inputProjectCode}
            onChange={handleInputChange}
            placeholder="Project Code (required)"
            aria-invalid={Boolean(error) || undefined}
          />
          {error ? <FieldDescription>{error}</FieldDescription> : null}
        </Field>

        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>Close</DialogClose>
          <Button
            variant="destructive"
            onClick={deleteProjectHandler}
            disabled={
              deleteProject.isPending ||
              Boolean(error) ||
              inputProjectCode !== projectCode
            }
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ProjectDeleteModal;
