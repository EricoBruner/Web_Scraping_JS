require('dotenv').config()
const {Builder, By, Key, until} = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')

PON = "getpage.gch?pid=1002&nextpage=pon_status_link_info_t.gch"
WLAN = "getpage.gch?pid=1002&nextpage=net_wlanm_conf1_t.gch"
LAN = "getpage.gch?pid=1002&nextpage=net_dhcp_dynamic_t.gch"

async function viewZTE(IP) 
{
    options = new chrome.Options()
    options.headless(true)
    let driver = await new Builder().forBrowser("chrome").setChromeOptions(options).build();
    //driver.manage().window().maximize();

    await driver.get(`http://${IP}/`)
    await driver.findElement(By.name('Username')).sendKeys(process.env.USER)
    await driver.findElement(By.name('Password')).sendKeys(process.env.PASS)
    await driver.findElement(By.id('LoginId')).click()

    await driver.get(`http://${IP}/`+PON)
    const ponStatus = await driver.findElement(By.id("Fnt_RxPower")).getText()

    await driver.get(`http://${IP}/`+WLAN)
    const canalStatus = await driver.executeScript('return document.getElementById("Frm_Channel").selectedIndex')
    const bandStatus = await driver.executeScript('return document.getElementById("Frm_BandWidth").value')

    await driver.get(`http://${IP}/`+LAN) 
    const dns1 = await driver.executeScript('return document.getElementById("Frm_DNSServer1").value')
    const dns2 = await driver.executeScript('return document.getElementById("Frm_DNSServer2").value')
    const dns3 = await driver.executeScript('return document.getElementById("Frm_DNSServer3").value')

    console.log(dns1, dns2, dns3)
    var jsonReport = {
        "ip":`${IP}`, 
        "equipament": "ZTE F660",
        "pon": `${ponStatus} dbm`, 
        "rede2": `Channel ${canalStatus}`, 
        "rede2band": `Band ${bandStatus}`, 
        "rede5": "null", 
        "dns1": dns1, 
        "dns2": dns2, 
        "dns3": dns3,
    }

    return jsonReport
}

module.exports = viewZTE