import { queryOptions } from "@tanstack/react-query";
import { fetchUserDetails } from "@/services/api/users";
import { userKeys } from "@/lib/query-keys";

export const currentUserQuery = queryOptions({
  queryKey: userKeys.me(),
  queryFn: fetchUserDetails,
});
