import { useState } from "react";
import CustomDatePicker from "@/components/shared/CustomDatePicker";
import { EditPaymentModalPropsType } from "@/types/payment";
import { useEditPayment } from "@/services/mutations/use-payment-mutations";
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
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function EditPaymentModal({
  paymentAmount,
  paymentDate,
  paymentMethod,
  transactionId,
  due,
  projectName,
  projectId,
  paymentId,
  isOpen,
  onClose,
}: EditPaymentModalPropsType & { isOpen: boolean; onClose: () => void }) {
  const [editPaymentModalFormValues, setEditPaymentModalFormValues] = useState({
    paymentAmount,
    paymentDate,
    paymentMethod,
    transactionId,
  });
  const [error, setError] = useState<string | null>(null);
  const editPayment = useEditPayment();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    const {
      paymentAmount: amount,
      paymentMethod: method,
      transactionId: trxId,
    } = editPaymentModalFormValues;
    if (amount <= 0 || !method || !trxId) {
      setError("All fields must be filled correctly.");
      return false;
    }
    if (amount > due) {
      setError("Payment amount cannot exceed due amount.");
      return false;
    }
    setError(null);
    return true;
  };

  const editPaymentHandler = () => {
    if (!validateForm()) return;

    editPayment.mutate(
      {
        ...editPaymentModalFormValues,
        projectId,
        paymentId,
        due,
        projectName,
        modalId: "editPaymentModal",
        paymentAmount: Number(editPaymentModalFormValues.paymentAmount),
      },
      { onSuccess: onClose },
    );
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Edit Payment: {projectName}</DialogTitle>
          <DialogDescription>
            Update payment details for this project.
          </DialogDescription>
        </DialogHeader>

        <FieldGroup>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field data-invalid={Boolean(error) || undefined}>
              <FieldLabel htmlFor="editPaymentAmount">Amount</FieldLabel>
              <Input
                id="editPaymentAmount"
                type="number"
                name="paymentAmount"
                value={editPaymentModalFormValues.paymentAmount}
                onChange={handleInputChange}
                placeholder="Amount (required)"
                aria-invalid={Boolean(error) || undefined}
              />
            </Field>

            <Field data-invalid={Boolean(error) || undefined}>
              <FieldLabel htmlFor="editPaymentMethod">Payment Method</FieldLabel>
              <Select
                value={editPaymentModalFormValues.paymentMethod || undefined}
                onValueChange={(value) => {
                  setError(null);
                  setEditPaymentModalFormValues((prev) => ({
                    ...prev,
                    paymentMethod: value ?? "",
                  }));
                }}
              >
                <SelectTrigger id="editPaymentMethod" className="w-full">
                  <SelectValue placeholder="Pick one" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="bkash">Bkash</SelectItem>
                    <SelectItem value="nagad">Nagad</SelectItem>
                    <SelectItem value="rocket">Rocket</SelectItem>
                    <SelectItem value="bank">Bank</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>

            <Field data-invalid={Boolean(error) || undefined}>
              <FieldLabel htmlFor="editTransactionId">Transaction Id</FieldLabel>
              <Input
                id="editTransactionId"
                type="text"
                name="transactionId"
                value={editPaymentModalFormValues.transactionId}
                onChange={handleInputChange}
                placeholder="TrxId"
                aria-invalid={Boolean(error) || undefined}
              />
            </Field>

            <CustomDatePicker
              label="Payment Date"
              selectedDate={editPaymentModalFormValues.paymentDate}
              onSelectDate={handleDateChange}
            />
          </div>
        </FieldGroup>

        {error ? (
          <Field data-invalid>
            <FieldDescription>{error}</FieldDescription>
          </Field>
        ) : null}

        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>Close</DialogClose>
          <Button onClick={editPaymentHandler} disabled={editPayment.isPending}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditPaymentModal;
