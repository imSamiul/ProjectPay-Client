import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type CustomDatePickerProps = {
  label: string;
  onSelectDate: (date: Date | null) => void;
  selectedDate: Date;
};

// Define the component
function CustomDatePicker({
  label,
  selectedDate,

  onSelectDate,
}: CustomDatePickerProps) {
  // Set the state with a Date type or null for initial value

  const isValidDate = !isNaN(selectedDate.getTime());

  return (
    <div className="form-control ">
      <label className="label md:text-lg font-medium">{label}</label>
      <DatePicker
        onChange={(date) => onSelectDate(date)} // Ensure the date can be null
        selected={isValidDate ? selectedDate : null}
        placeholderText="dd-mm-yyyy"
        dateFormat="dd-MM-yyyy"
        className="input input-bordered w-full "
        popperPlacement="top-end" // This places the calendar above the input
        popperProps={{
          strategy: "fixed",
        }}
      />
    </div>
  );
}

export default CustomDatePicker;
