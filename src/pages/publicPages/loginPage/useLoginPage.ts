import { useNavigate } from "react-router-dom";
import { useMutationHook } from "../../../_utils";

export const useLoginPage = () => {
  const navigateTo = useNavigate()

  const onSuccessMutate = () => {
    navigateTo('/', {replace: true});
    console.log("Login Successfully");
  };

  const onErrorMutate = async (error: ApiErrorResponse) => {
    console.log("Login error: \n", error);
  };

  const mutateAction = useMutationHook(
    'user/login/',
    'private',
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