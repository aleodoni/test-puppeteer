const ig = require('./instagram');
const fb = require('./facebook');
const tw = require('./twitter');

(async () => {
  // await ig.initialize();

  // await ig.login('', '');

  // await ig.post('./foto.jpg', 'ZACA')

  // await fb.initialize();

  // await fb.login('', '')

  // await fb.post('./foto.jpg', 'ZACA')

  await tw.initialize();

  await tw.login('', '')

  await tw.post('./foto.jpg', 'ZACA')
})()