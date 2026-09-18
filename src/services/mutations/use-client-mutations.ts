import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createManagerClient,
  CreateClientPayload,
} from "@/services/api/managers";
import { clientKeys } from "@/lib/query-keys";
import { getErrorMessage } from "@/lib/errors";

export function useCreateManagerClient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateClientPayload) => createManagerClient(payload),
    onSuccess: (data) => {
      toast.success(`Client ${data.client.clientName} saved.`);
      if (data.client.temporaryPassword) {
        toast.message("Temporary password generated", {
          description: data.client.temporaryPassword,
        });
      }
      queryClient.invalidateQueries({ queryKey: clientKeys.lists() });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
