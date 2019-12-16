const puppeteer = require('puppeteer')
const devices = require('puppeteer/DeviceDescriptors');
const iPhone = devices['iPhone 6'];

const BASE_URL = 'https://instagram.com'

const instagram = {
  browser: null,
  page: null,

  test: async() => {
    window.NavigationPreloadManager.appName;
  },

  initialize: async() => {
    instagram.browser = await puppeteer.launch({
      headless: false
    });

    instagram.page = await instagram.browser.newPage();

    await instagram.page.emulate(iPhone);
  },

  login: async (username, password) => {

    await instagram.page.goto(BASE_URL, { waitUntil: 'networkidle2'});

    const loginButton = await instagram.page.$x('//button[contains(text(), "Entrar")]');

    await loginButton[0].click()

    // await instagram.page.waitForNavigation();

    await instagram.page.waitFor(2500);

    await instagram.page.type('input[name="username"]', username, {delay: 100});
    await instagram.page.type('input[name="password"]', password, {delay: 100});

    await instagram.page.keyboard.press('Enter');

    await instagram.page.waitForNavigation();

    await instagram.page.waitFor(2500);

    let agoraNaoButton = await instagram.page.$x('//button[contains(text(), "Agora não")]');
    await agoraNaoButton[0].click()

    await instagram.page.waitForNavigation();
    await instagram.page.waitFor(3500);

    const cancelarButton = await instagram.page.$x('//button[contains(text(), "Cancelar")]');
    await cancelarButton[0].click()

    const test = await instagram.page.evaluate(() => {
      window.scrollBy(0, document.body.scrollHeight);
    });

    await instagram.page.waitFor(3500);

    agoraNaoButton = await instagram.page.$x('//button[contains(text(), "Agora não")]');
    await agoraNaoButton[0].click()

    await instagram.page.waitFor(3500);

    // const adicionarSpan = await instagram.page.waitForSelector('span[aria-label="Nova publicação"]');
    // await adicionarSpan.click()

    // const input = await instagram.page.$('input[type="file"]')
    // await input.uploadFile('./foto.jpg')
    // await instagram.page.waitFor(2500);
    // instagram.page.on('dialog', dia => dia.dismiss())

    // await instagram.page.waitFor(2500);

    const futureFileChooser = instagram.page.waitForFileChooser();
    await instagram.page.click('span[aria-label="Nova publicação"]');
    const fileChooser = await futureFileChooser;
    await fileChooser.accept(['./foto.jpg']);

    await instagram.page.waitFor(2500);

    avancarButton = await instagram.page.$x('//button[contains(text(), "Avançar")]');
    await avancarButton[0].click()
    

    debugger;

  }
}

module.exports = instagram