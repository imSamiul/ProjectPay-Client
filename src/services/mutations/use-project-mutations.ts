import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  ProjectType,
  UpdateProjectStatusType,
  UpdateProjectType,
} from "@/types/project";
import {
  apiUpdateProjectDetails,
  createNewProject,
  deleteProject,
  updateProjectStatus,
} from "@/services/api/projects";
import { useNavigate } from "@tanstack/react-router";
import { projectKeys } from "@/lib/query-keys";

export function useCreateNewProject() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (projectObj: ProjectType) => createNewProject(projectObj),
    onSuccess: (data) => {
      toast.success("Project created.");
      navigate({
        to: "/project/$projectCode",
        params: { projectCode: data.projectCode },
      });
    },
    onSettled: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: projectKeys.all }),
        queryClient.invalidateQueries({ queryKey: projectKeys.searches() }),
      ]);
    },
  });
}

export function useUpdateProjectStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedStatusObj: UpdateProjectStatusType) =>
      updateProjectStatus(updatedStatusObj),
    onSuccess: () => {
      toast.success("Project status updated.");
    },
    onSettled: async (data) => {
      if (!data?.projectCode) return;
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: projectKeys.detail(data.projectCode),
        }),
        queryClient.invalidateQueries({ queryKey: projectKeys.all }),
        queryClient.invalidateQueries({ queryKey: projectKeys.searches() }),
      ]);
    },
  });
}

export function useUpdateProjectDetails() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (updatedProjectObj: UpdateProjectType) =>
      apiUpdateProjectDetails(updatedProjectObj),
    onSuccess: (data) => {
      toast.success("Project updated.");
      navigate({
        to: "/project/$projectCode",
        params: { projectCode: data.projectCode },
      });
    },
    onSettled: async (data) => {
      if (!data?.projectCode) return;
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: projectKeys.detail(data.projectCode),
        }),
        queryClient.invalidateQueries({ queryKey: projectKeys.all }),
        queryClient.invalidateQueries({ queryKey: projectKeys.searches() }),
      ]);
    },
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (projectId: string) => deleteProject(projectId),
    onSuccess: () => {
      toast.success("Project deleted.");
      navigate({ to: "/projectManager/projects", search: { q: "", page: 1 } });
    },
    onSettled: async (data) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: projectKeys.all }),
        queryClient.invalidateQueries({ queryKey: projectKeys.searches() }),
        data?.projectCode
          ? queryClient.removeQueries({
              queryKey: projectKeys.detail(data.projectCode),
            })
          : Promise.resolve(),
      ]);
    },
  });
}
