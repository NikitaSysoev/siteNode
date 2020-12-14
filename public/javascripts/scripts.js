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

  registration
    .querySelector('.content-button')
    .addEventListener('click', (e) => {
      e.preventDefault();

      const data = {
        login: document.getElementById('registration-login').value,
        password: document.getElementById('registration-password').value,
        passwordConfirm: document.getElementById(
          'registration-password-confirm',
        ).value,
      };

      fetch('/api/auth/register', {
        method: 'post',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((res) => {
          const container = registration.querySelector('.registration-error');
          if (!res.ok) {
            const { error, fields } = res;
            [...registration.querySelectorAll('input')].forEach((item) => {
              item.style.border = '1px solid black';
            });
            container.style.color = 'red';
            container.innerHTML = '';
            container.innerHTML = error;
            for (let field of fields) {
              registration.querySelector(`input[name=${field}]`).style.border =
                '1px solid red';
            }
          } else {
            container.style.color = 'green';
            container.innerHTML = 'Отлично';
            [...registration.querySelectorAll('input')].forEach((item) => {
              item.style.border = '1px solid black';
            });
          }
        });
    });
});
