import Toast from 'react-native-root-toast';
import { CHANNEL } from '@/constants';
import { baseUrl } from '@/services';
import { stringify } from './query';

interface RequsetOptions<P> extends RequestInit {
  url: string;
  data?: P;
  params?: P;
  requestType?: 'json' | 'formdata' | 'urlencoded'
}

interface RequsetResponse<T = any> {
  code: string;
  message: string;
  success: boolean;
  total: number;
  data: T;
}

function fetchWithParams<P>(options: RequsetOptions<P>): string {
  const { url, params } = options;
  const [pathname] = url.split('?');

  if (params) {
    const searchParams = new URLSearchParams(url);
    Object.entries<string>(params).forEach(([key, value]) => {
      searchParams.append(key, value);
    });
    return `${pathname}?${searchParams}`;
  }

  return url;
}

function fetchWithGlobalHeader<P>(options: RequsetOptions<P>) {
  const headers = new Headers(options.headers);
  headers.set('X-Cmall-Channel', CHANNEL);
  headers.set('Content-Type', 'application/json;charset=UTF-8');
  if (options.requestType === 'formdata') {
    headers.set('Content-Type', 'application/x-www-form-urlencoded');
  }

  if (options.requestType === 'urlencoded') {
    headers.set('Content-Type', 'application/x-www-form-urlencoded');
  }
  return headers;
}

function makeFetchBody<P>(options: RequsetOptions<P>): RequestInit['body'] {
  const { method, requestType = 'json', data } = options;
  if (data && ['POST', 'PUT'].includes(method?.toLocaleUpperCase() || '')) {
    if (requestType === 'json') {
      return JSON.stringify(data);
    }

    if (requestType === 'formdata') {
      const formData = new FormData();
      Object.entries(data).forEach(([name, value]) => {
        formData.append(name, value);
      });
      return formData;
    }

    if (requestType === 'urlencoded') {
      return stringify(data);
    }
  }

  return;
}

function makeFetchOptions<P>(options: RequsetOptions<P>): RequestInit {
  const { requestType = 'json', ...restOptions } = options;
  const fetchInit: RequestInit = { ...restOptions };
  
  fetchInit.headers = fetchWithGlobalHeader(options);
  fetchInit.body = makeFetchBody(options);

  return fetchInit;
}

async function request<T, P extends RecordAny = any>(options: RequsetOptions<P>){
  const url = fetchWithParams(options);
  const init = makeFetchOptions(options);
  console.log(url);
  const response = await fetch(`${baseUrl}${url}`, init).catch((err) => {
    console.log('err', err);
    return err;
  });

  const result: RequsetResponse<T & { total?: number }> = await response.json();

  if (result.code === '200' && result.success) {
    if (result.total) {
      result.total = result.total;
    }
    return result.data;
  } else {
    Toast.show(result.message)
  }

  return Promise.reject(result);
}

request.get = function<T, P = any>(url: string, params?: P, options?: Omit<RequsetOptions<P>, 'url'>) {
  return request<T>({ url, method: 'GET', params, ...options });
}

request.post = function<T, P = any>(url: string, data?: P, options?: Omit<RequsetOptions<P>, 'url'>) {
  return request<T>({ url, method: 'POST', data, ...options });
}

request.put = function<T, P = any>(url: string, data?: P, options?: Omit<RequsetOptions<P>, 'url'>) {
  return request<T>({ url, method: 'PUT', data, ...options });
}

request.delete = function<T, P = any>(url: string, params?: P, options?: Omit<RequsetOptions<P>, 'url'>) {
  return request<T>({ url, method: 'DELETE', params, ...options });
}

export default request;
