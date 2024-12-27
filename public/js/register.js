function validateEmail() {
  const email = document.getElementById('email').value;
  const regex = /^[a-zA-Z0-9.-]+$/;
  if (!regex.test(email)) {
    alert('An invalid email has been entered. You may only include letters, numbers, periods, and dashes. Make sure you do not include @p0ntus.com');
    return false;
  }
  return true;
}