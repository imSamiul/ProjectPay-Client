import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Field, FieldLabel } from "@/components/ui/field";
import { cn } from "@/lib/utils";

type CustomDatePickerProps = {
  label: string;
  onSelectDate: (date: Date | null) => void;
  selectedDate: Date;
  className?: string;
};

function CustomDatePicker({
  label,
  selectedDate,
  onSelectDate,
  className,
}: CustomDatePickerProps) {
  const isValidDate = !isNaN(selectedDate.getTime());

  return (
    <Field className={className}>
      <FieldLabel>{label}</FieldLabel>
      <DatePicker
        onChange={(date) => onSelectDate(date)}
        selected={isValidDate ? selectedDate : null}
        placeholderText="dd-mm-yyyy"
        dateFormat="dd-MM-yyyy"
        className={cn(
          "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm dark:bg-input/30",
        )}
        popperPlacement="top-end"
        popperProps={{
          strategy: "fixed",
        }}
        wrapperClassName="w-full"
      />
    </Field>
  );
}

export default CustomDatePicker;
