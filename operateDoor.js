module.exports = operateDoor

//reset pin that actuates opener to high state after required time has elapsed
function resetOpener() {
  pin.write(1)
}

//pull pin down for 100 milliseconds to kick door
function operateDoor() {
  pin.write(0)
  setTimeout(resetOpener, 100)
}

