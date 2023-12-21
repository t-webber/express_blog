const TITLE = document.getElementById("title");
const SIGNUP = document.getElementById("signUpBtn");
const SIGNIN = document.getElementById("signInBtn");
const DIVNAME = document.getElementById("divName");
const DIVMAIL = document.getElementById("divMail");
const DIVPASS = document.getElementById("divPass");
const NAMEFIELD = document.getElementById("nameField");
const MAILFIELD = document.getElementById("mailField");
const PASSFIELD = document.getElementById("passField");

let onSignUp = true;

SIGNIN.onclick = function (event) {
  frontEndSignIn();
  event.preventDefault();
}

SIGNUP.onclick = function (event) {
  frontEndSignUp();
  event.preventDefault();
};

document.addEventListener("keydown", function (event) {
  if (event.key == "Enter") {
    if (onSignUp) {
      frontEndSignUp();
    } else {
      frontEndSignIn();
    }
  }
});

function frontEndSignIn() {
  if (onSignUp) {
    DIVNAME.style.border = "0";
    DIVMAIL.style.border = "2px solid transparent";
    DIVPASS.style.border = "2px solid transparent";

    TITLE.innerHTML = "Sign In";
    onSignUp = false;
    DIVNAME.innerHTML = "";
  } else if (MAILFIELD.value == "" && PASSFIELD.value == "") {
    DIVMAIL.style.border = "2px solid red";
    DIVPASS.style.border = "2px solid red";
  } else {
    fetchSignIn(MAILFIELD.value, PASSFIELD.value);
  }
};




function frontEndSignUp() {
  if (!onSignUp) {
    TITLE.innerHTML = "Sign Up";
    onSignUp = true;

    DIVNAME.innerHTML =
      "<svg xmlns='http://www.w3.org/2000/svg' width='10px' viewBox='0 0 448 512'><path d='M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z'/></svg><input type='text' placeholder='Name' id='nameField'>";

    DIVNAME.style.border = "2px solid transparent";
    DIVMAIL.style.border = "2px solid transparent";
    DIVPASS.style.border = "2px solid transparent";
  } else if (
    NAMEFIELD.value == "" &&
    MAILFIELD.value == "" &&
    PASSFIELD.value == ""
  ) {
    DIVNAME.style.border = "2px solid red";
    DIVMAIL.style.border = "2px solid red";
    DIVPASS.style.border = "2px solid red";
  } else {
    fetchSignUp(NAMEFIELD.value, MAILFIELD.value, PASSFIELD.value);
  }
};


function fetchSignIn(mail, pass) {
  const data = {
    mail: mail,
    pass: pass,
  };
 
  fetch("/signIn", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      res.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
}



function fetchSignUp(name, mail, pass) {
  const data = {
    name: name,
    mail: mail,
    pass: pass,
  };
 
  fetch("/signUp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      res.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
}
