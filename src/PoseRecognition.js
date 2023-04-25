let pose;
let detector;
let repCounter;
let flip;
let endPoseRecognition;
let exercise;
let stance = "";

let video;
let canvas;
let ctx;

async function startPoseDetection(exerciseName) {
    console.log("exercise:" + exerciseName);
    pose = null;
    detector = null;
    repCounter = 0;
    flip = true;
    endPoseRecognition = false;
    exercise = exerciseName;

    const video_temp = document.getElementById('video');
    video_temp.onloadedmetadata = () => {
        video = document.getElementById('video');
        canvas = document.getElementById('output');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx = canvas.getContext('2d');
        ctx.fillStyle = 'red';

        startDetector()
            .then(() => requestAnimationFrame(drawCanvas))
            .then(() => {
                document.getElementById("loader").style.display = "none";
                document.getElementById("output").style.display = "block";
                document.getElementById("counter").style.display = "block";
                document.getElementById("status").style.display = "block";
            });
    };
}

function setupVideo() {
    console.log("Setting up video...");
    const video = document.getElementById('video');
    const stream = navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true
    }).then(function (stream) {
        video.srcObject = stream;
    });
    console.log("DONE!");
}

function stopVideo() {
    console.log("Stopping video...");
    video.srcObject.getTracks().forEach(track => track.stop());
    video.srcObject = null;
    endPoseRecognition = true;
    console.log('DONE!');
}

async function startDetector() {
    console.log("Starting detector...");
    detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, { minPoseScore: 0.5 });
    console.log("DONE!");
}

async function getPose() {
    pose = await detector.estimatePoses(video);
}

function drawCanvas() {
    if (endPoseRecognition) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    getPose().then(() => {

        drawLandmarks();
        connectTheDots();
        switch (exercise) {
            case "Push up":
                exercises.printPushup();
                break;
            case "Deadlift":
                exercises.printDeadlift();
                exercises.printFormDeadlift();
                break;
            case "Squat":
                exercises.printSquat();
                break;
            default:
                console.log("Error: exercise not found!");
                break;
        }

    }).catch((err) => {
        // console.log(err);
        console.log("Cannot detect landmarks!");
    });
    requestAnimationFrame(drawCanvas);
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

const exercises = {
    printDeadlift: () => {
        let x1 = pose[0]["keypoints"][6].x;
        let y1 = pose[0]["keypoints"][6].y;
        let x2 = pose[0]["keypoints"][12].x;
        let y2 = pose[0]["keypoints"][12].y;
        let a = x1 - x2;
        let b = y1 - y2;
        let distanceBetweenTwoPoints = Math.sqrt(a * a + b * b);
        if (distanceBetweenTwoPoints < 50 && !flip) {
            repCounter++;
            updateCounter();
            flip = !flip;
        }
        if (distanceBetweenTwoPoints > 90 && flip) {
            flip = !flip;
        }
        let output = "deadlifts: " + repCounter + " - " + distanceBetweenTwoPoints + "px";
        console.log("%c " + output, "font-size: 20px");
    },
    printPushup: () => {
        let x1 = pose[0]["keypoints"][5].x;// right arm: 5,7,9  left arm: 10,8,6
        let y1 = pose[0]["keypoints"][5].y;
        let x2 = pose[0]["keypoints"][7].x;
        let y2 = pose[0]["keypoints"][7].y;
        let x3 = pose[0]["keypoints"][9].x;
        let y3 = pose[0]["keypoints"][9].y;
        let angleInDegrees = calculateAngleBetween3PointsInDegrees(x1, y1, x2, y2, x3, y3);
        if (angleInDegrees > 160 && !flip) {
            repCounter++;
            updateCounter();
            flip = !flip;
        }
        if (angleInDegrees < 110 && flip) {
            flip = !flip;
        }
        let output = "Pushups: " + repCounter + " - Angle: " + angleInDegrees + "*";
        console.log("%c " + output, "font-size: 20px");
    },
    printSquat: () => {
        let x1 = pose[0]["keypoints"][16].x;
        let y1 = pose[0]["keypoints"][16].y;
        let x2 = pose[0]["keypoints"][12].x;
        let y2 = pose[0]["keypoints"][12].y;
        let a = x1 - x2;
        let b = y1 - y2;
        let distanceBetweenTwoPoints = Math.sqrt(a * a + b * b);
        if (distanceBetweenTwoPoints < 100 && !flip) {
            repCounter++;
            updateCounter();
            flip = !flip;
        }
        if (distanceBetweenTwoPoints > 150 && flip) {
            flip = !flip;
        }
        let output = "Squats: " + repCounter + " - " + distanceBetweenTwoPoints + "px";
        console.log("%c " + output, "font-size: 20px");
    },
    printFormDeadlift: () => {
        // legs        
        let x1 = pose[0]["keypoints"][14].x;
        let y1 = pose[0]["keypoints"][14].y;
        let x2 = pose[0]["keypoints"][12].x;
        let y2 = pose[0]["keypoints"][12].y;
        let x3 = pose[0]["keypoints"][11].x;
        let y3 = pose[0]["keypoints"][11].y;
        let angleInDegrees = calculateAngleBetween3PointsInDegrees(x1, y1, x2, y2, x3, y3);
        stance = "OK";
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
        updateForm(stance);
        let output = "Stance: " + stance + " - Upper back: " + heightOfUpperBackStatus + " - Angle: " + angleInDegrees + "*";
        // console.log("%c " + output, "font-size: 20px");
    }
}

function calculateAngleBetween3PointsInDegrees(x1, y1, x2, y2, x3, y3) {
    let AB = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    let BC = Math.sqrt(Math.pow(x2 - x3, 2) + Math.pow(y2 - y3, 2));
    let AC = Math.sqrt(Math.pow(x3 - x1, 2) + Math.pow(y3 - y1, 2));
    return (Math.acos((BC * BC + AB * AB - AC * AC) / (2 * BC * AB)) * 180) / Math.PI;
}

function updateCounter() {
    document.getElementById("counter").innerHTML = repCounter;
}
function updateForm(message) {
    document.getElementById("status").innerHTML = "Form: " + message;
}

export { setupVideo, stopVideo, startPoseDetection, repCounter };