import { ForbiddenError } from "../errors/index.js";

function checkRole(role){
  return (req, res, next) => {
    if(req.user.role !== role){
      throw new ForbiddenError('You do not have permission to access this resource');
    }
    next();
  }
}

export { checkRole }