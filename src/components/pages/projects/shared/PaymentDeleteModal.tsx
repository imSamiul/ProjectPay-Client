import { useState } from "react";
import { DeletePaymentModalPropsType } from "@/types/payment";
import { useDeletePayment } from "@/services/mutations/use-payment-mutations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field";

function DeletePaymentModal({
  projectName,
  paymentId,
  isOpen,
  onClose,
  transactionId,
  paymentAmount,
  paymentDate,
  paymentMethod,
}: DeletePaymentModalPropsType & { isOpen: boolean; onClose: () => void }) {
  const [trxId, setTrxId] = useState("");
  const [error, setError] = useState<string | null>(null);
  const deletePayment = useDeletePayment();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setTrxId(e.target.value);
  };

  const validateForm = () => {
    if (!transactionId || transactionId !== trxId) {
      setError("Rewrite the transaction Id to confirm.");
      return false;
    }

    setError(null);
    return true;
  };

  const deletePaymentHandler = () => {
    if (!validateForm()) return;
    deletePayment.mutate(paymentId, {
      onSuccess: () => {
        setTrxId("");
        onClose();
      },
    });
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          setTrxId("");
          setError(null);
          onClose();
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Payment: {projectName}</DialogTitle>
          <DialogDescription>
            This action cannot be undone. Confirm by typing the transaction id.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-2 text-sm">
          <p>
            <span className="font-medium">Payment:</span> {paymentAmount}
          </p>
          <p>
            <span className="font-medium">Date:</span>{" "}
            {paymentDate.toDateString()}
          </p>
          <p>
            <span className="font-medium">Method:</span> {paymentMethod}
          </p>
          <p>
            Write the transaction id to confirm:{" "}
            <span className="font-semibold">{transactionId}</span>
          </p>
        </div>

        <Field data-invalid={Boolean(error) || undefined}>
          <FieldLabel htmlFor="confirmTrxId">TrxId</FieldLabel>
          <Input
            id="confirmTrxId"
            type="text"
            name="trxId"
            value={trxId}
            onChange={handleInputChange}
            placeholder="Transaction Id"
            aria-invalid={Boolean(error) || undefined}
          />
          {error ? <FieldDescription>{error}</FieldDescription> : null}
        </Field>

        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>Close</DialogClose>
          <Button
            variant="destructive"
            onClick={deletePaymentHandler}
            disabled={
              deletePayment.isPending ||
              Boolean(error) ||
              trxId !== transactionId
            }
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeletePaymentModal;
