function logout() {
  fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  })
    .then(function () {
      document.location.replace('/');
    })
    .catch((err) => console.log(err));
}

document.querySelector('#logout-link').addEventListener('click', logout);
