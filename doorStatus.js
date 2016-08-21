//module.exports = doorStatus
var Gpio = require('chip-gpio').Gpio;
var open = new Gpio(6, 'in');
var closed = new Gpio(7, 'in');

function doorStatus() {
  process.stdout.write(open.read())
//  console.log(open.read())
//  console.log(closed.read())

//  var open_state = open.read();
//  var closed_state = closed.read();
//  if (open_state == 1 && closed_state == 0) {
//    state = "doorOpen";
//  }
//  else if (open_state == 0 && closed_state == 1) {
//    state = "doorClosed";
//  }
//  else {
//    state = "unknown";
//  }
//console.log(state);
}
