// not sure about the "submit" bit
module.exports = doorStatus

function doorStatus() {
  var open = new Gpio(6, 'in'); 
  var closed = new Gpio(7, 'in');
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
