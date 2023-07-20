module.exports = (error, request, response, next) => {
  console.log('Error 500',error);
  response.sendStatus(500);
}
