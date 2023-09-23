let mic;
let fft;
let mySound1, mySound2, mySound3, mySound4;
let xgnr;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

// Create an image element as a button
  let micButton = createImg('mic_icon.png', 'Start microphone');
  
  // Set the anchor point to the center
  micButton.style('transform-origin', 'center' , 'background', 'transparent');
  micButton.size(200, 200);
  // Attach the startMic function to the image click event
  micButton.mousePressed(startMic);

  // Position the button initially
  // positionButton();
  
  micButton.position(windowWidth / 2 - micButton.width / 2, windowHeight / 2 - micButton.height / 2);  // Position the button in center
  micButton.mousePressed(startMic);
}

}

async function startMic() {
  // Initialize the audio in the startMic function
  soundFormats('mp3', 'ogg');
  mySound1 = loadSound('sh11.mp3');
  mySound2 = loadSound('sh12.mp3');
  mySound3 = loadSound('sh13.mp3');
  mySound4 = loadSound('sh14.mp3');

  // Create the AudioContext after the user clicks the button
  await userStartAudio();

  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
  mySound1.setVolume(0.3);
  mySound2.setVolume(0.3);
  mySound3.setVolume(0.3);
  mySound4.setVolume(0.3);
  xgnr = 0;

  // Resume the AudioContext
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }

  this.elt.style.transition = "opacity 1s";  // Add a CSS transition to the button
  this.elt.style.opacity = 0;  // Set the button's opacity to 0 to fade it out
  setTimeout(() => this.remove(), 1000);  // Remove the button after 1 second
}

function draw() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);

  if (fft) {
    fft.analyze();
    let gnr = fft.getEnergy(2500, 8500);
    xgnr = (gnr * 1.47 + xgnr) * 0.974;

    let tresh1 = 1900;
    let tresh2 = 3300;
    let tresh3 = 3700;
    let tresh4 = 4000;

    if (xgnr > tresh1) {
      mySound1.playMode('untilDone');
      mySound1.play();
    }

    if (xgnr > tresh2) {
      mySound2.playMode('untilDone');
      mySound2.play();
    }

    if (xgnr > tresh3) {
      mySound3.playMode('untilDone');
      mySound3.play();
    }

    if (xgnr > tresh4) {
      mySound4.playMode('untilDone');
      mySound4.play();
      xgnr = 0;
    }

    let c = map(xgnr, 0, 2000, -250, 100);
    let d = map(xgnr, 0, 1000, 0, 250);

    fill(250, 250, 250, c);
    ellipse(width / 2, height / 2, d / 3, d / 3);

    fill(255, 40, 0);
    ellipse(width / 2, height / 2, d / 10, d / 10);

    fill(255, 0, 0, c / 2);
    ellipse(width / 2, height / 2, d * 1.1, d * 1.1);
  }
}
