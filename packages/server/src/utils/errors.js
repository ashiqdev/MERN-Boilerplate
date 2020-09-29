/* eslint-disable class-methods-use-this */
/* eslint-disable max-classes-per-file */
export class GeneralError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }

  getCode() {
    return 400;
  }
}

export class BadRequest extends GeneralError {
  constructor(message, extractedErrors = []) {
    super(message, extractedErrors);
    this.name = "BadRequest";
    this.extractedErrors = extractedErrors;
  }

  getCode() {
    return 400;
  }
}

export class NotFound extends GeneralError {
  constructor(message) {
    super(message);
    this.name = "NotFound";
  }

  getCode() {
    return 404;
  }
}
