const fs = require('fs');

const constants = require('./constants.js');
// const errorModule = require('./error.js');
const usersPath = './data/users.csv';
const bcrypt = require('bcryptjs');

function compareAsync(param1, param2) {
  return new Promise(function(resolve, reject) {
      bcrypt.compare(param1, param2, function(err, res) {
          if (err) {
               reject(err);
          } else {
               resolve(res);
          }
      });
  });
}

function lookForUser(body, user) {
  return new Promise((resolve, reject) => {
    fs.readFile(usersPath, async (err, data) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      const lines = data.toString().split('\n');
      var exists = false;
      var right = false;
      for (const line of lines) {
        const elts = line.split(';');
        if (elts.length != 3) {
          console.log(' * Reading user of length = ', elts.length);
          continue;
        }
        if (elts[1] == body.mail) {
          exists = true;
          const hash_input = await bcrypt.hashSync(body.pass, 10);
          console.log(' * Hashed input = ', hash_input);
          console.log(' * Hashed pass = ', elts[2]);
          right = await compareAsync(body.pass, elts[2]);
          if (right) {
            user.connected = true;
            user.name = elts[0];
            user.mail = elts[1];
          }
          break;
        }
      }
      console.log(
          ' * At the end of lookForUser, (exists, right) = ',
          exists,
          right,
      );
      if (exists && right) {
        resolve(2);
      } else if (exists) {
        resolve(1);
      } else {
        resolve(0);
      }
    });
  });
}

function writeUser(body, user, data) {
  return new Promise((resolve, reject) => {
    fs.appendFile(usersPath, data, (err) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      console.log(' >>> The user was successfully created <<< ');
      user.connected = true;
      user.name = body.name;
      user.mail = body.mail;
      resolve(constants.HomePage);
    });
  });
}

async function createUser(body, res, user) {
  console.log(' * Creating user with fields = ', body);
  const data = body.name + ';' + body.mail + ';' + body.pass + '\n';
  console.log(' * Data = ', data);
  var temp = {};

  lookForUser(body, temp)
      .then((result) => {
        if (result != 0) {
          console.log(` >>> User already exist <<< `);
          res.redirect('/404');
        } else {
          console.log(` >>> User doesn't exist : <<< `);
          writeUser(body, user, data)
              .then((result) => {
                console.log(' * Resolving with x = ', result);
              });
          res.redirect('/profile');
        }
      });
}

function checkUser(body, res, user) {
  return new Promise(async (resolve, reject) => {
    console.log(' * Creating user with fields = ', body);
    const data = body.name + ';' + body.mail + ';' + body.pass + '\n';
    console.log(' * Data = ', data);
    var temp = {};

    lookForUser(body, user)
        .then((result) => {
          if (result == 0) {
            console.log(` >>> User doesn't exist <<< `);
            res.redirect('/404');
          } else if (result == 1) {
            console.log(` >>> Wrong Password <<< `);
            res.redirect('/404');
          } else {
            console.log(` >>> User exists <<< `);
            user = temp;
            res.redirect('/');
          }
        });
  });
}

module.exports = {createUser, checkUser};
