import { toast, ToastOptions } from 'react-toastify';

const useToastNotification = () => {
  const options: ToastOptions = {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    rtl: false,
    pauseOnFocusLoss: true,
    draggable: true,
    pauseOnHover: true,
  };

  // Function to display a success toast
  const toastSuccess = (message: string) => {
    toast.success(message, options);
  };

  // Function to display an error toast
  const toastError = (message: string) => {
    toast.error(message, options);
  };

  // Function to display an info toast
  const toastInfo = (message: string) => {
    toast.info(message, options);
  };

  // Function to display a warning toast
  const toastWarning = (message: string) => {
    toast.warning(message, options);
  };

  return { toastSuccess, toastError, toastInfo, toastWarning };
};

export default useToastNotification;
