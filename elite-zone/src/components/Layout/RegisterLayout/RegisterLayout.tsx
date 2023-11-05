import { useQuery } from '@tanstack/react-query';

import { useToastNotification, useHandleError } from '~/customHooks';
import { refreshTokenApi } from '~/api/Auth.api';

const Register = () => {
  const { toastSuccess, toastError } = useToastNotification();
  const { showError } = useHandleError();
  const { data } = useQuery({
    queryKey: ['test'],
    queryFn: async () => {
      try {
        const res = await refreshTokenApi();
        toastSuccess(res.data.message);
        return res;
      } catch (error) {
        showError(error, toastError);
        return Promise.reject(error);
      }
    },
  });

  return <div>AAAAAA</div>;
};
export default Register;
