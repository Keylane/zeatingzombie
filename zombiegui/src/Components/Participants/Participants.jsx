import React, {Component} from 'react';
import PropTypes from "prop-types";
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import SvgIcon from '@material-ui/core/SvgIcon';

const PARTICIPANT_STATUS = {
    ACCEPTED: 1
};

export default class Participants extends Component {

    constructor(props) {
        super(props);
        this.state = {
            participantsUrl: props.participantsUrl,
        }
    }

    loadParticipants = async () => {
        if (this.state.participantsUrl.length > 10) {
            try {
                const response = await fetch(`https://cors-anywhere.herokuapp.com/${this.state.participantsUrl}`, {
                    headers: {
                        'Origin': 'http://cozy.keylane.dk/'
                    },
                });
                const data = await response.json();
                const participants = data.filter(d => d.status === PARTICIPANT_STATUS.ACCEPTED).map(d => d.name);
                this.props.updateParticipants(participants);
            } catch (exception) {
                console.error(`Failed to retrieve user informations: (${exception})`);
            }
        }
    };

    participantsTextFieldChanged = (event) => {
        this.props.updateParticipants(event.target.value.split(/[\n,]+/));
    };

    handleChangeTextField = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        return <CardContent>
            <Typography color="textSecondary">
                Participants
            </Typography>
            <TextField
                value={this.props.participants}
                variant="raised"
                color="primary"
                multiline
                rows={10}
                onChange={this.participantsTextFieldChanged}
                margin="none"
            />
            <TextField
                variant="raised" color="primary"
                margin="none"
                label="Fetch from url"
                onChange={this.handleChangeTextField('participantsUrl')}
                title={this.state.participantsUrl}
                value={this.state.participantsUrl}
            />
            <IconButton color="secondary" onClick={this.loadParticipants} aria-label="Load participants">
                <SvgIcon>
                    <path
                        d="M21 3.01H3c-1.1 0-2 .9-2 2V9h2V4.99h18v14.03H3V15H1v4.01c0 1.1.9 1.98 2 1.98h18c1.1 0 2-.88 2-1.98v-14c0-1.11-.9-2-2-2zM11 16l4-4-4-4v3H1v2h10v3z"/>
                </SvgIcon>
            </IconButton>
        </CardContent>
    }

    static propTypes = {
        updateParticipants: PropTypes.func.isRequired,
        participantsUrl: PropTypes.string,
        participants: PropTypes.arrayOf(PropTypes.string)
    }
}