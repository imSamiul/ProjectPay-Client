import { useState } from "react";
import CustomDatePicker from "../ui/CustomDatePicker";
import { PaymentType } from "../../types/paymentType";
import { useAddPayment } from "../../services/mutations/paymentMutation";

type PaymentModalPropsType = {
  id: string;
  projectName: string;
  due: number;
  projectId: string;
};

const INITIAL_VALUES: PaymentType = {
  projectId: "",
  paymentDate: new Date(),
  paymentAmount: 0,
  paymentMethod: "",
  transactionId: "",
};

function PaymentModal({
  id,
  projectName,
  due,
  projectId,
}: PaymentModalPropsType) {
  const [paymentModalFormValues, setPaymentModalFormValues] =
    useState<PaymentType>(INITIAL_VALUES);
  const [error, setError] = useState<string | null>(null);

  const addProjectPayment = useAddPayment();

  const toggleModal = (modalId: string, action: "open" | "close") => {
    const modal = document.getElementById(modalId) as HTMLDialogElement;
    if (action === "open") modal?.showModal();
    if (action === "close") modal?.close();
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setError(null);
    const { name, value } = e.target;
    setPaymentModalFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setPaymentModalFormValues((prev) => ({ ...prev, paymentDate: date }));
    }
  };

  const validateForm = () => {
    const { paymentAmount, paymentMethod, transactionId } =
      paymentModalFormValues;
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

  const addPaymentHandler = () => {
    if (!validateForm()) return;

    const paymentObj = {
      ...paymentModalFormValues,
      projectId,
      paymentAmount: Number(paymentModalFormValues.paymentAmount),
    };

    addProjectPayment.mutate(paymentObj, {
      onSuccess: () => {
        setPaymentModalFormValues(INITIAL_VALUES);
        toggleModal(id, "close");
      },
      onError: () => {
        setError("An error occurred while processing the payment.");
      },
    });
  };

  return (
    <div>
      {/* Button to open the modal */}
      <button
        className="btn btn-primary btn-sm md:btn-md outline-none border-none"
        onClick={() => toggleModal(id, "open")}
      >
        Add Payment
      </button>

      <dialog id={id} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box md:w-11/12 md:max-w-3xl overflow-visible">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-xl ">
              Add Payment for {projectName}
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
                value={paymentModalFormValues.paymentAmount}
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
                value={paymentModalFormValues.paymentMethod}
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
                value={paymentModalFormValues.transactionId}
                onChange={handleInputChange}
                placeholder="TrxId"
              />
            </div>

            <CustomDatePicker
              label="Payment Date:"
              selectedDate={paymentModalFormValues.paymentDate}
              onSelectDate={handleDateChange}
            />
          </div>

          <div className="modal-action">
            <button
              type="button"
              className="btn btn-error"
              onClick={() => toggleModal(id, "close")}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-warning"
              onClick={addPaymentHandler}
            >
              Confirm
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default PaymentModal;
