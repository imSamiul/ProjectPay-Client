import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";

type ProjectSearchBoxProps = {
  value: string;
  onSearchTextChange: (searchText: string) => void;
};

function ProjectSearchBox({ value, onSearchTextChange }: ProjectSearchBoxProps) {
  return (
    <Field>
      <FieldLabel htmlFor="project-search">Search projects</FieldLabel>
      <Input
        id="project-search"
        value={value}
        onChange={(event) => onSearchTextChange(event.target.value)}
        placeholder="Search by name or project code"
      />
    </Field>
  );
}

export default ProjectSearchBox;
