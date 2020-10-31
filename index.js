require('dotenv').config()

function verif_canal(canal) {
    if(canal == 1){
        const newcanal = 6
        return newcanal
    }
    if(canal == 6){
        const newcanal = 11
        return newcanal
    }
    if(canal == 11){
        const newcanal = 1
        return newcanal
    }
    if(canal != 1 & canal != 6 & canal != 11){
        const newcanal = 1
        return newcanal
    }
}

const {Builder, By, Key, until} = require('selenium-webdriver');
//const wifiConfig = require('./ZTE/wifiConfig/wifiConfig');

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

    newcanal = verif_canal(canalstatus)

    const set_canal = `document.getElementById("Frm_Channel").selectedIndex = ${newcanal}`

    await driver.executeScript(set_canal)

    await driver.findElement(By.id('Btn_Submit')).click()

    const canalstatusnew = await driver.executeScript('return document.getElementById("Frm_Channel").selectedIndex')
    
    console.log("canal alterado para: "+canalstatusnew)

}

example()