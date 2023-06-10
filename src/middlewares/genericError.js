export default (error, req, res, next) => {
  if( !error ) {
    return next();
  }
  if( error.errors ) {
    return res.status(400).json({
      errors: error.errors.map((err) => err.message),
    });
  }
  return res.status(400).json({
    errors: [ error.message ]
  });
}
