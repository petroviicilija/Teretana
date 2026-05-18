import { StatusCodes } from "http-status-codes";
import { CustomApiError } from "./customApiError.js";

class ForbiddenError extends CustomApiError{
  constructor(message){
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}

export {
  ForbiddenError
}