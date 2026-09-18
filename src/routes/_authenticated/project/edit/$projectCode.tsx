import { createFileRoute } from "@tanstack/react-router";
import CustomDatePicker from "../../../../components/ui/CustomDatePicker";
import InputField from "../../../../components/ui/InputField";
import { useEditProjectForm } from "../../../../hooks/useEditProjectForm";

export const Route = createFileRoute(
  "/_authenticated/project/edit/$projectCode",
)({
  component: EditProject,
});

function EditProject() {
  const { projectCode } = Route.useParams();

  const {
    editProjectValues,
    isError,
    isLoading,
    error,
    handleInputChange,
    handleDateChange,
    onSubmitHandler,
    formError,
  } = useEditProjectForm(projectCode);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>{error?.message}</div>;
  }

  return (
    <div className="container mx-auto  p-4">
      <h1 className="font-lexend text-xl md:text-3xl font-medium">
        Edit Project: {editProjectValues?.name} ({projectCode})
      </h1>
      <div className="divider my-2"></div>
      <form className="" onSubmit={onSubmitHandler}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-5 mb-3">
          <InputField
            label="Project Name: "
            placeholder="Project Name (required)"
            value={editProjectValues.name}
            onChange={handleInputChange}
            name="name"
            type="text"
          />
          <InputField
            label={`Budget: (${editProjectValues.totalPaid} Paid)`}
            placeholder="Total Budget (required)"
            value={editProjectValues.budget}
            onChange={handleInputChange}
            name="budget"
            type="number"
          />
          <InputField
            label={`Advance: (0 to ${editProjectValues.budget - (editProjectValues.totalPaid ?? 0)})`}
            placeholder="Total Advance (required)"
            value={editProjectValues.advance}
            onChange={handleInputChange}
            name="advance"
            type="number"
          />

          <InputField
            label="Client Name:"
            placeholder="Client Name (required)"
            value={editProjectValues.clientName}
            onChange={handleInputChange}
            name="clientName"
            type="text"
          />
          <InputField
            label="Client Phone:"
            placeholder="Client Phone Number (eg. 017XXXXXXXX) (required)"
            value={editProjectValues.clientPhone}
            onChange={handleInputChange}
            name="clientPhone"
            type="text"
          />

          <InputField
            label="Client Email:"
            placeholder="Client Email (required)"
            value={editProjectValues.clientEmail}
            onChange={handleInputChange}
            name="clientEmail"
            type="email"
          />

          <InputField
            label="Client Address:"
            placeholder="Client Address"
            value={editProjectValues.clientAddress}
            onChange={handleInputChange}
            name="clientAddress"
            type="text"
          />

          <InputField
            label="Client Details:"
            placeholder="Client Details"
            value={editProjectValues.clientDetails}
            onChange={handleInputChange}
            name="clientDetails"
            type="text"
          />

          <InputField
            label="Demo Link:"
            placeholder="Demo Link"
            value={editProjectValues.demoLink}
            onChange={handleInputChange}
            name="demoLink"
            type="text"
          />

          <CustomDatePicker
            label="End Date:"
            selectedDate={new Date(editProjectValues.endDate)}
            onSelectDate={handleDateChange}
          />
          <InputField
            label="Type of web:"
            placeholder="Type of Web (eg. E-commerce)"
            value={editProjectValues.typeOfWeb}
            onChange={handleInputChange}
            name="typeOfWeb"
            type="text"
          />

          <div className="form-control md:col-span-3">
            <label className="label md:text-lg font-medium ">
              Description:
            </label>
            <textarea
              placeholder="Description"
              className="textarea textarea-bordered"
              value={editProjectValues.description}
              onChange={handleInputChange}
            ></textarea>
          </div>
        </div>
        <div className="flex gap-5 items-center">
          <button className="btn btn-primary">Update</button>
          {formError && <div className="text-red-500">{formError}</div>}
        </div>
      </form>
    </div>
  );
}

export default EditProject;
