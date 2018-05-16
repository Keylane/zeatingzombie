var synth = window.speechSynthesis;
const soundBtnAll = document.querySelector("#soundBtnAll");
const soundBtnTalk = document.querySelector("#soundBtnTalk");
const soundBtnSounds = document.querySelector("#soundBtnSounds");
const soundBtnMusic = document.querySelector("#soundBtnMusic");

function takeRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
function takeWeightedRandom(arr, weights) {
    var val = Math.random();
    for (var i = 0; i < weights.length; i++) {
        if (val <= weights[i]) {
            return arr[i];
        }
    }
    return arr[arr.length-1];
}

function takeRandomKey(dict) {
    return takeRandom(Object.keys(dict));
}
function takeRandomValue(dict) {
    return dict[takeRandomKey(dict)];
}

var currentUtterance = null;
function say(text) {
    synth.cancel();
    playSound(takeRandom(["ding1", "ding2", "ding3"]), function () {
        console.info("talking...");
        var utterThis = new SpeechSynthesisUtterance(text);
        utterThis.voice = takeRandom(synth.getVoices());
        utterThis.pitch = Math.random()*0.4 + 0.8;
        utterThis.rate = Math.random()*0.2 + 0.9;
        utterThis.volume = getGainNode(SoundType.Talk).gain.value;
        synth.speak(utterThis);
        currentUtterance = utterThis;
    });
}

const names = ["Espen Højsgaard",
    "Rasmus Nørgaard",
    "Lærke Fleckenstein",
    "Inge Schou Kristensen",
    "Sten Eggers",
    "Thomas Haahr Lynderup",
    "Tobias Berthelsen",
    "Kim Aguirre Nolsøe",
    "Rasmus Frandsen",
    "René Kundby Nygaard",
    "Jakob Gøttrup Nielsen",
    "Vivi Kristina Husum Tøttrup",
    "Mikkel Engstrøm Karup",
    "Sune Jacobsen",
    "Kia Marstal Rothmar",
    "Jonas Skott Sigtenbjerggaard",
    "Jacob Aaboe",
    "Michael Nannestad",
    "Thomas Nicolaj Barnholdt",
    "Jens Greibe",
    "Torben Bruun Randrup",
    "Heidi Nielsen",
    "Stiig Berg Andersen",
    "Martin Jönsson",
    "Jesper Høj Stjernholm",
    "Anders Nielsen Helmar",
    "Rasmus Voss",
    "Andrew Prasana Rajendram",
    "René Kjær Hornbjerg",
    "Mikkel Arent",
    "Martin Lorenzen",
    "August Møbius",
    "Mads Brostrøm Storgaard",
    "Rasmus Hedegaard",
    "Luka Skracic",
    "Steen Bundgaard",
    "Per Bille Højte",
    "Morten Bruno Schrack Tietze",
    "Magnus Gausdal Find",
    "Torben Poort Lange",
    "Martin Lund",
    "Sofie Mollyhus",
    "Lene Bønløkke",
    "Marck Bothmann",
    "Katrine Fogh Gransøe",
    "Asbjørn Nicolaisen",
    "Laurs Rasmus Schifter",
    "Britt Johnsen",
    "Sofie Vester",
    "Line Buur",
    "Philip Rasmussen",
    "Maria Kryger Poulsen",
    "Kenneth Steen Jensen",
    "Morten Berg Jacobsen",
    "Henrik Larsen",
    "Martin Arndt",
    "Søren Busch-Knudsen",
    "Kristian Iversen",
    "Sophie Ahm",
    "Rasmus Resen Amossen",
    "Sofie Østergaard",
    "Martin Thuesen",
    "Joachim Sejr",
    "Søren Grenz",
    "Tanja Thernøe",
    "Magnus Westh Nilsson",
    "Christian Frost",
    "Chris Lunde Jensen",
    "Ahmad Soheil Abdullatif",
    "Christos Zoupis Schoinas",
    "Viktor Jeppesen",
    "Mikkel Andersen",
    "Lasse Fabricius",
    "Dawit Legesse Tirore",
    "Anne Katrine Dybro",
    "Martin Weithaler",
    "Søren Larsen",
    "Anders Julfeldt",
    "Sanne Loomans",
    "Julie Topp Hansen",
    "Maja Blom Nielsen",
    "Richardt Lisbygd",
    "Martin Bo Heiberg",
    "Katrine Bæch",];
const shouts = ["Yeah!", "Party!", "ûber geil!", "Hammertime!", "Twerk it!", "#hashtag #hashtag", "No sleep", "Bubbles", "BRAIIINNNZZZZ!!!", "Double whammy", "PAL-beskatning FTW"];
const cheers = ["Aktuarskål", "Koldskål", "BA-skål", "Super duper deputy vice president of important international corporate business, skål", "Javaskål", ".Netskål", "Programmerskål", "Arkitektskål", "Skål", "Projektlederskål"];
const shoutsAbout = ["{0} rules", "{0} bunder", "Du drikker for hurtigt {0}", "Too much style {0}", "Du ser godt ud {0}", "Looking good {0}", "{0}s bord skåler", "Nej nej nej, hvad er det du laver {0}", "Gem noget til os andre {0}", "Se {0} er på dansegulvet", "Alle ved {0}s bord bytter plads"];
const generators = [buildSwitch, randomShout, randomShoutAbout, randomCheer];
const generatorWeights = [0.2, 0.5, 0.8, 1];

function sayRandomText() {
  const text = takeWeightedRandom(generators, generatorWeights)();
  console.info(text);
  say(text);
}

function randomCheer() {
    return takeRandom(cheers);
}

function randomName() {
    return takeRandom(names);
}

function randomShout() {
  return takeRandom(shouts);
}
function randomShoutAbout() {
    return takeRandom(shoutsAbout).replace("{0}", randomName());
}

function buildSwitch() {
  const first = randomName();
  let second = "John Doe";
  do {
    second = randomName();
  } while (first == second);
  return first + " og " + second + " skal bytte plads";
}


//spil klokke først
var context;
var soundBuffers = [];

window.addEventListener('load', init, false);
function init() {
    try {
        // Fix up for prefixing
        window.AudioContext = window.AudioContext||window.webkitAudioContext;
        context = new AudioContext();
    }
    catch(e) {
        alert('Web Audio API is not supported in this browser');
    }
}
function onError() {

}

const SoundType = {
    Talk: 1,
    Sound: 2,
    Music: 4,
    All: 7
}

var gainNodes = [];
var soundButtons = {};
soundButtons[SoundType.Talk] = soundBtnTalk;
soundButtons[SoundType.Sound] = soundBtnSounds;
soundButtons[SoundType.Music] = soundBtnMusic;
soundButtons[SoundType.All] = soundBtnAll;

function loadSound(name, type, url, then) {
    var request = new XMLHttpRequest();
    request.open('GET', "sounds/" + url, true);
    request.responseType = 'arraybuffer';

    // Decode asynchronously
    request.onload = function() {
        context.decodeAudioData(request.response, function(buffer) {
            soundBuffers[name] = {buffer: buffer, type: type};
            if (then != null) {
                then();
            }
        }, onError);
    }
    request.send();
}

loadSound("bg", SoundType.Music, "427768__gis-sweden__about-120bpm-rythm-loop-freesoundmix.wav", function () {playSound("bg", null, true)});
loadSound("ding1", SoundType.Sound, "333694__khrinx__thin-bell-ding-3.wav");
loadSound("ding2", SoundType.Sound, "196106__aiwha__ding.wav");
loadSound("ding3", SoundType.Sound, "265012__sethlind__toaster-oven-ding.wav");

function getGainNode(type) {
    var gain = gainNodes[type];
    if (gain == null) {
        gain = context.createGain();
        gain.connect(context.destination);
        gainNodes[type] = gain;
    }
    return gain;
}

function playSound(name, then, loop) {
    var buffer = soundBuffers[name];
    if (buffer != null) {
        var source = context.createBufferSource(); // creates a sound source
        source.buffer = buffer.buffer;                    // tell the source which sound to play
        source.loop = loop !== undefined ? loop : false;
        source.connect(getGainNode(buffer.type));      // connect the source to the context's destination (the speakers)
        setTimeout(then, 1500);
        source.start(0);                           // play the source now
                                                   // note: on older systems, may have to use deprecated noteOn(time);
    } else {
        console.warn("Sound " + name + " unkown or not loaded yet");
        if (then != null) {
            then();
        }
    }
}

function toggleSounds(toggleType) {
    for (var type of [SoundType.Music, SoundType.Sound, SoundType.Talk]) {
        if ((toggleType & type) == type) {
            var gain = getGainNode(type);
            gain.gain.value = gain.gain.value == 0 ? 1 : 0;

            if (type == SoundType.Talk && currentUtterance != null) {
                currentUtterance.volume = gain.gain.value;
            }
            soundButtons[type].checked = gain.gain.value == 1;
        }
    }
}