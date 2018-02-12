const dotenv = require('dotenv').config()
const WebSocketClient = require('sockjs-client-ws')
const request = require('superagent')

const API_KEY = process.env.OCTOPI_API_KEY
const TWILIO_FUNC_URL = process.env.TWILIO_FUNC_TEST_URL

var client = WebSocketClient.create('http://octopi.local/sockjs')
let connection
 
client.on('connection', function () {
  console.log('connected!')
})
client.on('data', function (msg) {
  console.log(msg)
})
client.on('error', function (e) {
  console.log(e)
})
