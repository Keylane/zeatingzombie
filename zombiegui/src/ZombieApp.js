import React, {Component} from 'react';
import './ZombieApp.css';
import {bubble as Menu} from 'react-burger-menu'
import './menu.css'
import 'rc-slider/assets/index.css';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import Event, {SWAP_SEATS, MAKE_TOAST} from './Event'
import SpeechController, {SCREAM_SFX, POP_SFX} from './Controllers/SoundController/SoundController';
import EventWriter from './Components/EventWriter/EventWriter'
import ZombieController, {
    SCREAM_ANIM,
    SPEAK_ANIM,
    SPEAK_SHORT_ANIM
} from './Controllers/ZombieController/ZombieController'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {Range} from 'rc-slider';
import Button from '@material-ui/core/Button';

import ObeyTheZombie from './Components/ObeyTheZombie/ObeyTheZombie';
import Participants from "./Components/Participants/Participants";
import VoiceSelector from "./Components/VoiceSelector/VoiceSelector";

const MAX_RECENT_HISTORY = 5;

export default class extends Component {
    recentlyChosenParticipants = [];

    constructor(props) {
        super(props);
        this.state = {
            participants: ['Archie Enyeart', 'Pearline Ryan', 'Jack Bartel', 'Suzie Neihoff', 'Dorotha Guernsey',
                'Forrest Shanks', 'Zandra Duchene', 'Amanda Abron', 'Arlinda Chadbourne', 'Gus Hillery',
                'Marlana Gilland', 'Winford Kok', 'Corey Solar', 'Mittie Deal'],
            delayInSeconds: 10 * 60,
            minMaxDelay: [3, 10],
            drinkToast: true,
            swapParticipants: true,
            countdownStartedAt: null,
            nextEventCountdown: 'N/A',
            currentEvent: null,
            voice: SpeechController.getDefaultVoice(),
            pitch: 19,
            rate: 8,
            displayObey: false
        };
        SpeechController.init();
        ZombieController.floatAround();
        window.popSfx = () => {
            // Make popSfx available to Adobe animation player
            SpeechController.playEffect(POP_SFX);
        };
    }

    adjustMinMaxDelay = (minMaxArray) => {
        this.setState({minMaxDelay: minMaxArray, delayInSeconds: minMaxArray[1] * 60});
    };

    flipCheckbox = name => event => {
        this.setState({[name]: event.target.checked});
    };

    handleChangeValueTextField = name => event => {
        this.setState({
            [name]: +event.target.value,
        });
    };

    handleSliderChange = name => value => {
        this.setState({[name]: value})
    };

    handleChangeTextField = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    updateParticipants = (participants) => {
        this.setState({ participants })
    };

    millisToMinutesAndSeconds = (millis) => {
        const minutes = Math.floor(millis / 60000);
        const seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    };

    /**
     * Get random participants and make sure not to pick someone recently chosen
     * @param amount
     * @returns Array of names
     */
    getRandomParticipants = (amount) => {
        const participants = this.state.participants.filter(name => name !== '');
        const chosen = [];
        if (participants.length > amount) {
            for (let i = 0; i < amount; i++) {
                let index;
                do {
                    index = Math.round(Math.random() * (participants.length - 1));
                } while (this.recentlyChosenParticipants.includes(index));
                chosen.push(participants[index]);
                this.recentlyChosenParticipants.push(index);
                if (this.recentlyChosenParticipants.length > Math.min(MAX_RECENT_HISTORY, participants.length - 1)) {
                    this.recentlyChosenParticipants.shift();
                }
            }
        }
        return chosen;
    };

    sleep = (ms = 0) => {
        return new Promise(r => setTimeout(r, ms));
    };

    toggleObeyZombie = (show) => {
        this.setState({displayObey: show});
    };

    /**
     * Start zombie animation, select and display random event
     */
    fireEvent = async () => {
        ZombieController.zoom();
        ZombieController.animate(SCREAM_ANIM);
        SpeechController.playEffect(SCREAM_SFX);
        await this.sleep(5000);
        this.toggleObeyZombie(true);
        await this.sleep(3000);
        this.toggleObeyZombie(false);
        await this.sleep(1000);
        ZombieController.spin();
        await this.sleep(1000);

        let event;
        let animationFrame;
        if ((this.state.swapParticipants && Math.random() < 0.5) || !this.state.drinkToast) {
            const persons = this.getRandomParticipants(2);
            event = new Event(SWAP_SEATS, [{name: persons[0]}, {name: persons[1]}]);
            animationFrame = SPEAK_ANIM;
        } else {
            const persons = this.getRandomParticipants(1);
            event = new Event(MAKE_TOAST, [{name: persons[0]}]);
            animationFrame = SPEAK_SHORT_ANIM;
        }
        const {voice, rate, pitch} = this.state;
        SpeechController.sayEvent(event, {voice, rate: rate / 10, pitch: pitch / 10});
        ZombieController.animate(animationFrame);
        this.setState({currentEvent: event});
        if (this.state.delayInSeconds > this.state.minMaxDelay[0] * 60) {
            this.setState({delayInSeconds: this.state.delayInSeconds - 60})
        }
        await this.sleep(5000);    // Wait for talk to finish
        ZombieController.floatAround();
        await this.sleep(30000);    // Before hiding order
        this.setState({currentEvent: null});
    };

    resetCountdownTimer = () => {
        this.setState({countdownStartedAt: new Date().getTime()});
    };

    /**
     * Called every second to check if it's time to fire an event
     */
    tick = () => {
        let countdown = this.state.countdownStartedAt + this.state.delayInSeconds * 1000 - new Date().getTime();
        if (countdown < 0) {
            this.fireEvent();
            this.resetCountdownTimer();
        } else {
            this.setState({
                nextEventCountdown: this.millisToMinutesAndSeconds(countdown)
            })
        }
    };

    /**
     * Switch countdown on/off
     */
    toggleCountdownTimer = () => {
        if (this.state.countdownStartedAt) {
            this.setState({countdownStartedAt: null});
            clearInterval(this.timer);
        } else {
            this.timer = setInterval(this.tick, 1000);
            this.resetCountdownTimer();
        }
    };

    selectVoice = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    render() {
        return (
            <div id="ZombieApp">
                <ObeyTheZombie isVisible={this.state.displayObey}/>

                <Menu width={400}>
                    <Card>
                        <VoiceSelector
                            voice={this.state.voice}
                            rate={this.state.rate}
                            pitch={this.state.pitch}
                            selectVoice={this.selectVoice}
                            handleSliderChange={this.handleSliderChange}
                        />
                    </Card>
                    <br/>
                    <Card>
                        <CardContent>
                            <Participants
                                participants={this.state.participants}
                                updateParticipants={this.updateParticipants}
                                handleChangeTextField={this.handleChangeTextField}
                                participantsUrl="https://guarded-lowlands-41173.herokuapp.com/event/1/participants"
                            />
                        </CardContent>
                    </Card>

                    <br/>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary">
                                Events
                            </Typography>

                            <div>
                                <Grid container spacing={24}>
                                    <Grid item xs={6}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    onChange={this.flipCheckbox('drinkToast')}
                                                    checked={this.state.drinkToast}
                                                />
                                            }
                                            label="Make a toast"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    onChange={this.flipCheckbox('swapParticipants')}
                                                    checked={this.state.swapParticipants}
                                                />
                                            }
                                            label="Swap Participants"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Paper title="Minimum delay between events">{this.state.minMaxDelay[0]} min.</Paper>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Paper title="Initial delay between events">{this.state.minMaxDelay[1]} min.</Paper>
                                    </Grid>
                                </Grid>
                            </div>

                            <br/>
                            <Range onChange={this.adjustMinMaxDelay} allowCross={false}
                                   defaultValue={[this.state.minMaxDelay[0], this.state.minMaxDelay[1]]}
                                   min={1}
                                   max={20}
                            />
                            <br/>
                            <TextField
                                variant="raised" color="primary"
                                margin="none"
                                label="Current delay between events in seconds"
                                onChange={this.handleChangeValueTextField('delayInSeconds')}
                                value={this.state.delayInSeconds}
                            />

                            <TextField
                                disabled
                                variant="raised" color="primary"
                                margin="none"
                                label="Next event"
                                value={this.state.nextEventCountdown}
                            />
                        </CardContent>
                    </Card>
                    <br/>

                    <Button onClick={this.toggleCountdownTimer} variant="raised" color="primary">
                        {this.state.countdownStartedAt ? 'Stop' : 'Start'}
                    </Button>
                    <br/>
                    <Button onClick={this.fireEvent} variant="raised" color="secondary">
                        Fire event
                    </Button>
                </Menu>
                <EventWriter event={this.state.currentEvent}/>
            </div>
        );
    }
}
