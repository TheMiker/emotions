let canvas;
let video;
let classifier;
let flippedVideo;
let positions = [[30,30],[30,130],[30,230],[130,30],[230,30],[330,30],[330,130],[330,230],[330,330],[230,330]];

let label = "...waiting";
let dict;

function preload(){
  //add a link to your own data set here
  classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/t1EWtBa0/model.json');
}
// : "happy", confidence: 0.5386738181114197}
// 1: {label: "anger", confidence: 0.292984277009964}
// 2: {label: "sad", confidence: 0.1072700172662735}
// 3: {label: "surprise", confidence: 0.03849000483751297}
// 4: {label: "disgust", confidence: 0.011696209199726582}
// 5: {label: "fear"

function createPaths(){
  var emotions = ['happy','anger','sad','surprise','disgust','fear'];
  var dict = {};
  for(let j = 0; j < emotions.length; j++){
    var gifs = [];
    for(let i = 1; i < 12; i++){
      scene = createDiv('<img id="gif" src=emotions/'+emotions[j]+'/giphy-'+i.toString()+'.gif alt="this slowpoke moves" width=150px height=auto/>');
      scene.hide();
      scene.style("position", "absolute");
      gifs.push(scene);
    }
    dict[emotions[j]] = gifs;
  }
  return dict;
}


function setup() {
 canvas = createCanvas(windowWidth, windowHeight);
 canvas.style("position", "absolute")
 let constraints = {
    video: {
      mandatory: {
        minWidth: windowWidth/4,
        minHeight: windowHeight/4,
      },
      optional: [{ maxFrameRate: 60 }]
    },
    audio: false
  };
  video = createCapture(constraints);
  video.hide();
  video.style('margin','"0px auto"');
  video.size(640, 480);
 // ang_1 = loadImage('emotions/anger/giphy-1.gif');
 // image(ang_1, 100,100);


  flippedVideo = ml5.flipImage(video);
  flippedVideo.center()
  classifyVideo();
  dict = createPaths();
}

function classifyVideo(){
  flippedVideo = ml5.flipImage(video);
  classifier.classify(flippedVideo, gotResults);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function gotResults(error, results){
  if(error){
    console.log(error);
    return
  }
  console.log(results);
  for(let i = 0; i < results.length; i++){
    label = results[i].label;
    numOfGifs = Math.round(results[i].confidence * 10);
    gifs = dict[label];
    for(let i = 0; i < numOfGifs; i++){
      gif = gifs[i];
      gif.position(getRandomInt(windowWidth-150), getRandomInt(windowHeight-150));
      gif.show();

    }
  }

  confidence
  classifyVideo();
}

function draw() {
  background(0);
  img = image(video, windowWidth/4, windowHeight/4);
  classifyVideo();
}
