const ig = require('./instagram');

(async () => {
  await ig.initialize();

  await ig.login('aleodoni', 'cupim2017');
})()