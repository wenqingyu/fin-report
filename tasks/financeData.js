var Datastore = require('nedb')
// var swig = require('swig')
// var writefile = require('write-file')
const tableify = require('html-tableify')
var ethDB = new Datastore({ filename: './data/ethPrice.db', autoload: true })
var config = require('./../config.js')

var util = require('./../lib/util.js')

module.exports = {

    // Sync Ethereum market price
  priceSync: async () => {
    console.log('start fetch eth price (云币) - - -')
    var url = 'https://yunbi.com//api/v2/tickers.json'
    var result = await util.httpGet(url, {market: 'ethcny'})
    // console.log(result)
    var ethTicker = result.ethcny.ticker
    ethTicker.time = new Date().toISOString()
    console.log('eth: ', ethTicker)
    await ethDB.insert(ethTicker)
    return ethTicker
  },

  createETHReport: async (ethPrice) => {
    console.log(ethPrice)

    var investors = config.investorList

    var profitReport = []

    for (var i = 0; i < investors.length; i++) {
      let investor = investors[i]
      let investCost = investor.costPrice * investor.eth
      let assetsValue = (investor.eth * ethPrice).toFixed(2)
      let netProfit = (assetsValue - investor.eth * investor.costPrice).toFixed(2)
      let profitRate = (netProfit / investCost * 100).toFixed(2)
      profitReport.push({
        'Client': investor.client,
        'Assets': investor.eth + ' ETH',
        'CostPrice': investor.costPrice + ' CNY/ETH',
        'Invest Cost': investCost + ' CNY',
        'CurrentValue': assetsValue + ' CNY',
        'NetProfit': netProfit + ' CNY',
        'profitRate': profitRate + ' %'
      })
    }
    profitReport = '<h2>' + ethPrice + ' CNY/ETH | Profit Statement - ' + new Date().toISOString() + tableify(profitReport)
    return profitReport
  },

  sendReport: async (report) => {
    var result = await util.sendEmail(['wenqing@ye-dian.com'], '[Investment] ETH Investment Profit Report', report)
    return result
  }
}
