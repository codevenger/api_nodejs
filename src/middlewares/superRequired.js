export default (req, res, next) => {
  // Accepted access for Admin or Manager (Supervisor)
  if (!req.userAccess || req.userAccess > 3) {
    return res.status(403).json({
      errors: ['Acesso negado!'],
    });
  }
  return next();
};
