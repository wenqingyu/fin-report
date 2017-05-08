var mailer = require('nodemailer-promise')

module.exports = {

  investorList: [
      {client: 'master', eth: 14.04, costPrice: 500},
      {client: 'David', eth: 5.84, costPrice: 684}
  ],

  sendEmail: mailer.config({

    email: 'wenqing@airplake.com',
    password: '',
    server: 'smtp.mxhichina.com'
  })

}
