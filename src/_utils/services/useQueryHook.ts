import { 
  keepPreviousData, 
  useQuery 
} from "@tanstack/react-query";
import { privateRequest, publicRequest } from "../services/axiosInstance";

export const useQueryHook = <T>(
  fetchWithCredential: boolean,
  fetchPath: string,
  queryKey: (string | number)[],
  staleTime: number, // in minutes,
  enabledQuery: boolean = true,
) => {
  const fetchData = async (): Promise<T> => {
    let response;
    if (fetchWithCredential === true) response = await privateRequest.get(fetchPath);
    else response = await publicRequest.get(fetchPath);
    return response?.data;
  };

  const query = useQuery<T, ApiErrorResponse, any>({
    queryKey,
    queryFn: () => fetchData(),
    staleTime: staleTime && staleTime * 60 * 1000,
    placeholderData: keepPreviousData,
    retry: (_, error) => {
      // console.log("error query hook: \n", error);
      // Retry on failure unless it's a 401 (unauthorized) error
      return error.status !== 401 && error.status !== 404;
    },
    enabled: enabledQuery,
  });

  return query;
};