import { baseUrl } from "@/services";

interface RequsetOptions<P> extends RequestInit {
  url: string;
  data?: P;
  params?: P;
  requestType?: 'json' | 'formdata'
}

interface RequsetResponse<T = any> {
  code: string;
  success: boolean;
  total: number;
  data: T;
}

function fetchWithParams<P>(options: RequsetOptions<P>): string {
  const { url, method, params } = options;
  const [pathname] = url.split('?');

  if (method === 'GET' && params) {
    const searchParams = new URLSearchParams(url);
    Object.entries<string>(params).forEach(([key, value]) => {
      searchParams.append(key, value);
    });
    return `${pathname}?${searchParams}`;
  }

  return url;
}

function makeFetchBody<P>(options: RequsetOptions<P>): RequestInit['body'] {
  const { method, requestType = 'json' } = options;

  if (requestType === 'json') {

  }

  return;
}

function makeFetchOptions<P>(options: RequsetOptions<P>): RequestInit {
  const { requestType = 'json', ...restOptions } = options;
  const fetchInit: RequestInit = { ...restOptions };

  fetchInit.body = makeFetchBody(options);

  return fetchInit;
}

async function request<T, P extends RecordAny = any>(options: RequsetOptions<P>){
  const url = fetchWithParams(options);
  const init = makeFetchOptions(options);
  console.log(url);
  const response = await fetch(`${baseUrl}${url}`, init).catch((err) => {
    console.log(err, 'err');
    return err;
  });

  const result: RequsetResponse<T> = await response.json();

  if (result.code === '200' && result.success) {
    return result.data;
  }

  return Promise.reject(result);
}

request.get = function<T, P = any>(url: string, options?: Omit<RequsetOptions<P>, 'url'>) {
  return request<T>({ ...options, url, method: 'GET' });
}

export default request;
