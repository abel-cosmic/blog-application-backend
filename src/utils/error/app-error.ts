export default class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Not Found") {
    super(message, 404);
  }
}

export class ValidationError extends AppError {
  public errors: string[];

  constructor(message = "Validation Error", errors: string[] = []) {
    super(message, 400);
    this.errors = errors;
  }
}

export class UnauthorizedError extends AppError {
  public requiredRole: string;
  constructor(requiredRole: string, message = "Unauthorized") {
    super(message, 401);
    this.requiredRole = requiredRole;
  }
}
