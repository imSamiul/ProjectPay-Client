import { useState, useEffect } from "react";
import { DeletePaymentModalPropsType } from "../../types/paymentType";
import { useDeletePayment } from "../../services/mutations/paymentMutation";

function DeletePaymentModal({
  modalId,

  projectName,
  paymentId,
  isOpen,
  onClose,
  transactionId,
  paymentAmount,
  paymentDate,
  paymentMethod,
}: DeletePaymentModalPropsType & { isOpen: boolean; onClose: () => void }) {
  const [deleteObj, setDeleteObj] = useState<DeletePaymentModalPropsType>({
    modalId,
    projectName,
    paymentId,
    transactionId,
    paymentAmount,
    paymentDate,
    paymentMethod,
  });
  const [trxId, setTrxId] = useState("");
  const [error, setError] = useState<string | null>(null);
  const deletePayment = useDeletePayment();

  useEffect(() => {
    setDeleteObj({
      modalId,

      projectName,
      paymentId,
      transactionId,
      paymentAmount,
      paymentDate,
      paymentMethod,
    });
  }, [
    modalId,
    projectName,
    paymentId,
    transactionId,
    paymentAmount,
    paymentDate,
    paymentMethod,
  ]);

  useEffect(() => {
    const modal = document.getElementById(modalId) as HTMLDialogElement;
    if (isOpen) {
      modal?.showModal();
    } else {
      modal?.close();
    }
  }, [isOpen, modalId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setTrxId(e.target.value);
  };

  const validateForm = () => {
    const { transactionId } = deleteObj;
    if (!transactionId || transactionId !== trxId) {
      setError("Rewrite the transaction Id to confirm.");
      return false;
    }

    setError(null);
    return true;
  };

  const deletePaymentHandler = () => {
    if (!validateForm()) return;
    deletePayment.mutate(deleteObj.paymentId);
    setTrxId("");
    onClose();
  };

  return (
    <dialog id={modalId} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box  overflow-visible">
        <div className="">
          <h3 className="font-medium text-xl ">
            Delete Payment :{" "}
            <span className="font-lexend font-bold">{projectName}</span>
          </h3>
          <div className="my-3">
            <p className=" ">Payment: {paymentAmount}</p>
            <p className=" ">Date: {paymentDate.toDateString()}</p>
            <p className=" ">Method: {paymentMethod}</p>
          </div>
          <p className="my-2">
            Write the transaction id to confirm:{" "}
            <span className="font-semibold text-lg">{transactionId}</span>
          </p>
          {error && <p className="text-red-500">{error}</p>}
        </div>

        <div>
          <div className="form-control">
            <label className="label md:text-lg font-medium">TrxId:</label>
            <input
              className="input input-bordered"
              type="text"
              name="trxId"
              value={trxId}
              onChange={handleInputChange}
              placeholder="Transaction Id"
            />
          </div>
        </div>

        <div className="modal-action">
          <button type="button" className="btn btn-error" onClick={onClose}>
            Close
          </button>
          <button
            type="button"
            className="btn btn-warning"
            onClick={deletePaymentHandler}
            disabled={!!error || trxId !== transactionId}
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

export default DeletePaymentModal;
