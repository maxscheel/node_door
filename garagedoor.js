//check out https://www.npmjs.com/package/chip-gpio and https://www.npmjs.com/package/router

// import our modules 
var http         = require('http')
var Router       = require('router')
var finalhandler = require('finalhandler')
var Gpio = require('chip-gpio').Gpio;
var doorStatus = require('doorStatus')
var operateDoor = require('operateDoor')

// var bodyParser   = require('body-parser')

//store pin for toggling door - check if it needs to be pulled down (high) or pulled up (low) and declare here in case it 
// drops each time function is run
var pin = new Gpio(5, 'high')

//Set variables for strings
//State of door
String state;
//What are we doing with door?
String action;
 
// store our test messages to display (if needed)
//var open = "Open sesame"
//var close = "Bang crash!"
 
// initialize the router & server and add a final callback. 
var router = Router()
var server = http.createServer(function onRequest(req, res) {
  router(req, res, finalhandler(req, res))
})
 
 
// handle `GET` requests to `/status` (eg, if door open, closed or something else?)
router.get('/status', function (req, res) {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
//call function that reads GPIO status of pins to form either:
//  1. closed
//  2. Open
//  3. Unknown (opening, closing or something is broken)
//then print in following line
  doorStatus(error, state) {
    if (error) return console.error('Uhoh, there was an error retreiving door state for status update', error)
      // otherwise, continue on and use `state` in your code
    }
  res.end(state + '\n')
})

//handle `PUT` requests to `/action` (eg, toggle door state by manipulating pin state)
router.put('/action/:option', function (req, res) {
  //call function to assess status and store value
  doorStatus(error, state) {
    if (error) return console.error('Uhoh, there was an error retreiving door state for opening door', error)
        // otherwise, continue on and use `state` in your code
  }  
  if (option == "open") {
    if (state == open) {
      System.out.println("Door already open, not opening")
    }
    else if (state == closed) {
      operateDoor
      // set action variable to "closing" for open and vice versa
      action = "opening";
    }
    else {
      //Status must be unknown or somthing has fucked up
      action ="check_door";
    }
  }
  else if (option == "close") {
    if (state == closed) {
      System.out.println("Door already closed, not closing")
    }
    else if (state == open) {
      operateDoor
      // set action variable to "closing" for open and vice versa
      action = "closing";
    }
    else {
      //Status must be unknown or somthing has fucked up
      action ="check_door";
    }
  }
  res.statusCode = 200
  res.setHandler('Content-Type', 'text/plain; charset=utf-8')
  res.end(action + '\n')
  else {
    res.statusCode = 400
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    res.end('Invalid API Syntax\n')
  }
})

// make our http server listen to connections 
server.listen(8080)
