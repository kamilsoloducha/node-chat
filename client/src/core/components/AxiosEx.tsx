import { useEffectOnce } from 'core/hooks/useEffectOnce';
import { useUserStorage } from 'core/hooks/useUserStorage';
import { ReactElement } from 'react';
import { instance as http } from 'core/http/http.service';
import { AxiosError } from 'axios';

export default function AxiosEx({ children }: AxiosExProps): ReactElement {
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
  return <>{children}</>;
}

type AxiosExProps = {
  children?: ReactElement;
};
