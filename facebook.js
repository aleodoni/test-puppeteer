const puppeteer = require('puppeteer')
const devices = require('puppeteer/DeviceDescriptors');
const iPhone = devices['iPhone 6'];

const BASE_URL = 'https://facebook.com'

const facebook = {
  browser: null,
  page: null,

  test: async() => {
    window.NavigationPreloadManager.appName;
  },

  initialize: async() => {
    facebook.browser = await puppeteer.launch({
      headless: false
    });

    facebook.page = await facebook.browser.newPage();

    await facebook.page.emulate(iPhone);
  },

  login: async (username, password) => {

    await facebook.page.goto(BASE_URL, { waitUntil: 'networkidle2'});

    await facebook.page.type('input[name="email"]', username, {delay: 100});
    await facebook.page.type('input[name="pass"]', password, {delay: 100});

    await facebook.page.keyboard.press('Enter');

    await facebook.page.waitForNavigation();

    await facebook.page.waitFor(2500);

    let agoraNaoButton = await facebook.page.$x('//span[contains(text(), "Agora não")]');
    await agoraNaoButton[0].click()
  },

  post: async(image, text) => {
    await facebook.page.waitForNavigation();

    const noQuePensando = await facebook.page.$x('//div[contains(text(), "No que você está pensando?")]');
    await noQuePensando[0].click()

    const selector = 'textarea[aria-label="No que você está pensando?"]'
    await facebook.page.waitForSelector(selector)
    await facebook.page.type(selector, text)

    const futureFileChooser = facebook.page.waitForFileChooser();
    const addFoto = await facebook.page.$x('//div[contains(text(), "Foto")]');
    await addFoto[2].click()
    const fileChooser = await futureFileChooser;
    await fileChooser.accept([image]);

    const publicarButton = await facebook.page.$x('//button[contains(text(), "Publicar")]');
    await publicarButton[1].click()

    debugger;
  }
}

module.exports = facebook