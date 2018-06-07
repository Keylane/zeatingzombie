export const SWAP_SEATS = 1;
export const MAKE_TOAST = 2;

export default class Event {
    constructor(type, persons) {
        this.type = type;
        this.persons = persons;
    }
}