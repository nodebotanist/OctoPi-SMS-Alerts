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

    const STATE_MESSAGES = {
      'Disconnected': 'The printer has disconnected from the OctoPrint server!',
      'Error': 'OctoPrint server reporting printer error: ' + msg.payload.error,
      'PrintStarted': 'OctoPrint reporting a print has started: ' + msg.payload.name,
      'PrintFailed': 'OctoPrint reporting a failed print: ' + msg.payload.name,
      'PrintDone': message = 'OctoPrint reporting a completed print: ' + msg.payload.name,
      'PrintCancelled': 'OctoPrint reporting a cancelled print: ' + msg.payload.name,
      'PrintPaused': 'OctoPrint reporting print paused: ' + msg.payload.name, 
      'PrintResumed':  'OctoPrint reporting print resumed: ' + msg.payload.name  
    }

    let message = STATE_MESSAGES[msg.event.type] || ('Octoprint event: ' + msg.event.type)

    twilioClient.messages.create({
      body: message,
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
