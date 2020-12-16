document.addEventListener('DOMContentLoaded', () => {
  const auth = document.getElementById('auth');
  const login = document.getElementById('login');
  const registration = document.getElementById('registration');
  const loginButton = login.querySelector('.content-button');
  const regButton = registration.querySelector('.content-button');

  loginButton.addEventListener('click', loginFn);
  regButton.addEventListener('click', registrationFn);

  auth.addEventListener('click', (e) => {
    e.preventDefault();

    if (e.target.className === 'switch-button') {
      if (e.target.name === 'login') {
        login.style.display = 'none';
        registration.style.display = 'block';
        [...login.querySelectorAll('input')].forEach((item) => {
          item.value = '';
        });
      } else {
        login.style.display = 'block';
        registration.style.display = 'none';
        [...registration.querySelectorAll('input')].forEach((item) => {
          item.value = '';
        });
      }
    }
  });

  function loginFn(e) {
    e.preventDefault();
    const data = {
      login: document.getElementById('login-login').value,
      password: document.getElementById('login-password').value,
    };

    fetch('/api/auth/login', {
      method: 'post',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        const container = login.querySelector('.login-error');
        if (!res.ok) {
          const { error, fields } = res;
          [...login.querySelectorAll('input')].forEach((item) => {
            item.style.border = '1px solid black';
          });
          container.style.color = 'red';
          container.innerHTML = '';
          container.innerHTML = error;
          for (let field of fields) {
            login.querySelector(`input[name=${field}]`).style.border =
              '1px solid red';
          }
        } else {
          window.location.reload();
        }
      });
  }

  function registrationFn(e) {
    e.preventDefault();

    const data = {
      login: document.getElementById('registration-login').value,
      password: document.getElementById('registration-password').value,
      passwordConfirm: document.getElementById('registration-password-confirm')
        .value,
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
          setTimeout(() => window.location.reload(), 2000);
        }
      });
  }
});
