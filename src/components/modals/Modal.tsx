type ModalProps = {
  id: string;
  title: string;
  content: string;
  openButtonLabel?: string; // Optional prop with a default value
  closeButtonLabel?: string; // Optional prop with a default value
  confirmButtonLabel?: string; // Optional prop with a default value
  btnConfirmAction: () => void;
};

function Modal({
  id,
  title,
  content,
  openButtonLabel = "Open Modal",
  closeButtonLabel = "Close",
  confirmButtonLabel = "Confirm",
  btnConfirmAction,
}: ModalProps) {
  const openModal = (modalId: string) => {
    const modal = document.getElementById(modalId) as HTMLDialogElement;
    modal?.showModal();
  };

  const handleSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const modal = document.getElementById(id) as HTMLDialogElement;
    modal?.close();
  };

  return (
    <div>
      {/* Button to open the modal */}
      <button
        className="btn btn-error outline-none border-none hover:btn-error/60  btn-sm md:btn-md "
        onClick={() => openModal(id)}
      >
        {openButtonLabel}
      </button>

      {/* Combined Modal with modal-bottom sm:modal-middle */}
      <dialog id={id} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box ">
          <h3 className="font-bold text-lg ">{title}</h3>
          <p className="py-4 ">{content}</p>
          <div className="modal-action">
            <form method="dialog " onSubmit={handleSubmitHandler}>
              {/* Close button inside the modal */}
              <div className="flex gap-3">
                <button className="btn btn-error">{closeButtonLabel}</button>
                <button className="btn btn-warning" onClick={btnConfirmAction}>
                  {confirmButtonLabel}
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* Clicking outside the modal area to close */}
        <form method="dialog" className="modal-backdrop">
          <button>{closeButtonLabel}</button>
        </form>
      </dialog>
    </div>
  );
}

export default Modal;
