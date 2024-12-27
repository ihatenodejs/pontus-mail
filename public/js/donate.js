function copyToClipboard(elementId) {
  const text = document.getElementById(elementId).innerText;
  navigator.clipboard.writeText(text).then(() => {
    alert('Copied to clipboard');
  }).catch(err => {
    console.error('Failed to copy: ', err);
  });
}