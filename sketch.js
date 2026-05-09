const modelURL = "https://teachablemachine.withgoogle.com/models/kXXJNIw0S/"
; // add URL of the trained model 
let myImageModel;


let serial;// variable to hA instance of the serialport library
let portName = '';//  add the name of your serial port 

let outByte = 0;// for outgoing data

let video;
let resultDiv;


function preload() {
  video = createCapture(VIDEO);
  myImageModel = ml5.imageClassifier(modelURL+ 'model.json');
}

function setup() {
  resultDiv = createElement('h1',  '...');
  serial = new p5.SerialPort();    // make a new instance of the serialport library
  serial.on('error', serialError); // callback for errors
  serial.open(portName);           // open a serial port
  myImageModel.classify(video, gotResults);
}

function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}

function gotResults(err, results) {
  if (err) 
    console.log(err);
  
  if (results) 
  {
    // print the results on the console for debugging
    console.log(results);
    
    // wait for some time before classifying again
    setTimeout(() => myImageModel.classify(video, gotResults), 5000);
    
    // not accepting a prediction with confidence less than 0.9
    if (results[0].confidence < 0.9) 
      return;
      
    //display the result   
    resultDiv.html('Result is: ' + results[0].label);
    
    // print the label on the console for debugging
    console.log(results[0].label);
    
    // set the outByte variable to an appropriate value
    
    // print the outByte value on the console for debugging
    
    // send it out the serial port:
    
    
    
  }
}