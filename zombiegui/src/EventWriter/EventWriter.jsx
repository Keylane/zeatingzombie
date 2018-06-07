import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-animated-css';
import './EventWriter.css';
import { SWAP_SEATS, MAKE_TOAST } from "../Event";

export default class EventWriter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            previousEvent: null
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.event) {
            return {
                previousEvent: props.event
            };
        }
        return null;
    }

    render() {
        let eventComponent = null;
        let event = this.props.event;
        let animateInOut = event !== null;
        if (!event && this.state.previousEvent) {
            event = this.state.previousEvent;
            animateInOut = false
        }
        if (event) {
            switch (event.type) {
                case SWAP_SEATS: {
                    eventComponent = (
                        <div className="EventWriter">
                            <div>{`${event.persons[0].name} and ${event.persons[1].name}`}</div>
                            <div>swap seats</div>
                        </div>);
                    break;
                }
                case MAKE_TOAST: {
                    eventComponent = (
                        <div className="EventWriter">
                            <div>{`${event.persons[0].name}`}</div>
                            <div>Make a toast at your table</div>
                        </div>);
                    break;
                }
                default:
                    break;
            }
        }

        return <Animated animationIn="fadeIn" animationOut="flipOutX" isVisible={animateInOut}>
                   {eventComponent}
               </Animated>
    }

    static propTypes = {
        event: PropTypes.object
    }
}