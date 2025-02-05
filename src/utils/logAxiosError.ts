import util from 'util';

import Axios from 'axios';

export const logAxiosError = (error: unknown): void => {
  if (Axios.isAxiosError(error)) {
    console.error(error.config?.baseURL);
    console.error(error.config?.data);
    console.error(util.inspect(error.response?.status));
    console.error(util.inspect(error.response?.statusText));
    console.error(util.inspect(error.response?.data));
    console.error(error.response?.status);
    console.error(error.response?.statusText);
    console.error(error.response?.data);
  }
};
