## Zeating Zombie

Zeating Zombie is a party event app that is intended to get a party going by ordering the participants to
perform different tasks during the evening. The main character is an animated zombie head, that will scream
to get attention, then telling the selected participants what to do (using text and speech synthesis).

It is controlled by GUI that has the following settings:

- voice
- voice pitch
- voice rate
- list of participants (can be loaded from Keylane Event Manager API)
- enable/disable event types
- minimum delay between events
- maximum delay between events (initial)
- Start/stop - begin/end countdown till next event
- Fire Event - trigger event instantly

Every time an event has been triggered, the delay will be decreased by 1 minute until minimum delay has been reached.

## Frameworks used
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
Animation is created in Adobe Animate CC 2018 - the animation animation is running outside the React application.

Zeating Zombie is inspired by the work of Jonas Green.
