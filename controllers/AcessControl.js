const ZTE = require('./ZTE/index')
const viewZTE = require('./ZTE/view-index')

module.exports = 
{
    async defaultSetting(req, res) { 
        const {IP} = req.body
        console.log(IP)
        if(IP) {
            ZTE(IP).then(date => {
                return res.status(200).json({date})
            }).catch((erro => {
                return res.status(401).json({success: 'false', error: erro})
            }))
        }else{
            return res.status(401).json({success: 'false', ip: "null"})
        }
    },

    async viewSetting(req, res) { 
        const {IP} = req.body
        console.log(IP)
        if(IP) {
            viewZTE(IP).then(date => {
                return res.status(200).json({date})
            }).catch((erro => {
                return res.status(401).json({success: 'false', error: erro})
            }))
        }else{
            return res.status(401).json({success: 'false', ip: "null"})
        }
    }
}