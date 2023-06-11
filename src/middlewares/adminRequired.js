export default (req, res, next) => {
  // Accepted access for Admin only
  if (!req.userAccess || req.userAccess > 1) {
    return res.status(403).json({
      errors: ['Acesso negado!'],
    });
  }
  return next();
};
