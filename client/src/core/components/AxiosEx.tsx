import { useEffectOnce } from 'core/hooks/useEffectOnce';
import { useUserStorage } from 'core/hooks/useUserStorage';
import { ReactElement } from 'react';
import { instance as http } from 'core/http/http.service';
import { AxiosError } from 'axios';
import { refresh, RefreshRequest } from 'core/http/user-http-client.service';

export default function AxiosEx({ children }: AxiosExProps): ReactElement {
  const { get, set } = useUserStorage();

  useEffectOnce(() => {
    const refreshToken = async () => {
      const user = get();
      const refreshTimout = 30_000;
      if (!user || user.expirationDate - new Date().valueOf() > refreshTimout) {
        return;
      }

      const refreshRequest: RefreshRequest = {
        token: user.token,
        expirationDate: new Date(user.expirationDate),
      };
      var refreshResponse = await refresh(refreshRequest);

      if (refreshResponse.isSuccessful) {
        set({
          id: user.id,
          name: user.name,
          token: refreshResponse.accessToken,
          expirationDate: new Date(refreshResponse.expirationDate).valueOf(),
        });
      }
    };

    http.interceptors.request.use(
      async (req) => {
        if (req.url !== '/users/refresh') {
          await refreshToken();
        }

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
