import { CustomError } from ".";

export const createError = (
  type: ErrorTypes,
  message?: string
): CustomError => {
  switch (type) {
    case ErrorTypes.DATABASE_ERROR:
      return new CustomError(message || "Database error occurred", 500);
    case ErrorTypes.NOT_FOUND_ERROR:
      return new CustomError(message || "Resource not found", 404);
    case ErrorTypes.BAD_REQUEST_ERROR:
      return new CustomError(message || "Bad request", 400);
    case ErrorTypes.UNAUTHORIZED_ERROR:
      return new CustomError(message || "Unauthorized access", 401);
    case ErrorTypes.INTERNAL_SERVER_ERROR:
      return new CustomError(message || "Internal server error", 500);
    case ErrorTypes.VALIDATION_ERROR:
      return new CustomError(message || "Validation error", 422);
    case ErrorTypes.CONFLICT_ERROR:
      return new CustomError(message || "Conflict error", 409);
    case ErrorTypes.FORBIDDEN_ERROR:
      return new CustomError(message || "Forbidden", 403);
    case ErrorTypes.SERVICE_UNAVAILABLE_ERROR:
      return new CustomError(message || "Service unavailable", 503);
    case ErrorTypes.TIMEOUT_ERROR:
      return new CustomError(message || "Request timed out", 408);
    case ErrorTypes.PAYMENT_REQUIRED_ERROR:
      return new CustomError(message || "Payment required", 402);
    default:
      return new CustomError(message || "An unknown error occurred", 500);
  }
};
