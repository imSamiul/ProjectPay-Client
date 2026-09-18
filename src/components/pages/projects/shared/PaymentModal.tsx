import { useState } from "react";
import CustomDatePicker from "@/components/shared/CustomDatePicker";
import { PaymentType } from "@/types/payment";
import { useAddPayment } from "@/services/mutations/use-payment-mutations";
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
  DialogTrigger,
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
import { PlusIcon } from "lucide-react";

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
  projectName,
  due,
  projectId,
}: PaymentModalPropsType) {
  const [open, setOpen] = useState(false);
  const [paymentModalFormValues, setPaymentModalFormValues] =
    useState<PaymentType>(INITIAL_VALUES);
  const [error, setError] = useState<string | null>(null);

  const addProjectPayment = useAddPayment();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        setOpen(false);
      },
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (!nextOpen) {
          setError(null);
          setPaymentModalFormValues(INITIAL_VALUES);
        }
      }}
    >
      <DialogTrigger render={<Button size="sm" />}>
        <PlusIcon data-icon="inline-start" />
        Add Payment
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl" showCloseButton>
        <DialogHeader>
          <DialogTitle>Add Payment for {projectName}</DialogTitle>
          <DialogDescription>
            Record a payment against the remaining due balance.
          </DialogDescription>
        </DialogHeader>

        <FieldGroup>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field data-invalid={Boolean(error) || undefined}>
              <FieldLabel htmlFor="paymentAmount">Amount</FieldLabel>
              <Input
                id="paymentAmount"
                type="number"
                name="paymentAmount"
                value={paymentModalFormValues.paymentAmount}
                onChange={handleInputChange}
                placeholder="Amount (required)"
                aria-invalid={Boolean(error) || undefined}
              />
            </Field>

            <Field data-invalid={Boolean(error) || undefined}>
              <FieldLabel htmlFor="paymentMethod">Payment Method</FieldLabel>
              <Select
                value={paymentModalFormValues.paymentMethod || undefined}
                onValueChange={(value) => {
                  setError(null);
                  setPaymentModalFormValues((prev) => ({
                    ...prev,
                    paymentMethod: value ?? "",
                  }));
                }}
              >
                <SelectTrigger id="paymentMethod" className="w-full">
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
              <FieldLabel htmlFor="transactionId">Transaction Id</FieldLabel>
              <Input
                id="transactionId"
                type="text"
                name="transactionId"
                value={paymentModalFormValues.transactionId}
                onChange={handleInputChange}
                placeholder="TrxId"
                aria-invalid={Boolean(error) || undefined}
              />
            </Field>

            <CustomDatePicker
              label="Payment Date"
              selectedDate={paymentModalFormValues.paymentDate}
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
          <Button
            onClick={addPaymentHandler}
            disabled={addProjectPayment.isPending}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default PaymentModal;
