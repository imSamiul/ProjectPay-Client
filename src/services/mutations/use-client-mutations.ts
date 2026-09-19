import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  linkClientToProject,
  unlinkClientFromProject,
} from "@/services/api/projects";
import { clientKeys, projectKeys } from "@/lib/query-keys";
import { getErrorMessage } from "@/lib/errors";

export function useLinkClient(projectCode: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (clientKey: string) =>
      linkClientToProject(projectCode, clientKey),
    onSuccess: () => {
      toast.success("Client linked to this project.");
      queryClient.invalidateQueries({
        queryKey: projectKeys.detail(projectCode),
      });
      queryClient.invalidateQueries({ queryKey: clientKeys.lists() });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

export function useUnlinkClient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      projectCode,
      clientId,
    }: {
      projectCode: string;
      clientId: string;
    }) => unlinkClientFromProject(projectCode, clientId),
    onSuccess: (_data, variables) => {
      toast.success("Client removed from this project.");
      queryClient.invalidateQueries({
        queryKey: projectKeys.detail(variables.projectCode),
      });
      queryClient.invalidateQueries({ queryKey: clientKeys.lists() });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
