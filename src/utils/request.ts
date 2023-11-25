import { baseUrl } from "@/services";

interface requsetOptions extends RequestInit {
  url: string;
}

interface RequsetResponse<T = any> {
  code: string;
  success: boolean;
  total: number;
  data: T;
}

async function request<T, P>(options: requsetOptions){
  const response = await fetch(`${baseUrl}${options.url}`, options);

  const result: RequsetResponse<T> = await response.json();

  if (result.code === '200' && result.success) {
    return result.data;
  }

  return Promise.reject(result);
}

request.get = function(url: string, options?: Omit<requsetOptions, 'url'>) {
  return request({ ...options, url, method: 'GET' });
}

export default request;
