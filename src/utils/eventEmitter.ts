import EventEmitter from "events";

/**
 * Creates an instance of the EventEmitter class, which is used to handle custom events.
 * This instance can be used to emit and listen for events throughout the application.
 */
const emitter = new EventEmitter();

export default emitter;