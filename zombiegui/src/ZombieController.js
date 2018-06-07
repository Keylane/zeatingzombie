const SPEAK_ANIM_FRAME = 720;

const skins = [
    {bg: '#393943', fg: '#673ab7'},
    {bg: '#3d5b7c', fg: '#673ab7'},
    {bg: '#248388', fg: '#673ab7'},
    {bg: '#63ba96', fg: '#673ab7'},
    {bg: '#6d0504', fg: '#efe1e2'},
    {bg: '#eb6e44', fg: '#795548'},
    {bg: '#d4e397', fg: '#3f463f'},
    {bg: '#778c75', fg: '#3f463f'},
];

export default {
    changeBackgroundColor: (skinNo) => {
        const skin = skins[Math.min(Math.round(skinNo), skins.length - 1)];
        const bodyStyle = document.getElementsByTagName("body")[0].style;
        bodyStyle.color = skin.fg;
        bodyStyle.backgroundColor = skin.bg;
    },
    animate: (animation) => {
        window.zombieTimeline.gotoAndPlay(SPEAK_ANIM_FRAME);
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
    }
}