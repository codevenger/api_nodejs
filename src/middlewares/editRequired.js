export default (req, res, next) => {
  // Accepted access for Admin, Manager (Supervisor) or Editor
  if ( !req.userAccess || req.userAccess > 5 ) {
    return res.status(403).json({
      errors: ['Acesso negado!'],
    });
  }
return next();
};
