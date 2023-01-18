import queryStringify from "../utils/queryStringify";

enum METHODS {
  GET = 'GET',
  POST =  'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

type Options = {
  method: string,
  data?: any
}

export type OptionsWithoutMethod = Omit<Options, 'method'>;

export class HTTPTransport {
  static API_URL = 'https://ya-praktikum.tech/api/v2';
  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
  }

  public get<Response>(path: string): Promise<Response> {
    return this.request<Response>(this.endpoint + path);
  }

  public put<Response = void>(path: string, data: unknown): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {method: METHODS.PUT, data});
  }

  public post<Response = void>(path: string, data?: unknown): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {method: METHODS.POST, data});
  }

  public delete<Response>(path: string): Promise<Response> {
    return this.request<Response>(this.endpoint + path, { method: METHODS.DELETE });
  }

  public patch<Response = void>(path: string, data: unknown): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {method: METHODS.PATCH, data});
  }

  private request<Response>(url: string, options: Options = { method: METHODS.GET }, timeout: number = 5000): Promise<Response> {
    const { method, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      if (method === METHODS.GET && data) {
        url += queryStringify(data);
      }

      xhr.open(method, url);

      xhr.onload = function() {
        resolve(xhr.response);
      }

      xhr.timeout = timeout;
      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      xhr.withCredentials = true;
      xhr.responseType = 'json';

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(JSON.stringify(data));
      }
    });
  }
}
