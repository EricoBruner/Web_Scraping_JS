require('dotenv').config()

const {Builder, By, Key, until} = require('selenium-webdriver');
const wifiConfig = require('./ZTE/wifiConfig/wifiConfig');

IP = process.env.IP
PON = "getpage.gch?pid=1002&nextpage=pon_status_link_info_t.gch"
WLAN = "getpage.gch?pid=1002&nextpage=net_wlanm_conf1_t.gch"

async function example() {
    let driver = await new Builder(headless = false).forBrowser(process.env.BROWSER).build();
    driver.manage().window().maximize();

    await driver.get(`http://${IP}/`)

    await driver.findElement(By.name('Username')).sendKeys(process.env.USER)
    await driver.findElement(By.name('Password')).sendKeys(process.env.PASS)

    await driver.findElement(By.id('LoginId')).click()

    //====== PON ==============================================================

    await driver.get(`http://${IP}/`+PON)
    pon_status = await driver.findElement(By.id("Fnt_RxPower")).getText()

    if (pon_status > -28) {
        console.log("=========================")
        console.log("Sinal dentro do PDQ "+pon_status)
        console.log("=========================")
    }else{
        console.log("=========================")
        console.log("Sinal fora do PDQ "+pon_status)
        console.log("=========================")
    }

     //====== WLAN ==============================================================

    await driver.get(`http://${IP}/`+WLAN)

    const canalstatus = await driver.executeScript('return document.getElementById("Frm_Channel").selectedIndex')
    
    console.log("canal atual: "+canalstatus)

    await driver.executeScript('document.getElementById("Frm_Channel").selectedIndex = 1')

    await driver.findElement(By.id('Btn_Submit')).click()

    const canalstatus = await driver.executeScript('return document.getElementById("Frm_Channel").selectedIndex')
    
    console.log("canal alterado para: "+canalstatus)

}

example()