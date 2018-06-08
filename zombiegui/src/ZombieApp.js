import React, {Component} from 'react';
import './ZombieApp.css';
import {bubble as Menu} from 'react-burger-menu'
import './menu.css'
import Slider, {Range} from 'rc-slider';
import 'rc-slider/assets/index.css';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Event, {SWAP_SEATS, MAKE_TOAST} from './Event'
import SpeechController, { SCREAM_SFX, POP_SFX } from './Controllers/SoundController/SoundController';
import EventWriter from './Components/EventWriter/EventWriter'
import ZombieController, { SCREAM_ANIM, SPEAK_ANIM, SPEAK_SHORT_ANIM } from './Controllers/ZombieController/ZombieController'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import ObeyTheZombie from './Components/ObeyTheZombie/ObeyTheZombie';

const MAX_RECENT_HISTORY = 5;
const STATUS_ACCEPTED = 1;

export default class extends Component {
    recentlyChosen = [];

    constructor(props) {
        super(props);
        this.state = {
            delayInSeconds: 10 * 60,
            minMaxDelay: [3, 10],
            drinkToast: true,
            swapParticipants: true,
            countdownStartedAt: null,
            nextEventCountdown: 'N/A',
            currentEvent: null,
            participantsUrl: 'https://guarded-lowlands-41173.herokuapp.com/event/1/participants',
            participants: ['Christian Frost','Chris Lunde Jensen', 'Ahmad Soheil Abdullatif', 'Christos Zoupis Schoinas', 'Viktor Jeppesen', 'Mikkel Andersen', 'Lasse Fabricius' +
                           'Dawit Legesse Tirore', 'Anne Katrine Dybro', 'Martin Weithaler', 'Søren Larsen', 'Anders Julfeldt', 'Sanne Loomans', 'Julie Topp Hansen'],
            voice: SpeechController.getDefaultVoice(),
            pitch: 19,
            rate: 8,
            displayObey: false
        };
        SpeechController.init();
        window.popSfx = () => {
            SpeechController.playEffect(POP_SFX);
        };
        (async () => {
            const voices = await SpeechController.listVoices();
            this.setState({voices})
        })();
    }

    formatter = (x) => "." + x;

    adjustMinMaxDelay = (minMaxArray) => {
        this.setState({minMaxDelay: minMaxArray, delayInSeconds: minMaxArray[1] * 60});
    };

    flipCheckbox = name => event => {
        this.setState({[name]: event.target.checked});
    };

    handleChangeTextField = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleChangeValueTextField = name => event => {
        this.setState({
            [name]: +event.target.value,
        });
    };

    handleSliderChange = name => value => {
        this.setState({ [name] : value})
    };


    millisToMinutesAndSeconds = (millis) => {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    };

    /**
     * Get random participants but make sure not to pick someone recently chosen
     * @param amount
     * @returns Array of names
     */
    getRandomParticipants = (amount) => {
        const participants = this.state.participants;
        const chosen = [];
        if (participants.length > amount) {
            for (let i = 0; i < amount; i++) {
                let index;
                do {
                    index = Math.round(Math.random() * (participants.length - 1));
                } while (this.recentlyChosen.includes(index));
                chosen.push(participants[index]);
                this.recentlyChosen.push(index);
                if (this.recentlyChosen.length > Math.min(MAX_RECENT_HISTORY, participants.length - 1)) {
                    this.recentlyChosen.shift();
                }
                console.log(this.recentlyChosen);
            }
        }
        return chosen;
    };

    sleep = (ms = 0) => {
        return new Promise(r => setTimeout(r, ms));
    };

showObeyZombie = (show) => {
    this.setState({ displayObey: show });
};

fireEvent = async () => {
        ZombieController.zoom();
        ZombieController.animate(SCREAM_ANIM);         // Start speak animation
        SpeechController.playEffect(SCREAM_SFX);
        await this.sleep(5000);
        this.showObeyZombie(true);
        await this.sleep(3000);
        this.showObeyZombie(false);
        await this.sleep(1000);
        ZombieController.spin();
        await this.sleep(1000);

        let event;
        let anim;
        if ((this.state.swapParticipants && Math.random() < 0.5) || !this.state.drinkToast) {
            const persons = this.getRandomParticipants(2);
            event = new Event(SWAP_SEATS, [{name: persons[0]}, {name: persons[1]}]);
            anim = SPEAK_ANIM;
        } else {
            const persons = this.getRandomParticipants(1);
            event = new Event(MAKE_TOAST, [{ name: persons[0] }]);
            anim = SPEAK_SHORT_ANIM;
        }
        const { voice, rate, pitch} = this.state;
        SpeechController.sayEvent(event, {voice, rate: rate / 10, pitch: pitch / 10});
        ZombieController.animate(anim);
        this.setState({currentEvent: event});
        if (this.state.delayInSeconds > this.state.minMaxDelay[0] * 60) {
            this.setState({delayInSeconds: this.state.delayInSeconds - 60})
        }
        await this.sleep(5000);    // Wait for talk to finish
        ZombieController.floatAround();
        await this.sleep(30000);    // Before hiding order

        this.setState({currentEvent: null});
    };

    tick = () => {
        let countdown = this.state.countdownStartedAt + this.state.delayInSeconds * 1000 - new Date().getTime();
        if (countdown < 0) {
            this.fireEvent();
            this.resetTimer();
        } else {
            this.setState({
                nextEventCountdown: this.millisToMinutesAndSeconds(countdown)
            })
        }
    };

    resetTimer = () => {
        this.setState({countdownStartedAt: new Date().getTime()});
    };

    toggleTimer = () => {
        if (this.state.countdownStartedAt) {
            this.setState({countdownStartedAt: null});
            clearInterval(this.timer);
        } else {
            this.timer = setInterval(this.tick, 1000);
            this.resetTimer();
        }
    };

    selectVoice = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    testVoice = () => {
        const { voice, rate, pitch} = this.state;
        SpeechController.say('Obey the zombie', {voice, rate: rate / 10, pitch: pitch / 10});
    };

    loadParticipants = async () => {
        if (this.state.participantsUrl.length > 10) {
            try {
                const response = await fetch(this.state.participantsUrl);
                const data = await response.json();
                const participants = data.filter(d => d.status === STATUS_ACCEPTED).map(d => d.name);
                this.setState({ participants })
            } catch (exception) {
                console.error(`Failed to retrieve user informations: (${exception})`);
            }
        }
    };

    render() {
        const classes = {
            root: 'aaa',
            paper: 'bbb'
        };

        let voiceOptions = null;
        if (this.state.voices) {
            voiceOptions = this.state.voices.map(voice => {
                return <MenuItem key={voice.name} value={voice.name}>{voice.name}</MenuItem>
            });
        }

        return (
            <div id="ZombieApp">
                <ObeyTheZombie isVisible={this.state.displayObey}/>

                <Menu width={400}>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary">
                                Zombie voice settings
                            </Typography>
                            <InputLabel htmlFor="voice-select"></InputLabel>
                            <Select
                                value={this.state.voice}
                                onChange={this.selectVoice}
                                inputProps={{
                                    name: 'voice',
                                    id: 'voice-select',
                                }}
                            >
                                {voiceOptions}
                            </Select>
                            <br/>
                            <br/>
                            <Typography className={classes.title} color="textSecondary">
                                Pitch {this.state.pitch / 10}
                            </Typography>
                            <Slider min={0} max={20} value={ this.state.pitch } onChange={ this.handleSliderChange('pitch') }/>
                            <br/>
                            <Typography className={classes.title} color="textSecondary">
                                Rate {this.state.rate / 10}
                            </Typography>
                            <Slider min={1} max={100} value={ this.state.rate } onChange={ this.handleSliderChange('rate') }/>
                            <CardActions>
                                <Button size="small" onClick={this.testVoice}>Test voice</Button>
                            </CardActions>
                        </CardContent>
                    </Card>
                    <br/>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary">
                                Participants
                            </Typography>
                            <TextField
                                value={this.state.participants}
                                variant="raised" color="primary"
                                multiline
                                rows={10}
                                onChange={this.handleChangeTextField('participants')}
                                margin="none"
                            />
                            <TextField
                                variant="raised" color="primary"
                                margin="none"
                                label="Fetch from url"
                                onChange={this.handleChangeTextField('participantsUrl')}
                                value={this.state.participantsUrl}
                            />
                            <IconButton color="secondary" onClick={this.loadParticipants} className={classes.button} aria-label="Load participants">
                                <SvgIcon>
                                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                                </SvgIcon>
                            </IconButton>
                        </CardContent>
                    </Card>

                    <br/>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary">
                                Events
                            </Typography>

                            <div className={classes.root}>
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
                                        <Paper title="Minimum delay between events"
                                               className={classes.paper}>{this.state.minMaxDelay[0]} min.</Paper>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Paper title="Initial delay between events"
                                               className={classes.paper}>{this.state.minMaxDelay[1]} min.</Paper>
                                    </Grid>
                                </Grid>
                            </div>

                            <br/>
                            <Range onChange={this.adjustMinMaxDelay} allowCross={false}
                                   defaultValue={[this.state.minMaxDelay[0], this.state.minMaxDelay[1]]}
                                   min={1}
                                   max={20}
                                   format={this.formatter}/>
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
                    <br />

                    <Button onClick={this.toggleTimer} variant="raised" color="primary" className={classes.button}>
                        {this.state.countdownStartedAt ? 'Stop' : 'Start'}
                    </Button>
                    <br />
                    <Button onClick={this.fireEvent} variant="raised" color="primary" className={classes.button}>
                        Fire event
                    </Button>


                </Menu>
                <EventWriter event={this.state.currentEvent}/>
            </div>
        );
    }


}
