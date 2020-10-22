const {Builder, By, Key, until} = require('selenium-webdriver');

async function example() {
    let driver = await new Builder().forBrowser('firefox').build();
    await driver.get('http://191.253.103.90/');
    await driver.findElement(By.name('Username')).sendKeys('admin', Key.RETURN)
    await driver.findElement(By.name('Password')).sendKeys('glock9mm', Key.RETURN)
    await driver.findElement(By.className('menuPlusSymbol')).click()
    }
example()