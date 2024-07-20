import { useEffectOnce } from 'core/hooks/useEffectOnce';
import { useUserStorage } from 'core/hooks/useUserStorage';
import { ReactElement, ReactNode } from 'react';
import http from 'core/http/http.service';
import { AxiosError } from 'axios';

export default function AxiosEx({ chrildren }: AxiosExProps): ReactElement {
  const { get } = useUserStorage();

  useEffectOnce(() => {
    http.interceptors.request.use(
      (req) => {
        const user = get();
        if (user) {
          req.headers.Authorization = 'Bearer ' + user.token;
        }
        return req;
      },
      (error) => {
        console.error(error);
      },
    );

    http.interceptors.response.use(
      (_) => _,
      (error: AxiosError) => {
        if (error?.response?.status === 401) {
          console.error('Response code: 401');
          window.location.href = '/logout';
          return;
        }
        if (error?.response?.status! >= 500) {
          console.error('Response code: 500', error);
          return;
        }
        console.error(error);
        return error;
      },
    );
  });
  return <>{chrildren}</>;
}

type AxiosExProps = {
  chrildren?: ReactNode;
};
