class ApiError extends Error {
  status: number;
  errors: any;
  constructor(status: number, message: string, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static BadRequest(message: string, errors = []) {
    return new ApiError(400, message, errors);
  }

  static UnauthorizedError(message?: string) {
    return new ApiError(401, message || "User is not authorized");
  }

  static ForbiddenError(message?: string) {
    return new ApiError(403, message || "User is not allowed");
  }

  static NotFound(message: string, errors = []) {
    return new ApiError(404, message, errors);
  }

  static internal(message?: string) {
    return new ApiError(500, message || "Internal server error");
  }
}

export default ApiError;
