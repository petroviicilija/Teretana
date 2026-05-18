import { StatusCodes } from "http-status-codes";

function notFound(req, res, next){
  res.status(StatusCodes.NOT_FOUND).send(`Route ${req.originalUrl} not found`);
}

export {
  notFound
}