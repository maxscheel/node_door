//check out https://www.npmjs.com/package/chip-gpio and https://www.npmjs.com/package/router

// import our modules 
var http         = require('http')
var finalhandler = require('finalhandler')
var Gpio = require('chip-gpio').Gpio;
//var doorStatus = require('./doorStatus')
var operateDoor = require('./operateDoor')
var Router       = require('router')

//store pin for toggling door - check if it needs to be pulled down (high) or pulled up (low) and declare here in case it 
// drops each time function is run
var pin = new Gpio(5, 'high')
var open_reed = new Gpio(6, 'in');
var closed_reed = new Gpio(7, 'in');
var state;

//Set variables for strings
//State of door
var state;
//What are we doing with door?
var action;
var option;



//function for assessing door status
var getDoorStatus = function( callback ) {
  if (open_reed.read() == 1 && closed_reed.read() == 0) {
    state = "doorOpen";
  }
  else if (open_reed.read() == 0 && closed_reed.read() == 1) {
    state = "doorClosed";
  }
  else {
    state = "unknown";
  }
  callback( state );
};
 
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
  //doorStatus() returns variable of "state")
  doorStatus() 
  res.end(state + '\n')
})

//make another router with our options for open
var closing = Router()

//mount our new router to a route 
router.use('/action/close', closing)


//handle `GET` requests to `/action/close` (eg, toggle door state by manipulating pin state)
closing.get('/', function (req, res) {
  //call function to assess status and store value
//  doorStatus()
    if (getDoorStatus(state) == doorOpen) {
      //populate action varialbe for diags
      action = "closing"
    }
    else if (getDoorStatus(state) == doorClosed) {
      operateDoor()
      //populate action varialbe for diags
      action = "Door already closed, not closing"
    }
    else {
      //Status must be unknown or somthing has fucked up
      action ="check_door"
    }
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  res.end(action + '\n')
  doorStatus()
})

//make another router with our options for opening
var opening = Router()
 
//mount our new router to a route 
router.use('/action/open', opening)
  
 
//handle `GET` requests to `/action/close` (eg, toggle door state by manipulating pin state)
opening.get('/', function (req, res) {
  //call function to assess status and store value
  doorStatus()
    if (getDoorStatus(state) == doorClosed) {
      operateDoor()
      //populate action varialbe for diags
      action = "opening"
    }
    else if (getDoorStatus(state) == doorOpen) {
      //populate action varialbe for diags
      action = "Door already open, not opening"
    }
    else {
      //Status must be unknown or somthing has fucked up
      action ="check_door"
    }
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  res.end(action + '\n')
 })


// make our http server listen to connections 
server.listen(8080)
