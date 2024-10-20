const { resolveAny } = require('dns');
var fs = require('fs');
// var obj = JSON.parse(fs.readFileSync('session-scripts/demo.escur.json', 'utf8'));
var obj = JSON.parse(fs.readFileSync('session-scripts/FunBelgiumEstim  2024  electron  012  (=FBE069mp3) with Nitrox.json', 'utf8'));

// Combine all message types into a single array of timestamped objects

var allMsgs = [];

if (Object.hasOwn(obj, 'left')) {
    for (const left of obj.left) {
        allMsgs.push({
            stamp: left.stamp,
            left: left.message
        });
    }
}

if (Object.hasOwn(obj, 'right')) {
    for (const right of obj.right) {
        allMsgs.push({
            stamp: right.stamp,
            right: right.message
        });
    }
}

if (Object.hasOwn(obj, 'pain-left')) {
    for (const painLeft of obj['pain-left']) {
        allMsgs.push({
            stamp: painLeft.stamp,
            painLeft: painLeft.message
        });
    }
}

if (Object.hasOwn(obj, 'pain-right')) {
    for (const painRight of obj['pain-right']) {
        allMsgs.push({
            stamp: painRight.stamp,
            painRight: painRight.message
        });
    }
}

if (Object.hasOwn(obj, 'bottle')) {
    for (const bottle of obj.bottle) {
        allMsgs.push({
            stamp: bottle.stamp,
            bottle: bottle.message
        });
    }
}

allMsgs.sort((a, b) => a.stamp - b.stamp);

console.log(allMsgs);

curTimeStamp = 0;
curLeft = obj.left[0];
curRight = obj.right[0];

var updates = [];

for (const msg of allMsgs) {
    upd = {};
    
    console.log(msg);

    upd.timeFromPrevious = (msg.stamp - curTimeStamp) / 1000.0;
    curTimeStamp = msg.stamp;

    if (Object.hasOwn(msg, 'bottle')) {
        upd.bottlePrompt = msg.bottle.bottleDuration;
    } else if (Object.hasOwn(msg, 'left')) {
        left = msg.left;
        if (left.active != curLeft.active) {
            upd.leftActive = left.active;
        }
        if (left.volume != curLeft.volume) {
            upd.leftVolume = left.volume;
        }
        if (left.freq != curLeft.freq) {
            upd.leftFreq = left.freq;
        }
        if (left.rampTarget != curLeft.rampTarget) {
            upd.leftRampTarget = left.rampTarget;
        }
        if (left.rampRate != curLeft.rampRate) {
            upd.leftRampRate = left.rampRate;
        }
        if (left.amType != curLeft.amType) {
            upd.leftAmType = left.amType;
        }
        if (left.amDepth != curLeft.amDepth) {
            upd.leftAmDepth = left.amDepth;
        }
        if (left.amRate != curLeft.amRate) {
            upd.leftAmRate = left.amRate;
        }
        if (left.fmType != curLeft.fmType) {
            upd.leftFmType = left.fmType;
        }
        if (left.fmDepth != curLeft.fmDepth) {
            upd.leftFmDepth = left.fmDepth;
        }
        if (left.fmRate != curLeft.fmRate) {
            upd.leftFmRate = left.fmRate;
        }
        curLeft = left;
    } else if (Object.hasOwn(msg, 'right')) {
        // TODO: Share common code with 'left'
        right = msg.right;
        if (right.active != curRight.active) {
            upd.rightActive = right.active;
        }
        if (right.volume != curRight.volume) {
            upd.rightVolume = right.volume;
        }
        if (right.freq != curRight.freq) {
            upd.rightFreq = right.freq;
        }
        if (right.rampTarget != curRight.rampTarget) {
            upd.rightRampTarget = right.rampTarget;
        }
        if (right.rampRate != curRight.rampRate) {
            upd.rightRampRate = right.rampRate;
        }
        if (right.amType != curRight.amType) {
            upd.rightAmType = right.amType;
        }
        if (right.amDepth != curRight.amDepth) {
            upd.rightAmDepth = right.amDepth;
        }
        if (right.amRate != curRight.amRate) {
            upd.rightAmRate = right.amRate;
        }
        if (right.fmType != curRight.fmType) {
            upd.rightFmType = right.fmType;
        }
        if (right.fmDepth != curRight.fmDepth) {
            upd.rightFmDepth = right.fmDepth;
        }
        if (right.fmRate != curRight.fmRate) {
            upd.rightFmRate = right.fmRate;
        }
        curRight = right;
    } else if (Object.hasOwn(msg, 'painLeft') || Object.hasOwn(msg, 'painRight')) {
        var painOut = {};
        var painIn;
        if (Object.hasOwn(msg, 'painLeft')) {
            painIn = msg.painLeft;
            painOut.channel = 'left';
        } else if (Object.hasOwn(msg, 'painRight')) {
            painIn = msg.painRight;
            painOut.channel = 'right';
        }
        painOut.volume = painIn.volume;
        painOut.frequency = painIn.frequency;
        painOut.numberOfShocks = painIn.numberOfShocks;
        painOut.duration = painIn.shockDuration;
        painOut.timeBetween = painIn.timeBetweenShocks;
        upd.painTools = painOut;
    } else {
        error('Invalid message');
    }
    updates.push(upd);
}

console.log(updates);


const myYaml = { 'updates': updates };

const yaml = require('js-yaml');

// Convert the data to YAML
const yamlStr = yaml.dump(myYaml);

console.log(yamlStr);

// Write the YAML string to a file
fs.writeFileSync('session-scripts/FBE.yaml', yamlStr, 'utf8');


const temp = {'wtf': 'wtaf'};
console.log(temp);
console.log(yaml.dump(temp));
