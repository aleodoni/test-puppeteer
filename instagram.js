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
  },

  post: async(image, text) => {
    const futureFileChooser = instagram.page.waitForFileChooser();
    await instagram.page.click('span[aria-label="Nova publicação"]');
    const fileChooser = await futureFileChooser;
    await fileChooser.accept([image]);

    await instagram.page.waitFor(2500);

    avancarButton = await instagram.page.$x('//button[contains(text(), "Avançar")]');
    await avancarButton[0].click()

    const selector = 'textarea[aria-label="Escreva uma legenda..."]'
    await instagram.page.waitForSelector(selector)
    await instagram.page.type(selector, text)

    const compartilharButton = await instagram.page.$x('//button[contains(text(), "Compartilhar")]');
    // await compartilharButton[0].click()

    debugger;
  }
}

module.exports = instagram