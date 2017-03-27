var five = require("johnny-five");
var board = new five.Board({port: 'COM3'});

var upnp = require("peer-upnp");
var http = require("http");
var server = http.createServer();
var PORT = 8080;

var fs = require("fs");
var vm = require("vm");

vm.runInThisContext(fs.readFileSync(__dirname + "/service.js"));
vm.runInThisContext(fs.readFileSync(__dirname + "/motion_device.js"));


// start server on port 8080. please do this step before you create a peer
server.listen(PORT);


// Create a UPnP Peer.
// Create a BinaryLight device as specified in UPnP http://upnp.org/specs/ha/UPnP-ha-BinaryLight-v1-Device.pdf.
// Please refer for device configuration parameters to the UPnP device architecture.
var device = createServerPlusDevice(upnp, server, device);


// create a SwitchPower service in the BinaryLight device as specified here http://upnp.org/specs/ha/UPnP-ha-SwitchPower-v1-Service.pdf
var service = createService(device);



// When the board is ready
board.on("ready", function() {

  var led = new five.Led(13);

 // This will grant access to the led instance
 // from within the REPL that's created when
 // running this program.
 this.repl.inject({
   led: led
 });

  //creates motion hardware instance
  var motion = new five.Motion({
    pin: 7,
    freq: 25
  });



  // "calibrated" occurs once, at the beginning of a session,
  motion.on("calibrated", function() {
    console.log("calibrated", Date.now());
  });

  // "motionstart" events are fired when the "calibrated"
  // proximal area is disrupted, generally by some form of movement
  motion.on("motionstart", function() {
    console.log("motionstart", Date.now());
    service.set("Status",100);
    service.notify();
    led.blink();
  });

  // "motionend" events are fired following a "motionstart" event
  // when no movement has occurred in X ms
  motion.on("motionend", function() {
    console.log("motionend", Date.now());
    service.set("Status",0);
    service.notify();
    led.stop();
  });
});
