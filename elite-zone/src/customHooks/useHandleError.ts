import { isAxiosError } from '../utils/helperFunctions';

const useHandleError = () => {
  // Show error in try/catch block
  const showError = (error: any, showErrorComponent: (msg: string) => void) => {
    const message: string = isAxiosError<{ message: string }>(error)
      ? error?.response?.data?.message
      : error?.message;
    if (message) {
      showErrorComponent(message);
    } else {
      showErrorComponent('Có lỗi xảy ra!');
    }
  };
  return {
    showError,
  };
};

export default useHandleError;
