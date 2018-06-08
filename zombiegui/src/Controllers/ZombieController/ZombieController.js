export const SPEAK_ANIM = 790;
export const SPEAK_SHORT_ANIM = 810;
export const SCREAM_ANIM = 960;

export default {
    animate: (frameNo) => {
        window.zombieTimeline.gotoAndPlay(frameNo);
    },
    spin: () => {
        const canvas = document.getElementsByTagName("canvas")[0];
        const directionClass = canvas.classList.contains('spinClockwise') ? 'spinCounterClockwise' : 'spinClockwise'
        canvas.className = directionClass;
    },
    zoom: () => {
        const canvas = document.getElementsByTagName("canvas")[0];
        const directionClass = canvas.classList.contains('zoom1') ? 'zoom2' : 'zoom1'
        canvas.className = directionClass;
    },
    floatAround: () => {
        const canvas = document.getElementsByTagName("canvas")[0];
        canvas.className = 'floatAround';
    }

}