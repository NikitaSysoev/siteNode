document.addEventListener('DOMContentLoaded', () => {
  const auth = document.getElementById('auth');
  const login = document.getElementById('login');
  const registration = document.getElementById('registration');

  auth.addEventListener('click', (e) => {
    if (
      e.target.className !== 'content-button' &&
      e.target.name !== 'action-form'
    ) {
      e.preventDefault();
    }

    if (e.target.className === 'switch-button') {
      if (e.target.name === 'login') {
        login.style.display = 'none';
        registration.style.display = 'block';
      } else {
        login.style.display = 'block';
        registration.style.display = 'none';
      }
    }
  });
});
