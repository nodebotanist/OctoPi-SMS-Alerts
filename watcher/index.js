const dotenv = require('dotenv').config()
const WebSocketClient = require('sockjs-client-ws')
const request = require('superagent')
const twilio = require('twilio')

const API_KEY = process.env.OCTOPI_API_KEY
const TWILIO_FUNC_URL = process.env.TWILIO_FUNC_URL

var client = WebSocketClient.create('http://octopi.local/sockjs')
let connection

let twilioClient = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
 
client.on('connection', function () {
  console.log('connected!')
})
client.on('data', function (msg) {
  if ("current" in msg) {
    // console.log('current: ', msg)
  } else if ( "event" in msg ) {
    console.log('event: ', msg)

    twilioClient.messages.create({
      body: 'Octoprint 3d printer event: ' + msg.event.type,
      to: process.env.YOUR_PHONE_NUMBER,
      from: process.env.TWILIO_PHONE_NUMBER
    })
    .then((message) => console.log(message.sid))
    // TODO: get Twilio functions working with this!
    // request
    // .get(TWILIO_FUNC_URL + 'octoprint?type=' + msg.event.type)
    // .then((res) => {
    //   console.log(res)
    // })
    // .catch((err) => {
    //   console.log(err)
    // })
  }
})
client.on('error', function (e) {
  console.log(e)
})
