const ig = require('./instagram');

(async () => {
  await ig.initialize();

  await ig.login('', '');

  await ig.post('./foto.jpg', 'ZACA')
})()