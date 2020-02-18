var capture;
var tracker;

let tiger;

function preload(){
  tiger = loadImage("tiger.png");

}

var w = 640,
    h = 480;

function setup() {
    capture = createCapture({
        audio: false,
        video: {
            width: w,
            height: h
        }
    }, function() {
        console.log('capture ready.')
    });
    capture.elt.setAttribute('playsinline', '');
    createCanvas(w, h);
    capture.size(w, h);
    capture.hide();
    colorMode(HSB);

    tracker = new clm.tracker();
    tracker.init();
    tracker.start(capture.elt);


}

function draw() {
    imageMode(CORNERS);
    image(capture, 0, 0, w, h);
    var positions = tracker.getCurrentPosition();
    imageMode(CENTER);
    noFill();
    stroke(255);
    beginShape();
    for (var i = 0; i < positions.length; i++) {
        vertex(positions[i][0], positions[i][1]);
    }
    endShape();

    noStroke();
    for (var i = 0; i < positions.length; i++) {
        // fill(255,0,0);
        // image(tiger, positions[62][0], positions[62][1],330, 330);
        // noFill();
        // ellipse(positions[i][0], positions[i][1], 30, 30);
        // text(i, positions[i][0], positions[i][1]);
    }


    if (positions.length > 0) {
        var mouthLeft = createVector(positions[44][0], positions[44][1]);
        var mouthRight = createVector(positions[50][0], positions[50][1]);
        var smile = mouthLeft.dist(mouthRight);
        // uncomment the line below to show an estimate of amount "smiling"
        rect(20, 20, smile * 3, 20);

        // uncomment for a surprise
        // noStroke();
        // fill(0, 255, 255);
        // ellipse(positions[62][0], positions[62][1], 50, 50);
    }
}
