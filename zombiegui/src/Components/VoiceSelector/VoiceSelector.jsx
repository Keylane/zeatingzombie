import React, {Component} from 'react';
import PropTypes from "prop-types";
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Slider, {Range} from 'rc-slider';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import SpeechController from "../../Controllers/SoundController/SoundController";

export default class VoiceSelector extends Component {

    constructor(props) {
        super(props);
        this.state = { voices: [] };
        (async () => {
            const voices = await SpeechController.listVoices();
            this.setState({voices});
        })();

    }

    testVoice = () => {
        const { voice, rate, pitch} = this.props;
        SpeechController.say('This is the zombie speaking', {voice, rate: rate / 10, pitch: pitch / 10});
    };

    render() {
        let voiceOptions = null;
        if (this.state.voices) {
            voiceOptions = this.state.voices.map(voice => {
                return <MenuItem key={voice.name} value={voice.name}>{voice.name}</MenuItem>
            });
        }

        return <CardContent>
            <Typography color="textSecondary">
                Zombie voice settings
            </Typography>
            <InputLabel htmlFor="voice-select"></InputLabel>
            <Select
                value={this.props.voice}
                onChange={this.props.selectVoice}
                inputProps={{
                    name: 'voice',
                    id: 'voice-select',
                }}
            >
                {voiceOptions}
            </Select>
            <br/>
            <br/>
            <Typography color="textSecondary">
                Pitch {this.props.pitch / 10}
            </Typography>
            <Slider min={0} max={20} value={ this.props.pitch } onChange={ this.props.handleSliderChange('pitch') }/>
            <br/>
            <Typography color="textSecondary">
                Rate {this.props.rate / 10}
            </Typography>
            <Slider min={1} max={100} value={ this.props.rate } onChange={ this.props.handleSliderChange('rate') }/>
            <CardActions>
                <Button size="small" onClick={this.testVoice}>Test voice</Button>
            </CardActions>
        </CardContent>
    }

    static propTypes = {
        voice: PropTypes.string,
        pitch: PropTypes.number,
        rate: PropTypes.number,
        selectVoice: PropTypes.func.isRequired,
        handleSliderChange: PropTypes.func.isRequired
    }
}