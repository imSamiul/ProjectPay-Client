import { useState, useEffect } from "react";
import CustomDatePicker from "../ui/CustomDatePicker";
import { EditPaymentModalPropsType } from "../../types/paymentType";
import { useEditPayment } from "../../services/mutations/paymentMutation";

function EditPaymentModal({
  modalId,
  projectId,
  paymentAmount,
  paymentDate,
  paymentMethod,
  transactionId,
  due,
  projectName,
  paymentId,
  isOpen,
  onClose,
}: EditPaymentModalPropsType & { isOpen: boolean; onClose: () => void }) {
  const [editPaymentModalFormValues, setEditPaymentModalFormValues] =
    useState<EditPaymentModalPropsType>({
      modalId,
      paymentAmount,
      paymentDate,
      paymentMethod,
      transactionId,
      projectId,
      due,
      projectName,
      paymentId,
    });
  const [error, setError] = useState<string | null>(null);
  const editPayment = useEditPayment();

  useEffect(() => {
    setEditPaymentModalFormValues({
      modalId,
      paymentAmount,
      paymentDate,
      paymentMethod,
      transactionId,
      projectId,
      due,
      projectName,
      paymentId,
    });
  }, [
    modalId,
    paymentAmount,
    paymentDate,
    paymentMethod,
    transactionId,
    projectId,
    due,
    projectName,
    paymentId,
  ]);

  useEffect(() => {
    const modal = document.getElementById(modalId) as HTMLDialogElement;
    if (isOpen) {
      modal?.showModal();
    } else {
      modal?.close();
    }
  }, [isOpen, modalId]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setError(null);
    const { name, value } = e.target;
    setEditPaymentModalFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setEditPaymentModalFormValues((prev) => ({ ...prev, paymentDate: date }));
    }
  };

  const validateForm = () => {
    const { paymentAmount, paymentMethod, transactionId } =
      editPaymentModalFormValues;
    if (paymentAmount <= 0 || !paymentMethod || !transactionId) {
      setError("All fields must be filled correctly.");
      return false;
    }
    if (paymentAmount > due) {
      setError("Payment amount cannot exceed due amount.");
      return false;
    }
    setError(null);
    return true;
  };

  const editPaymentHandler = () => {
    if (!validateForm()) return;

    const paymentObj = {
      ...editPaymentModalFormValues,
      projectId,
      paymentAmount: Number(editPaymentModalFormValues.paymentAmount),
    };
    editPayment.mutate(paymentObj);
    onClose();
  };

  return (
    <dialog id={modalId} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box md:w-11/12 md:max-w-3xl overflow-visible">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-xl ">
            Edit Payment :{" "}
            <span className="font-lexend font-bold">{projectName}</span>
          </h3>
          {error && <p className="text-red-500">{error}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
          <div className="form-control">
            <label className="label md:text-lg font-medium">Amount:</label>
            <input
              className="input input-bordered"
              type="number"
              name="paymentAmount"
              value={editPaymentModalFormValues.paymentAmount}
              onChange={handleInputChange}
              placeholder="Amount (required)"
            />
          </div>

          <div className="form-control">
            <label className="label md:text-lg font-medium">
              Payment Method:
            </label>
            <select
              className="select select-bordered"
              name="paymentMethod"
              value={editPaymentModalFormValues.paymentMethod}
              onChange={handleInputChange}
            >
              <option disabled value="">
                Pick one
              </option>
              <option value="cash">Cash</option>
              <option value="bkash">Bkash</option>
              <option value="nagad">Nagad</option>
              <option value="rocket">Rocket</option>
              <option value="bank">Bank</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label md:text-lg font-medium">
              Transaction Id:
            </label>
            <input
              className="input input-bordered"
              type="text"
              name="transactionId"
              value={editPaymentModalFormValues.transactionId}
              onChange={handleInputChange}
              placeholder="TrxId"
            />
          </div>

          <CustomDatePicker
            label="Payment Date:"
            selectedDate={editPaymentModalFormValues.paymentDate}
            onSelectDate={handleDateChange}
          />
        </div>

        <div className="modal-action">
          <button type="button" className="btn btn-error" onClick={onClose}>
            Close
          </button>
          <button
            type="button"
            className="btn btn-warning"
            onClick={editPaymentHandler}
          >
            Confirm
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
}

export default EditPaymentModal;
