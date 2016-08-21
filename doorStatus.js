module.exports = doorStatus
//variables set in garageDoor.js

//var Gpio = require('chip-gpio').Gpio;
//var open = new Gpio(6, 'in');
//var closed = new Gpio(7, 'in');
//var state;

function doorStatus() {
  if (open.read() == 1 && closed.read() == 0) {
    state = "doorOpen";
  }
  else if (open.read() == 0 && closed.read() == 1) {
    state = "doorClosed";
  }
  else {
    state = "unknown";
  }
}
