export class ErrorHandler extends Error {
  constructor(statusCode, error) {
    super(error);
    console.log(error)
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

