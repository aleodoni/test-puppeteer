const puppeteer = require('puppeteer')
const devices = require('puppeteer/DeviceDescriptors');
const iPhone = devices['iPhone 6'];

const BASE_URL = 'https://twitter.com'

const twitter = {
  browser: null,
  page: null,

  test: async() => {
    window.NavigationPreloadManager.appName;
  },

  initialize: async() => {
    twitter.browser = await puppeteer.launch({
      headless: false
    });

    twitter.page = await twitter.browser.newPage();

    await twitter.page.emulate(iPhone);
  },

  login: async (username, password) => {

    await twitter.page.goto(BASE_URL, { waitUntil: 'networkidle2'});

    const loginButton = await twitter.page.$x('//span[contains(text(), "Entrar")]');
    await loginButton[0].click()

    await twitter.page.waitFor(3500);

    await twitter.page.type('input[name="session[username_or_email]"]', username, {delay: 100});
    await twitter.page.type('input[name="session[password]"]', password, {delay: 100});

    await twitter.page.keyboard.press('Enter');

    await twitter.page.waitForNavigation();
  },

  post: async(image, text) => {

    await twitter.page.waitFor(3500);

    await twitter.page.click('a[href="/compose/tweet"]');

    const selector = 'textarea[aria-label="Texto do Tweet"]'
    await twitter.page.waitForSelector(selector)
    await twitter.page.type(selector, text)

    const futureFileChooser = twitter.page.waitForFileChooser();
    const addFoto = await 'div[aria-label="Adicionar fotos ou vídeo"]';
    await twitter.page.waitForSelector(addFoto)
    await twitter.page.click(addFoto)
    const fileChooser = await futureFileChooser;
    await fileChooser.accept([image]);

    const tweetarButton = await twitter.page.$x('//span[contains(text(), "Tweetar")]');
    await tweetarButton[0].click()


    debugger;
  }
}

module.exports = twitter