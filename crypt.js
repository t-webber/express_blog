const bcrypt = require('bcryptjs');

const password = '123456';

async function hash(password) {
  const hasher = await bcrypt.hash(password, 10);
  console.log(' * Hasher = ', hasher);
  return hasher;
}

hash(password);


// bcrypt.hash(password, 10).then((hash) => {
//     console.log(' * Hash = ', hash);
//     bcrypt.compare(password, hash).then((res) => {
//         console.log(' * Result = ', res);
//     }).catch((err) => {
//         console.log(' * Error = ', err);
//     })
// }).catch((err) => {
//     console.log(' * Error = ', err);
// });