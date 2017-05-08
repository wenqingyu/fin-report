const cron = require('node-cron')
const DefaultTasks = require('./tasks/DefaultTask.js')
const fintechDataSyncTask = require('./tasks/financeData.js')

/**
* field	value
* second	0-59
* minute	0-59
* hour	0-23
* day of month	1-31
* month	1-12 (or names)
* day of week	0-7 (or names, 0 or 7 are sunday)
*
*/

// daily every 10AM
var daily = '0 0 10 * * *'

// hourly
var hourly = '0 0 * * * *'

// minutely
var minutely = '0 * * * * *'

// HeartBeatRate: 5 seconds
var heartBeatRate = '* * */1 * * *'

console.log('Task Manager Start: ' + new Date().toISOString())

/** HeartBeat Task Demo */
cron.schedule(heartBeatRate, DefaultTasks.heartbeat)

/** Eth Profit Report */
cron.schedule('0 0 */2 * * *', ethProfitReport())

async function ethProfitReport () {
  var ethTicker = await fintechDataSyncTask.priceSync()
  var ethProfitReport = await fintechDataSyncTask.createETHReport(parseInt(ethTicker.last))
  fintechDataSyncTask.sendReport(ethProfitReport)
}

ethProfitReport()
