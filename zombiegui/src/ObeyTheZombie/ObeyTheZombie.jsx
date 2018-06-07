import React from 'react';
import { Animated } from 'react-animated-css';
import obeyImage from './image/ObeyTheZombie.png';
import './ObeyTheZombie.css'

export default (props) => {
    return (
        <Animated animationIn="fadeInDown" animationOut="flipOutX" isVisible={props.isVisible}>
            <img className="ObeyTheZombie" src={obeyImage} alt=""/>
        </Animated>
    )
}