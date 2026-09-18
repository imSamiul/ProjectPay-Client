import { useState } from "react";

import { ProjectDeleteModalPropsType } from "../../types/projectType";
import { MdDeleteForever } from "react-icons/md";
import { useDeleteProject } from "../../services/mutations/projectMutation";

function ProjectDeleteModal({
  modalId,
  projectName,
  projectCode,
  projectId,
}: ProjectDeleteModalPropsType) {
  const [error, setError] = useState<string | null>(null);
  const [inputProjectCode, setInputProjectCode] = useState<string>("");
  const deleteProject = useDeleteProject();

  const toggleModal = (modalId: string, action: "open" | "close") => {
    const modal = document.getElementById(modalId) as HTMLDialogElement;
    if (action === "open") modal?.showModal();
    if (action === "close") modal?.close();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setInputProjectCode(e.target.value);
  };

  const validateForm = () => {
    if (!projectCode || projectCode !== inputProjectCode) {
      setError("Rewrite the transaction Id to confirm.");
      return false;
    }

    setError(null);
    return true;
  };

  const deletePaymentHandler = () => {
    if (!validateForm()) return;

    deleteProject.mutate(projectId);
    console.log(projectId);

    setInputProjectCode("");
    toggleModal(modalId, "close");
  };

  return (
    <div>
      <button
        className="btn btn-error btn-sm md:btn-md outline-none border-none"
        onClick={() => toggleModal(modalId, "open")}
      >
        <MdDeleteForever size={20} />
        Delete Project
      </button>

      <dialog id={modalId} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box  overflow-visible">
          <div className="">
            <h3 className="font-medium text-xl ">
              Delete Project :{" "}
              <span className="font-lexend font-bold">{projectName}</span>
            </h3>
            <p className="my-2">
              Write the project code to confirm:{" "}
              <span className="font-semibold text-lg">{projectCode}</span>
            </p>
            {error && <p className="text-red-500">{error}</p>}
          </div>
          <div>
            <div className="form-control">
              <label className="label md:text-lg font-medium">
                Project Code:
              </label>
              <input
                className="input input-bordered"
                type="text"
                name="projectCode"
                value={inputProjectCode}
                onChange={handleInputChange}
                placeholder="Project Code (required)"
              />
            </div>
          </div>
          <div className="modal-action">
            <button
              type="button"
              className="btn btn-error"
              onClick={() => toggleModal(modalId, "open")}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-warning"
              onClick={deletePaymentHandler}
              disabled={!!error || inputProjectCode !== projectCode}
            >
              Confirm
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={() => toggleModal(modalId, "close")}>close</button>
        </form>
      </dialog>
    </div>
  );
}

export default ProjectDeleteModal;
