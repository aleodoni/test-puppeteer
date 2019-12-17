const ig = require('./instagram');
const fb = require('./facebook');

(async () => {
  // await ig.initialize();

  // await ig.login('', '');

  // await ig.post('./foto.jpg', 'ZACA')

  await fb.initialize();

  await fb.login('', '')

  await fb.post('./foto.jpg', 'ZACA')
})()