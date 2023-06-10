export default (error, req, res, next) => {
  console.log('Eu errei!');
  if(error.errors) {
    return res.status(400).json({
      errors: error.errors.map((err) => err.message),
    });
  }
  return res.status(400).json({
    errors: [ error.message ]
  });
}
