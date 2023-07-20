module.exports = (request,response, next) => {
  response.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); //Origin
  response.setHeader('Access-Control-Allow-Methods', '*'); // Metódos
  response.setHeader('Access-Control-Allow-Headers', '*'); //Headers
  response.setHeader('Access-Control-Max-Age', '20'); //Cachear preflight -> tempo de cache
  next();
}
