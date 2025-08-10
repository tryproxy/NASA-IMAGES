export interface HttpClient {
  get<T>(
    endpoint: string,
    requestOptions?: Omit<RequestInit, 'method'>
  ): Promise<T>;
  get<T>(
    endpoint: string,
    params?: Record<string, string | number>,
    requestOptions?: Omit<RequestInit, 'method'>
  ): Promise<T>;
}

class HttpError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'HttpError';
  }
}

export class Http implements HttpClient {
  private baseUrl: string;
  private statusCodeHandlers: Record<number, () => HttpError>;

  constructor(
    baseUrl: string,
    statusCodeHandlers?: Record<number, () => HttpError>
  ) {
    this.baseUrl = baseUrl;
    this.statusCodeHandlers = statusCodeHandlers || {
      400: () => new HttpError('Bad Request'),
      404: () => new HttpError('Not Found'),
      500: () => new HttpError('Internal Server Error'),
      503: () => new HttpError('Service Unavailable'),
    };
  }

  private async request<T>({
    endpoint,
    method,
    params,
    requestOptions,
  }: {
    endpoint: string;
    method: 'GET';
    params?: Record<string, string | number>;
    requestOptions?: RequestInit;
  }): Promise<T> {
    const url = new URL(endpoint, this.baseUrl);

    if (params) {
      Object.entries(params).forEach(([key, value]) =>
        url.searchParams.set(key, value.toString())
      );
    }

    const res = await fetch(url.toString(), { method, ...requestOptions });

    if (!res.ok) {
      const handler = this.statusCodeHandlers[res.status];
      if (handler) {
        throw handler();
      }
      throw new HttpError(`HTTP ${res.status} ${res.statusText}`);
    }

    return res.json();
  }

  async get<T>(
    endpoint: string,
    params?: Record<string, string | number>,
    requestOptions?: Omit<RequestInit, 'method'>
  ): Promise<T> {
    return this.request<T>({
      endpoint,
      method: 'GET',
      params,
      requestOptions,
    });
  }
}
