<template>
  <!-- Name of exercise and timer -->
  <div class="row mt-2 p-3 fw-bold fs-3">
    <div class="col-6">{{ $route.params.exerciseName }}</div>
    <div class="col-6 text-end"> {{ timerOutput }}</div>
  </div>

  <!-- Video -->
  <div class="ms-3 me-3 video-box text-center">
    <video v-show="false" id="video" class="rounded shadow" autoplay playsinline></video>
    <canvas v-show="true" id="output" class="rounded shadow"></canvas>
  </div>
  <!-- Rep counter -->
  <div class="text-center mt-3">
    <span class="counter fw-bold">{{ counter }}</span>
  </div>
  <!-- Form -->
  <div class="mt-2">
    <span class="fw-bold fs-3 ms-3">{{ status }}</span>
  </div>
</template>

<script>

export default {
  name: 'PerformExercise',
  data() {
    return {
      counter: 4,
      status: 'Form: ok!',
      timer: 0,
      timerOutput: '00:00'
    }
  },
  mounted() {
    console.log('mounted');
    setupVideo();
    document.getElementById('video').onloadedmetadata= () => {
      startDetector().then(() => startCanvas());
    };
    
    // this.startTimer();

  },
  beforeUnmount() {
    stopVideo();
  },

  methods: {

    startTimer: function () {
      setInterval(() => {
        this.timer++;
        let timer = this.timer;
        if (timer < 60) {
          if (timer < 10)
            timer = '0' + timer;
          this.timerOutput = '00:' + timer;
        } else {
          let minutes = Math.floor(timer / 60);
          let seconds = timer % 60;
          if (minutes < 10)
            minutes = '0' + minutes;
          if (seconds < 10)
            seconds = '0' + seconds;
          this.timerOutput = minutes + ':' + seconds;
        }
      }, 1000);
    },
    doSomething: function () {
      console.log('doSomething');
    }

  },


}

let pose = null;
let detector = null;
let repCounter = 0;
let flip = true;


async function setupVideo() {
  const video = document.getElementById('video');
  const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: true
  }).then(function (stream) {
      video.srcObject = stream;
  });

  console.log('Video setup!');
}

function stopVideo() {
  const video = document.getElementById('video');
  video.srcObject.getTracks().forEach(track => track.stop());
  console.log('Video stopped');
}

async function startDetector() {
  console.log("starting detector");
  detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, { minPoseScore: 0.5 });
}

async function getPose() {
  pose = await detector.estimatePoses(video);
}

async function startCanvas() {
  console.log("starting canvas");

  const video = document.getElementById('video');
  const canvas = document.getElementById('output');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'red';


  function refresh() {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    getPose().then(() => {

      drawLandmarks();
      connectTheDots();
      printDeadlift();

    }).catch((err) => {
      console.log(err);
      // console.log("Cannot detect landmarks!");
    });
    requestAnimationFrame(refresh);
  }
  requestAnimationFrame(refresh);


  function printStanceDeadlift() {
    // legs        
    let x1 = pose[0]["keypoints"][14].x;
    let y1 = pose[0]["keypoints"][14].y;
    let x2 = pose[0]["keypoints"][12].x;
    let y2 = pose[0]["keypoints"][12].y;
    let x3 = pose[0]["keypoints"][11].x;
    let y3 = pose[0]["keypoints"][11].y;
    let angleInDegrees = calculateAngleBetween3PointsInDegrees(x1, y1, x2, y2, x3, y3);
    let stance = "OK";
    if (angleInDegrees > 100) {
      stance = "legs too wide!"
    }
    if (angleInDegrees < 90) {
      stance = "legs too narrow!"
    }

    // upper back height
    let leftShoulderHeight = pose[0]["keypoints"][5].y;
    let leftHipHeight = pose[0]["keypoints"][11].y;
    let rightShoulderHeight = pose[0]["keypoints"][6].y;
    let rightHipHeight = pose[0]["keypoints"][12].y;

    let heightOfUpperBackStatus = "OK";
    if (leftShoulderHeight > leftHipHeight || rightShoulderHeight > rightHipHeight) { // its >, because of the coordinate system
      heightOfUpperBackStatus = "Upper back too low!";
    }

    let output = "Stance: " + stance + " - Upper back: " + heightOfUpperBackStatus + " - Angle: " + angleInDegrees + "*";
    // console.log("%c " + output, "font-size: 20px");
  }

  function printPushups() {             // left arm: 10,8,6
    let x1 = pose[0]["keypoints"][5].x;// right arm: 5,7,9
    let y1 = pose[0]["keypoints"][5].y;
    let x2 = pose[0]["keypoints"][7].x;
    let y2 = pose[0]["keypoints"][7].y;
    let x3 = pose[0]["keypoints"][9].x;
    let y3 = pose[0]["keypoints"][9].y;
    let angleInDegrees = calculateAngleBetween3PointsInDegrees(x1, y1, x2, y2, x3, y3);
    if (angleInDegrees > 160 && !flip) {
      repCounter++;
      flip = !flip;
    }
    if (angleInDegrees < 110 && flip) {
      flip = !flip;
    }
    let output = "Pushups: " + repCounter + " - Angle: " + angleInDegrees + "*";
    console.log("%c " + output, "font-size: 20px");
  }

  function printSquat() {
    let x1 = pose[0]["keypoints"][16].x;
    let y1 = pose[0]["keypoints"][16].y;
    let x2 = pose[0]["keypoints"][12].x;
    let y2 = pose[0]["keypoints"][12].y;
    let a = x1 - x2;
    let b = y1 - y2;
    let distanceBetweenTwoPoints = Math.sqrt(a * a + b * b);
    if (distanceBetweenTwoPoints < 100 && !flip) {
      repCounter++;
      flip = !flip;
    }
    if (distanceBetweenTwoPoints > 150 && flip) {
      flip = !flip;
    }
    let output = "Squats: " + repCounter + " - " + distanceBetweenTwoPoints + "px";
    console.log("%c " + output, "font-size: 20px");
  }

  function printDeadlift() {
    let x1 = pose[0]["keypoints"][6].x;
    let y1 = pose[0]["keypoints"][6].y;
    let x2 = pose[0]["keypoints"][12].x;
    let y2 = pose[0]["keypoints"][12].y;
    let a = x1 - x2;
    let b = y1 - y2;
    let distanceBetweenTwoPoints = Math.sqrt(a * a + b * b);
    if (distanceBetweenTwoPoints < 50 && !flip) {
      repCounter++;
      flip = !flip;
    }
    if (distanceBetweenTwoPoints > 90 && flip) {
      flip = !flip;
    }
    let output = "deadlifts: " + repCounter + " - " + distanceBetweenTwoPoints + "px";
    // console.log("%c " + output, "font-size: 20px");
    this.doSomething();
  }

  function drawLandmarks() {
    // loop through all landmarks
    for (let i = 0; i < 16; i++) {
      let x = pose[0]["keypoints"][i].x;
      let y = pose[0]["keypoints"][i].y;
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, 2 * Math.PI);
      ctx.fill();

    }
  }

  function connectTheDots() {
    ctx.beginPath();
    ctx.strokeStyle = "green";
    ctx.lineWidth = 4;
    // upper body
    ctx.moveTo(pose[0]["keypoints"][10].x, pose[0]["keypoints"][10].y);
    ctx.lineTo(pose[0]["keypoints"][8].x, pose[0]["keypoints"][8].y);
    ctx.lineTo(pose[0]["keypoints"][6].x, pose[0]["keypoints"][6].y);
    ctx.lineTo(pose[0]["keypoints"][5].x, pose[0]["keypoints"][5].y);
    ctx.lineTo(pose[0]["keypoints"][7].x, pose[0]["keypoints"][7].y);
    ctx.lineTo(pose[0]["keypoints"][9].x, pose[0]["keypoints"][9].y);
    // left side
    ctx.moveTo(pose[0]["keypoints"][6].x, pose[0]["keypoints"][6].y);
    ctx.lineTo(pose[0]["keypoints"][12].x, pose[0]["keypoints"][12].y);
    ctx.lineTo(pose[0]["keypoints"][14].x, pose[0]["keypoints"][14].y);
    ctx.lineTo(pose[0]["keypoints"][16].x, pose[0]["keypoints"][16].y);
    // right side
    ctx.moveTo(pose[0]["keypoints"][5].x, pose[0]["keypoints"][5].y);
    ctx.lineTo(pose[0]["keypoints"][11].x, pose[0]["keypoints"][11].y);
    ctx.lineTo(pose[0]["keypoints"][13].x, pose[0]["keypoints"][13].y);
    ctx.lineTo(pose[0]["keypoints"][15].x, pose[0]["keypoints"][15].y);
    // bottom line
    ctx.moveTo(pose[0]["keypoints"][12].x, pose[0]["keypoints"][12].y);
    ctx.lineTo(pose[0]["keypoints"][11].x, pose[0]["keypoints"][11].y);

    ctx.stroke();



  }

  function calculateAngleBetween3PointsInDegrees(x1, y1, x2, y2, x3, y3) {
    let AB = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    let BC = Math.sqrt(Math.pow(x2 - x3, 2) + Math.pow(y2 - y3, 2));
    let AC = Math.sqrt(Math.pow(x3 - x1, 2) + Math.pow(y3 - y1, 2));
    return (Math.acos((BC * BC + AB * AB - AC * AC) / (2 * BC * AB)) * 180) / Math.PI;
  }
}




</script>