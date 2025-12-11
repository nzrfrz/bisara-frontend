import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { GlobalContext } from "../../../globalContextCreate";
import { useMutationHook, setSecureItem } from "../../../_utils";

export const useLoginPage = () => {
  const navigateTo = useNavigate();
  const { setLoginCredential } = useContext(GlobalContext);

  const onSuccessMutate = (data: ApiSuccessResponse<UserCredential>) => {
    const responseData = data.data;
    setSecureItem(responseData as any);
    setLoginCredential(JSON.stringify(responseData));
    navigateTo('/');
  };

  const onErrorMutate = async (error: ApiErrorResponse) => {
    console.log("Login error: \n", error);
  };

  const mutateAction = useMutationHook(
    'user/login/',
    'public',
    'patch',
    '',
    ['userCredential'],
    onSuccessMutate,
    onErrorMutate
  )

  const onFinishForm = (formData: any) => {
    console.log(formData);
    mutateAction.mutateAsync(formData)
  };

  return {
    onFinishForm
  }
};