console.log("validate connected");

// our input fields
var firstNameVal = document.getElementById("customer-firstname").value;
var lastNameVal = document.getElementById("customer-lastname").value;
var emailVal = document.getElementById("customer-email").value;
var commentsVal = document.getElementById("customer-comments").value;
var phoneA = document.getElementById("customer-phone-a").value;
var phoneB = document.getElementById("customer-phone-b").value;
var phoneC = document.getElementById("customer-phone-c").value;

function checkForm(form) {
  // validation fails if the input is blank
  if (form.inputfield.value == "") {
    alert("Error: Input is empty!");
    form.inputfield.focus();
    return false;
  }

  // regular expression to match only alphanumeric characters and spaces
  var re = /^[\w ]+$/;

  // validation fails if the input doesn't match our regular expression
  if (!re.test(form.inputfield.value)) {
    alert("Error: Input contains invalid characters!");
    form.inputfield.focus();
    return false;
  }

  // validation was successful
  return true;
}
