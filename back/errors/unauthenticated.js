import { StatusCodes } from "http-status-codes";
import { CustomApiError } from "./customApiError.js";

class UnauthenticatedError extends CustomApiError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export { UnauthenticatedError };