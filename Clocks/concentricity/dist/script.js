var c = Snap("#clock"),
  i;

var c1 = c.circle(256, 256, 255).addClass("f1");
var c2 = c.circle(256, 192, 192).addClass("f2");
var c3 = c.circle(256, 128, 129).addClass("f1");
var c4 = c.circle(256, 64, 66).addClass("f2");

var fontOff = 16;
var fontAttr = { textAnchor: "middle", fontSize: 48 };

var hourCoord = { x: 256, y: 512 - 256 - 64 + fontOff };
var hourDisplay = c
  .text(hourCoord.x, hourCoord.y, "06")
  .addClass("f2")
  .attr(fontAttr);
var hour = c.g(c3, c4, hourDisplay);
hourCoord.txt = "," + hourCoord.x + "," + hourCoord.y - fontOff;
hourDisplay.transform("r" + 90 + hourCoord.txt);

var minuteCoord = { x: 256, y: 512 - 128 - 64 + fontOff };
var minuteDisplay = c
  .text(minuteCoord.x, minuteCoord.y, "23")
  .addClass("f1")
  .attr(fontAttr);
var minute = c.g(c2, hour, minuteDisplay);
minuteCoord.txt = "," + minuteCoord.x + "," + minuteCoord.y - fontOff;
minuteDisplay.transform("r" + 90 + minuteCoord.txt);

var secondCoord = { x: 256, y: 512 - 64 + fontOff };
var secondDisplay = c
  .text(secondCoord.x, secondCoord.y, "48")
  .addClass("f2")
  .attr(fontAttr);
var second = c.g(c1, minute, secondDisplay);
secondCoord.txt = "," + secondCoord.x + "," + secondCoord.y - fontOff;
secondDisplay.transform("r" + 90 + secondCoord.txt);

// Drawing
var delta,
  lastSecond,
  last = new Date();
function draw() {
  var now = new Date();
  delta = (now.getTime() - last.getTime()) / 1000;
  last = now;

  // Get Times
  var h = now.getHours();
  var m = now.getMinutes();
  var s = now.getSeconds();
  var ms = now.getMilliseconds();

  // Progress
  var prog = { ms: ms / 1000 },
    p,
    target;
  prog.s = (s + prog.ms) / 60;
  prog.m = (m + prog.s) / 60;
  prog.h = (h + prog.m) / 12;

  var sa = prog.s * 360;
  var ma = prog.m * 360;
  var ha = prog.h * 360 - ma;
  ma = ma - sa;

  second.transform("r" + sa + ",256,256");
  minute.transform("r" + ma + ",256,192");
  hour.transform("r" + ha + ",256,128");

  window.requestAnimationFrame(draw);

  function updateTimes(s, m, h) {
    function pad(num) {
      var str = num.toString();
      return str.length > 1 ? str : "0" + str;
    }

    secondDisplay.node.innerHTML = pad(s);
    minuteDisplay.node.innerHTML = pad(m);
    hourDisplay.node.innerHTML = pad(h);

    secondDisplay.transform("r" + (s < 30 ? -90 : 90) + secondCoord.txt);
    minuteDisplay.transform("r" + (m < 30 ? -90 : 90) + minuteCoord.txt);
    hourDisplay.transform("r" + (h % 12 < 6 ? -90 : 90) + hourCoord.txt);
  }

  if (s !== lastSecond) {
    updateTimes(s, m, h);
  }
  lastSecond = s;
}

draw();