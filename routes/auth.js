const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

const models = require('../models');

router.post('/register', (req, res) => {
  const { login, password, passwordConfirm } = req.body;

  if (!login || !password || !passwordConfirm) {
    res.json({
      ok: false,
      error: 'Все поля должны быть заполнены',
      fields: ['login', 'password', 'passwordConfirm'],
    });
  } else if (login.length < 3 || login.length > 16) {
    res.json({
      ok: false,
      error: 'Длина пароля от 3 до 16 символов',
      fields: ['login'],
    });
  } else if (password !== passwordConfirm) {
    res.json({
      ok: false,
      error: 'Пароли не совпадают',
      fields: ['password', 'passwordConfirm'],
    });
  } else {
    models.User.findOne({ login }).then((user) => {
      if (!user) {
        bcrypt.hash(password, saltRounds, (err, hash) => {
          models.User.create({
            login,
            password: hash,
          })
            .then((user) => {
              console.log(user);
              res.json({
                ok: true,
              });
            })
            .catch((e) => {
              console.log(e);
              res.json({
                ok: false,
                error: 'Ошибка, попробуйте позже',
              });
            });
        });
      } else {
        res.json({
          ok: false,
          error: 'Имя занято',
          fields: ['login'],
        });
      }
    });
  }
});

module.exports = router;
