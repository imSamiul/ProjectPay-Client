import { useProjectForm } from "@/hooks/use-add-project-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

export function AddProjectForm() {
  const { project, error, handleInputChange, onSubmitHandler } =
    useProjectForm();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-medium md:text-3xl">Add Your Project</h1>
        <Separator />
      </div>

      <form onSubmit={onSubmitHandler}>
        <FieldGroup className="gap-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Field>
              <FieldLabel htmlFor="name">Project Name</FieldLabel>
              <Input
                id="name"
                type="text"
                name="name"
                value={project.name}
                placeholder="Project Name (required)"
                onChange={handleInputChange}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="budget">Budget</FieldLabel>
              <Input
                id="budget"
                type="number"
                name="budget"
                value={project.budget ?? ""}
                placeholder="Project Total Budget (required)"
                onChange={handleInputChange}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="advance">Advance</FieldLabel>
              <Input
                id="advance"
                type="number"
                name="advance"
                value={project.advance ?? ""}
                placeholder="Advance Payment (required)"
                onChange={handleInputChange}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="startDate">Start Date</FieldLabel>
              <Input
                id="startDate"
                type="date"
                name="startDate"
                value={project.startDate}
                onChange={handleInputChange}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="endDate">End Date (required)</FieldLabel>
              <Input
                id="endDate"
                type="date"
                name="endDate"
                value={project.endDate}
                onChange={handleInputChange}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="demoLink">Demo Link</FieldLabel>
              <Input
                id="demoLink"
                type="text"
                name="demoLink"
                value={project.demoLink}
                placeholder="Demo Link"
                onChange={handleInputChange}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="typeOfWeb">Type of web</FieldLabel>
              <Input
                id="typeOfWeb"
                type="text"
                name="typeOfWeb"
                value={project.typeOfWeb}
                placeholder="Type of Web (eg. E-commerce)"
                onChange={handleInputChange}
              />
            </Field>
            <Field className="md:col-span-3">
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <Textarea
                id="description"
                name="description"
                placeholder="Project Description (eg. GitHub Repository URL)"
                value={project.description}
                onChange={handleInputChange}
              />
            </Field>
          </div>

          {error ? (
            <Field data-invalid>
              <FieldDescription>{error}</FieldDescription>
            </Field>
          ) : null}

          <FieldDescription>
            You can link a client to this project using their client key from
            the project&apos;s page after it&apos;s created.
          </FieldDescription>

          <Button type="submit">Submit</Button>
        </FieldGroup>
      </form>
    </div>
  );
}
