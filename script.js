// note: I used a combination of the built in input validity checker in validateInputs()
// and my own checker in removeErrorBorder() so there might be bugs.
// For example, after the form submits once and fails, the input borders will turn
// red if the input is invalid (built in checker). As the user types in the inputs,
// my checker will check if the input is valid. If the red border of an input is removed,
// it means my checker says the input is valid, but the built in checker might not
// say it is valid and it only checks if it is valid after the form is submitted.
// So even if all inputs not red and the form is submitted, the form submission may 
// not be successful because of the built in checker. I just wanted to try using both
// and see how things work.

let form = document.querySelector('form');
let submitButton = document.querySelector('button[type="submit"]');

submitButton.addEventListener('click', function (e) {
  if (!validateInputs()) {
    form.classList.add('submit-fail');
  }
});

let inputs = document.querySelectorAll('.input-section input');

for (let i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener('keyup', removeErrorBorder);   
}

// validate inputs when submit button is pressed
function validateInputs() {
  let inputs = document.querySelectorAll('.input-section input');

  for (let i = 0; i < inputs.length; i++) {
    if (!inputs[i].checkValidity()) {
      inputs[i].classList.add('error');
    } else {
      inputs[i].classList.remove('error');
    }
  }

  let confirmPasswordInput = document.querySelector('#confirm-password');

  // add error msg for the confirm password input
  if (!confirmPasswordInput.checkValidity()) {

    removeErrorMsg();

    const confirmPasswordError = document.createElement("p");
    confirmPasswordError.style.color = "red";
    confirmPasswordError.style.fontSize = "14px";
    confirmPasswordError.style.paddingTop = "5px";

    const errorMsg = document.createTextNode("* Passwords do not match!");
    confirmPasswordError.appendChild(errorMsg);
    confirmPasswordError.classList.add('error-msg');
    confirmPasswordInput.parentElement.appendChild(confirmPasswordError);

  } else {
    removeErrorMsg();
  }

  return form.checkValidity();
}

function validatePassword() {
  let password = document.querySelector('#password');
  let confirmPassword = document.querySelector('#confirm-password');
  console.log(password.value);
  console.log(confirmPassword.value)
  console.log('poop')
  if (password.value === confirmPassword.value) {
    confirmPassword.setCustomValidity('');
  } else {
    confirmPassword.setCustomValidity('Passwords do not match!');
  }
}

// Remove error border if input becomes valid. 
// As the user types in the inputs, it will check if it is valid (after every keyup).
function removeErrorBorder(e) {
  let element = e.target;
  if (element.type === "email") {
    if (element.checkValidity()) {
      element.classList.remove('error');
    }
  } else if (element.id === "password") {
    let password = document.querySelector('#password');
    if (password.value.length >= 6) {
      element.classList.remove('error');
    }
  } else if (element.id === "confirm-password") {
    let password = document.querySelector('#password');
    let confirmPassword = document.querySelector('#confirm-password');
    if (confirmPassword.value.length >= 6) {
      if (password.value === confirmPassword.value) {
        removeErrorMsg();
        element.classList.remove('error');
      }
    }
  } else {
    element.classList.remove('error');
  }
}

// Only removes the confirm password error msg.
// I didn't make any error messages for the other inputs.
function removeErrorMsg() {
  let confirmPasswordInput = document.querySelector('#confirm-password');
  let confirmPasswordInputParent = confirmPasswordInput.parentElement;
  let errorMsg = confirmPasswordInputParent.querySelector('p.error-msg');

  if (errorMsg) {
    errorMsg.remove();
  }
}