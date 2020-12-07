const User = require('./user');
const db = require('./db');

db.connect();

function run() {
  const petya = new User('Petya');
  const vasya = new User('Vasia');

  petya.hello(vasya);

  log(db.getPhrase('Run successful'))(module);
}

if (module.parent) {
  exports.run = run;
  // this.run = run
  // mosule.exports.run = run;
} else {
  run();
}
