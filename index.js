require('dotenv').config()

const {Builder, By, Key, until} = require('selenium-webdriver');

IP = "191.253.103.90"
PON = "getpage.gch?pid=1002&nextpage=pon_status_link_info_t.gch"

async function example() {
    let driver = await new Builder().forBrowser('chrome').build();

    await driver.get(`http://${IP}/`)

    await driver.findElement(By.name('Username')).sendKeys(process.env.USER)
    await driver.findElement(By.name('Password')).sendKeys(process.env.PASS)

    await driver.findElement(By.id('LoginId')).click()

    await driver.get(`http://${IP}/`+PON)

    }
example()