module.exports = function filterPublicDrawings(req, res, next) {

  if (!req.options){
    req.options = {};
  }
  if (!req.options.where){
    req.options.where = {};
  }
  
  req.options.where.saveMode = 'PUBLIC';

  //safe to do if isAuthorized policy is enforced in tandem.
  return next();
}
