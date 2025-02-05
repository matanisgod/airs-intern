import AxiosExamples, { AxiosExamplesReturn } from '@/common/api/routes/examples';

type ApiObject = {
  examples: AxiosExamplesReturn;
};

type ApiCustomConfig =
  | {
      apiUrl?: string | undefined;
      timeout?: number | undefined;
    }
  | undefined;

const api = (accessToken: string, config?: ApiCustomConfig): ApiObject => {
  const apiUrl = config?.apiUrl;
  // const timeout = config?.timeout;
  const headers = {
    Authorization: `Bearer ${accessToken || ' '}`,
  };

  return {
    examples: AxiosExamples({ apiUrl, headers }),
  };
};

export default api;
