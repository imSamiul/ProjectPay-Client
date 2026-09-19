import CustomDatePicker from "@/components/shared/CustomDatePicker";
import { useEditProjectForm } from "@/hooks/use-edit-project-form";
import { ProjectType, UpdateProjectType } from "@/types/project";
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

type CombinedProjectType = ProjectType & UpdateProjectType;

type EditProjectFormProps = {
  projectCode: string;
  initialData: CombinedProjectType;
};

export function EditProjectForm({
  projectCode,
  initialData,
}: EditProjectFormProps) {
  const {
    editProjectValues,
    handleInputChange,
    handleDateChange,
    onSubmitHandler,
    formError,
  } = useEditProjectForm(initialData);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-medium md:text-3xl">
          Edit Project: {editProjectValues.name} ({projectCode})
        </h1>
        <Separator />
      </div>

      <form onSubmit={onSubmitHandler}>
        <FieldGroup className="gap-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Field>
              <FieldLabel htmlFor="name">Project Name</FieldLabel>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Project Name (required)"
                value={editProjectValues.name}
                onChange={handleInputChange}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="budget">
                Budget ({editProjectValues.totalPaid ?? 0} Paid)
              </FieldLabel>
              <Input
                id="budget"
                name="budget"
                type="number"
                placeholder="Total Budget (required)"
                value={editProjectValues.budget}
                onChange={handleInputChange}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="advance">
                Advance (0 to{" "}
                {(editProjectValues.budget ?? 0) -
                  (editProjectValues.totalPaid ?? 0)}
                )
              </FieldLabel>
              <Input
                id="advance"
                name="advance"
                type="number"
                placeholder="Total Advance (required)"
                value={editProjectValues.advance}
                onChange={handleInputChange}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="demoLink">Demo Link</FieldLabel>
              <Input
                id="demoLink"
                name="demoLink"
                type="text"
                placeholder="Demo Link"
                value={editProjectValues.demoLink}
                onChange={handleInputChange}
              />
            </Field>
            <CustomDatePicker
              label="End Date"
              selectedDate={new Date(editProjectValues.endDate)}
              onSelectDate={handleDateChange}
            />
            <Field>
              <FieldLabel htmlFor="typeOfWeb">Type of web</FieldLabel>
              <Input
                id="typeOfWeb"
                name="typeOfWeb"
                type="text"
                placeholder="Type of Web (eg. E-commerce)"
                value={editProjectValues.typeOfWeb}
                onChange={handleInputChange}
              />
            </Field>
            <Field className="md:col-span-3">
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <Textarea
                id="description"
                name="description"
                placeholder="Description"
                value={editProjectValues.description}
                onChange={handleInputChange}
              />
            </Field>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Button type="submit">Update</Button>
            {formError ? (
              <Field data-invalid>
                <FieldDescription>{formError}</FieldDescription>
              </Field>
            ) : null}
          </div>
        </FieldGroup>
      </form>
    </div>
  );
}
