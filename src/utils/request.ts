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

type queryData = {
  key: string,
  value: unknown
}

type OptionsWithoutMethod = Omit<Options, 'method'>;

class HTTPTransport {
  get(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.request(url, {...options, method: METHODS.GET});
  }

  put(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.request(url, {...options, method: METHODS.PUT});
  }

  post(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.request(url, {...options, method: METHODS.POST});
  }

  delete(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.request(url, {...options, method: METHODS.DELETE});
  }

  patch(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.request(url, {...options, method: METHODS.PATCH});
  }

  request(url: string, options: Options = { method: METHODS.GET }, timeout: number = 5000): Promise<XMLHttpRequest> {
    const { method, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      if (method === METHODS.GET) {
        url += HTTPTransport.queryStringify(data);
      }

      xhr.open(method, url);

      xhr.onload = function() {
        resolve(xhr);
      }

      xhr.timeout = timeout;
      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(JSON.stringify(data));
      }
    });
  }

  static queryStringify(data: queryData[]) {
    return Object.entries(data).reduce((result, item, index, array) => {
      result += `${item[0]}=${item[1]}`;
      if (index !== array.length - 1) {
        result += '&';
      }
      return result;
    }, '?');
  }
}