import { SWAP_SEATS, MAKE_TOAST} from "./Event";
import scream from './sound/BangScream.mp3';
import pop from './sound/pop.mp3';

export const SCREAM_SFX = 'SCREAM';
export const POP_SFX = 'POP';

const synth = window.speechSynthesis;
const defaultVoice = 'Fred';

const init = () => {
    try {
        this.sfx = {};
        this.sfx[SCREAM_SFX] = new Audio(scream);
        this.sfx[POP_SFX] = new Audio(pop);
    }
    catch(e) {
        alert('Web Audio API is not supported in this browser');
    }
};

const playEffect = (name) => {
    const sound = this.sfx[name];
    if (sound) {
        sound.play();
    }
};

const say = (text, speechSettings) => {
    const { voice = defaultVoice, rate = 1.0, pitch = 1.0 } = speechSettings;
    synth.cancel();
    const theVoice = synth.getVoices().filter(v => v.name === voice)[0];
    if (theVoice) {
        const utterThis = new SpeechSynthesisUtterance(text);
        utterThis.voice = theVoice;
        utterThis.rate = rate;
        utterThis.pitch = pitch;
        synth.speak(utterThis);
    } else {
        throw new Error(`Unknown voice ${voice}`);
    }
};

const swapSeats = (person1, person2, speechSettings) => {
    const swapText = `${person1}... and... ${person2}... swap seats")`;
    say(swapText, speechSettings);
};

const makeToast = (person1, speechSettings) => {
    const toastText = `${person1}... make a toast at your table")`;
    say(toastText, speechSettings);
};

const listVoices = () => {
    return new Promise((resolve) => {
        speechSynthesis.onvoiceschanged = () => {
            resolve(synth.getVoices());
        };
        const voices = synth.getVoices();
        if (voices && voices.length > 0) {
            resolve(voices);
        }
    });
};

const sayEvent = (event, speechSettings) => {
    switch (event.type) {
        case SWAP_SEATS: {
            const person1 = event.persons[0].name;
            const person2 = event.persons[1].name;
            swapSeats(person1, person2, speechSettings);
            break;
        }
        default:
        case MAKE_TOAST: {
            const person1 = event.persons[0].name;
            makeToast(person1, speechSettings);
            break;
        }
    }
};

const getDefaultVoice = () => defaultVoice;

export default {
    init, playEffect, say, sayEvent, listVoices, getDefaultVoice
}