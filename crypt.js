const bcrypt = require('bcryptjs');

const password = '123456';

bcrypt.hash(password, 10).then((hash) => {
    console.log(' * Hash = ', hash);
    bcrypt.compare(password, hash).then((res) => {
        console.log(' * Result = ', res);
    }).catch((err) => {
        console.log(' * Error = ', err);
    })
}).catch((err) => {
    console.log(' * Error = ', err);
});