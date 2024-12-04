document.getElementById('email').addEventListener('input', function() {
    let emailInput = document.getElementById('email').value;
    let prefix = document.getElementById('email-prefix');
    if (emailInput.includes('@p0ntus.com')) {
        prefix.innerText = emailInput.split('@')[0];
    } else {
        prefix.innerText = emailInput;
    }
});