let mic;
let input;
let fft;

function preload() {

  // Create an Audio input


  var context = new AudioContext();
  // context.createGain();

  input = new p5.AudioIn();
  input.start();
  input.amp(0.5);
  soundFormats('mp3', 'ogg');
  mySound1 = loadSound('sh11.mp3');
  mySound2 = loadSound('sh12.mp3');
  mySound3 = loadSound('sh13.mp3');
  mySound4 = loadSound('sh14.mp3');

  // fullscreen();

}

function setup() {
  
  createCanvas(windowWidth, windowHeight);
  noStroke();
  
  mic = new p5.AudioIn();
  mic.start();

  fft = new p5.FFT();
  amplitude = new p5.Amplitude();
  fft.setInput(mic);
  mySound1.setVolume(0.3);
  mySound2.setVolume(0.3);
  mySound3.setVolume(0.3);
  mySound4.setVolume(0.3);

  xgnr = 0;



}

function draw() {
  
  resizeCanvas(windowWidth, windowHeight);
  background(0);

  // micLevel = mic.getLevel();

  // console.log("mic level: " + micLevel)
  // analyze = fft.analyze();

  fft.analyze()
  let gnr = fft.getEnergy(2500, 8500);
  // console.log("energy: " + gnr);
  xgnr = (gnr * 1.47 + xgnr) * 0.974;

  let tresh1 = 1900;
  let tresh2 = 3300;
  let tresh3 = 3700;
  let tresh4 = 4000;

  console.log(xgnr);

  if (xgnr > tresh1) {
    mySound1.playMode('untilDone');
    mySound1.play();

  }

  if (xgnr > tresh2) {
    mySound2.playMode('untilDone');
    mySound2.play();

  } // xgnr = 0;

  if (xgnr > tresh3) {
    mySound3.playMode('untilDone');
    mySound3.play();

    // xgnr = 0;
  }
  if (xgnr > tresh4) {
    mySound4.playMode('untilDone');
    mySound4.play();

    xgnr = 0;

  }


  let c = map(xgnr, 0, 2000, -250, 100);
  let d = map(xgnr, 0, 1000, 0, 250);
  let e = map(xgnr, 0, 1000, 11, 100);


  fill(250, 250, 250, c);
  ellipse(width / 2, height / 2, d / 3, d / 3);

  fill(255, 40, 0);
  ellipse(width / 2, height / 2, d / 10, d / 10);

  fill(255, 0, 0, c / 2);
  ellipse(width / 2, height / 2, d * 1.1, d * 1.1);

}