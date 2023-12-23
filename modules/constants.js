
//
// Success
//

const Success = 0;

//
// Errors
//

const UnknownError = 1;
const WrongPassWord = 2;
const UserDoesntExist = 3;
const UserAlreadyExist = 4;
const InternalCreateUserError = 5;

//
// Dictionary
//

const values = {
  UnknownError: ('Unknown Error', 500),
  WrongPassWord: ('Wrong Password', 403),
  UserDoesntExist: ('Wrong e-mail : User Doesn\'t Exist', 403),
  UserAlreadyExist: ('User Already Exist', 403),
  InternalCreateUserError: ('Internal Error : Couldn\'t create user', 500),
};

//
// Exports
//

module.exports = {
  values,
  UnknownError,
  Success,
  WrongPassWord,
  UserDoesntExist,
  UserAlreadyExist,
  InternalCreateUserError,
};
