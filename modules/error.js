
function error(res, user, err, message, code = 404) {
  console.log(` /!\\ Error ${code} : ${err} (${message}) /!\\ `);
  res.status(parseInt(code)).render('common/main', {
    pagetitle: 'Error',
    filepath: 'main/404',
    user,
    err: {message, err, code},
  });
}

module.exports = {error};
