class HttpError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'HttpError';
  }
}

export const nasaStatusCodeHandlers: Record<number, () => HttpError> = {
  400: () =>
    new HttpError(
      'The request is unacceptable due to missing a required parameter.'
    ),
  404: () => new HttpError('The requested resource does not exist.'),
  500: () => new HttpError('Something went wrong on NASA API end.'),
  502: () => new HttpError('Something went wrong on NASA API end.'),
  503: () => new HttpError('Something went wrong on NASA API end.'),
  504: () => new HttpError('Something went wrong on NASA API end.'),
};
