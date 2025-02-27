import util from 'util';

import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import axiosBetterStacktrace from 'axios-better-stacktrace';
import _ from 'lodash';

import { regexOfManySlashes } from '@/utils/regex';

axios.defaults.timeout = 30000;

const create = (customConfig: AxiosRequestConfig): AxiosInstance => {
  const baseUrl = process.env.ATOM_SERVER_URI || 'http://192.168.40.203:8000';
  const { url = '' } = customConfig;
  const apiUrl = baseUrl + url;

  const config: AxiosRequestConfig = {
    baseURL: apiUrl,
  };

  if (customConfig.baseURL && customConfig.url) {
    customConfig.baseURL += customConfig.url;
  }

  _.merge(config, customConfig);

  const instance = axios.create(config);

  axiosBetterStacktrace(instance);

  instance.interceptors.request.use((request) => {
    console.info('=========================================');
    console.info('Starting Request');
    console.info(
      `request url: ${util
        .inspect((request.baseURL || 'no_base') + request.url)
        .replace(regexOfManySlashes, '/')}`,
    );
    console.info(`auth token: ${util.inspect(request.headers?.Authorization)}`);
    console.info(`request params: ${util.inspect(request.params)}`);
    console.info(`request body: ${util.inspect(request.data)}`);
    console.info('=========================================');
    return request;
  });
  instance.interceptors.response.use((response) => {
    console.info('=========================================');
    console.info('Receiving response');
    console.info(`method: ${util.inspect(response.request.method)}`);
    console.info(
      `url: : ${util.inspect(
        response.request.protocol + '//' + response.request.host + response.request.path,
      )}`,
    );
    console.info(`status code: ${util.inspect(response.status)}`);
    console.info(`response data: ${util.inspect(response.data)}`);
    console.info('=========================================');
    return response.data;
  });
  return instance;
};

const axiosDecorator = {
  create,
};

export default axiosDecorator;
