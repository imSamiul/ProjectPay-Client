import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { addPayment, deletePayment, updatePayment } from "@/services/api/payments";
import { EditPaymentModalPropsType } from "@/types/payment";
import { projectKeys } from "@/lib/query-keys";

async function invalidateProjectCaches(
  queryClient: ReturnType<typeof useQueryClient>,
  projectCode: string,
) {
  await Promise.all([
    queryClient.invalidateQueries({
      queryKey: projectKeys.detail(projectCode),
    }),
    queryClient.invalidateQueries({ queryKey: projectKeys.all }),
    queryClient.invalidateQueries({ queryKey: projectKeys.searches() }),
  ]);
}

export function useAddPayment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addPayment,
    onSuccess: () => {
      toast.success("Payment added.");
    },
    onSettled: async (data) => {
      const projectCode = data?.project?.projectCode;
      if (!projectCode) return;
      await invalidateProjectCaches(queryClient, projectCode);
    },
  });
}

export function useEditPayment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedPaymentObj: EditPaymentModalPropsType) =>
      updatePayment(updatedPaymentObj),
    onSuccess: () => {
      toast.success("Payment updated.");
    },
    onSettled: async (data) => {
      const projectCode = data?.updatedProject?.projectCode;
      if (!projectCode) return;
      await invalidateProjectCaches(queryClient, projectCode);
    },
  });
}

export function useDeletePayment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (paymentId: string) => deletePayment(paymentId),
    onSuccess: () => {
      toast.success("Payment deleted.");
    },
    onSettled: async (data) => {
      const projectCode = data?.updatedProject?.projectCode;
      if (!projectCode) return;
      await invalidateProjectCaches(queryClient, projectCode);
    },
  });
}
