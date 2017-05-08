var request = require('request')
var config = require('./../config.js')

module.exports = {

  httpGet: async (uri, requestData) => {
    return new Promise((resolve, reject) => {
      request({
        url: uri,
        method: 'GET',
        json: true,
        headers: {
          'content-type': 'application/json'
        },

        body: requestData
      }, (error, response, body) => {
        if (error) {
          console.log(error)
          return reject(error)
        } else {
          console.log(requestData)
          resolve(body)
        }
      })
    })
  },

  sendEmail: async (toList, subject, content) => {
    let mailOptions = {
      senderName: '"Fin Report" <wenqing@airplake.com>', // sender address
      receiver: toList.join(', '), // list of receivers
      subject: subject, // Subject line
    //   text: content, // plain text body
      html: content // html body
    }
    console.log('Atempt to send to', mailOptions.receiver)
    config.sendEmail(mailOptions)
    .then(function (info) { console.log(info) })   // if successful
    .catch(function (err) { console.log('got error'); console.log(err) })
  }
}
