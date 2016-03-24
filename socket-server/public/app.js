var canvasSize = {
  height: 800,
  width: 600
};

var metrAngle = {
  width: 25
};

window.Mindhorn = {
  attention : 0,
  meditation : 0,
  socket: undefined,
  stateChange: false,
};

var mindoRama = function(processing) {
  var attentionRectangle,
      meditationRectangle,
      attentionSphere,
      meditationSphere,
      sphereSize,
      sphereRadius,
      attentionSize;

  processing.setup = function() {
    // processing.fill();
    processing.size(canvasSize.width, canvasSize.height);
    // processing.frameRate(30);
  };

  processing.draw = function() {
    if(Mindhorn.stateChange){
      attentionSize = (Mindhorn.attention * 2) - .001;
      meditationSize = (Mindhorn.meditation * 2) - .001;
    }
    else{
      attentionSize = (Mindhorn.attention * 2);
      meditationSize = (Mindhorn.meditation * 2);
    }

    processing.background(255);

    processing.fill(104, 21, 186);

    attentionRectangle = 
      processing.rect(0, 0, metrAngle.width, Mindhorn.attention);

    attentionSphere = processing.ellipse(150, 350, attentionSize, attentionSize);

    //change color for next category
    processing.fill(194, 138, 250);

    //Draw meditation elements
    meditationRectangle
      processing.rect(30,0, metrAngle.width, Mindhorn.meditation);

    meditationSphere = processing.ellipse(300, 500, meditationSize, meditationSize);
  };
};

function playVideo(){
  var BV = new $.BigVideo();
  BV.init();
  BV.show('video/aisis.MP4',{ambient:true});
}


$(function() {
  var BV = new $.BigVideo();
  BV.init();
  BV.show('video/aisis.MP4',{ambient:true});
});


window.onload = function() {
  Mindhorn.socket = io();
  Mindhorn.socket.on('data', function(data){
    var parsedData = JSON.parse(data);
    if (!parsedData || !parsedData.type){
      return;
    }

    switch(parsedData.type) {
      case 'meditation':
        Mindhorn.meditation = parsedData.value;
       break;

      case 'attention':
        Mindhorn.attention = parsedData.value;
       break;

      default:
       break;
    } 
    Mindhorn.stateChange = true;
  });

  var magicCanvas = document.getElementById('magicCanvas');
  var magicDust = new Processing(magicCanvas, mindoRama);

  // playVideo();
};