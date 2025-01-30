const LEFT_EYE = [33, 133,  144, 159, 145];
const RIGHT_EYE = [263, 362, 387, 373, 386, 374];

self.onmessage =  (event) =>{
    let faces = event.data;
    const face = faces[0];
    const key = face.keypoints;
    var leftEAR = 0;
    var rightEAR = 0;
    let BlinkThreshhold = 0.23;

    leftEAR = (dist(key[159], key[145]) + dist(key[160], key[144])) / (2* dist(key[33], key[133]));
    rightEAR = (dist(key[386], key[374]) + dist(key[387], key[373])) / (2* dist(key[263], key[362]));

    if(leftEAR < BlinkThreshhold  || rightEAR < BlinkThreshhold ){
        self.postMessage('Blink-Detected');
    }
}

const dist = (point1, point2) => {
    const dx = point1.x - point2.x;
    const dy = point1.y - point2.y;
    return Math.hypot(dx, dy);
};