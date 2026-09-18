import { infiniteQueryOptions } from "@tanstack/react-query";
import { getManagerProjects } from "../managerApis";

export const useGetManagerProjects = infiniteQueryOptions({
  queryKey: ["projects"],
  queryFn: getManagerProjects,
  initialPageParam: 1,

  getNextPageParam: (lastPage, allPages) => {
    return lastPage.length === 0 ? undefined : allPages.length + 1;
  },
});
