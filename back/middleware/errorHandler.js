import { StatusCodes } from "http-status-codes";

function errorHandler(err, req, res, next) {

  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || 'Something went wrong'
  };

  // Error for bad inputs
  if (err.name === 'ValidationError') {
    customError.message = Object.values(err.errors).map((item) => item.message).join(', ');
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  // Error for bad ID input
  if (err.name === 'CastError') {
    customError.message = `This id format: ${err.value._id} won't work.`;
    customError.statusCode = StatusCodes.NOT_FOUND;
  }

  // Error for duplicated email
  if (err.code && err.code === 11000) {
    customError.message = `Duplicate value enterd for ${Object.keys(err.keyValue)} field, please choose another value`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }


  return res.status(customError.statusCode).json({ msg: customError.message });
}

export default errorHandler;