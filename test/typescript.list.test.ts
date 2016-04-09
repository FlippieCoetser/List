/// <reference path="../typings/main.d.ts" />
import chai = require("chai");
import sinon = require("sinon");
import sinonChai = require("sinon-chai");
let should = chai.should();
chai.use(sinonChai);

import {Event, IEvent, IListener} from "../src/typescript.events";

describe("Events", () => {
    it("Event should have static default limit of 10 listerens", () => {
       Event.defaultMaxListeners.should.eql(10);
    });
    it("Return event max listeners limit when no event instance listener limit set", () => {
        let Output: IEvent = new Event();
        let Limit: number = Event.defaultMaxListeners;
        Output.getMaxListeners().should.eql(Limit);
    });
    it("Correctly set and get event instance listener Limit", () => {
       let Output: IEvent = new Event();
       let Limit: number = 5;
       Output.setMaxListeners(Limit);
       Output.getMaxListeners().should.eql(Limit);
    });
    it("Return false when no listener found for defined event", () => {
       let Output: IEvent = new Event();
       let Response: Boolean = Output.emit("event");
       Response.should.eql(false);
    });
    it("Return true when a listener is found for defined event", () => {
       let Output: IEvent = new Event();
       let event: string = "event";
       let listener: IListener = () => { return; };
       Output.on(event, listener);
       let Response: boolean = Output.emit("event");
       Response.should.eql(true);
    });
    it("Return correct number of listeners for defined event", () => {
       let Output: IEvent = new Event();
       let Listeners: number = null;
       let event: string = "event";
       let listenerOne: IListener = () => { return; };
       let listenerTwo: IListener = () => { return; };
       Output.on(event, listenerOne);
       Output.on(event, listenerTwo);
       Listeners = Output.listenerCount(event);
       Listeners.should.eql(2);
    });
    it("Return all listeners for defined event", () => {
       let Output: IEvent = new Event();
       let ArrayListeners: Array<IListener> = [];
       let event: string = "event";
       let listenerOne: IListener = () => { return; };
       let listenerTwo: IListener = () => { return; };
       Output.on(event, listenerOne);
       Output.on(event, listenerTwo);
       ArrayListeners = Output.listeners(event);
       ArrayListeners[0].should.eql(listenerOne);
       ArrayListeners[1].should.eql(listenerTwo);
    });
    it("Should invoke event's listener on event.emit ", () => {
        let Output: IEvent = new Event();
        let listener = sinon.spy();
        let event: string = "event";
        Output.on(event, listener);
        Output.emit(event);
        listener.should.have.been.called;
    });
    it("Should invoke event's listener when listener added with event.addListener on event.emit ", () => {
        let Output: IEvent = new Event();
        let listener = sinon.spy();
        let event: string = "event";
        Output.addListener(event, listener);
        Output.emit(event);
        listener.should.have.been.called;
    });
    it("Should Invoke event's listener with message on event.emit with message", () => {
       let Output: IEvent = new Event();
       let listener = sinon.spy();
       let event: string = "event";
       Output.on(event, listener);
       Output.emit(event, "Message");
       listener.should.have.been.calledWith("Message");
    });
    it("Should not Invoke event's listener on different event.emit", () => {
       let Output: IEvent = new Event();
       let listener = sinon.spy();
       let event: string = "event";
       Output.on(event, listener);
       Output.emit(event + "2");
       listener.should.not.have.been.called;
    });
    it("Should Invole event's listner only once when event.once on event.emit", () => {
        let Output: IEvent = new Event();
        let listener = sinon.spy();
        let event: string = "event";
        Output.once(event, listener);
        Output.emit(event);
        Output.emit(event);
        listener.should.have.been.calledOnce;
    });
    it("Should not Invoke any listeners of an event when all listeners was removed", () => {
       let Output: IEvent = new Event();
       let listenerOne = sinon.spy();
       let listenerTwo = sinon.spy();
       let event: string = "event";
       Output.on(event, listenerOne);
       Output.on(event, listenerTwo);
       Output.removeAllListeners(event);
       Output.emit(event);
       listenerOne.should.not.have.been.called;
       listenerTwo.should.not.have.been.called;
    });
    it("Should not invoke a listener of an event when the listener was removed", () => {
       let Output: IEvent = new Event();
       let listenerOne = sinon.spy();
       let listenerTwo = sinon.spy();
       let event: string = "event";
       Output.on(event, listenerOne);
       Output.on(event, listenerTwo);
       Output.removeListener(event, listenerOne);
       Output.emit(event);
       listenerOne.should.not.have.been.called;
       listenerTwo.should.have.been.called;
    });
    it("Should not add new listener to event when max instance listener limit reached", () => {
       let Output: IEvent = new Event();
       let Limit: number = 1;
       let listenerOne = sinon.spy();
       let listenerTwo = sinon.spy();
       let event: string = "event";
       Output.setMaxListeners(Limit);
       Output.on(event, listenerOne);
       Output.on(event, listenerTwo);
       Output.listenerCount(event).should.eql(1);
    });
    it("Should not add new listener to event when max event listener limit reached", () => {
       let Output: IEvent = new Event();
       let Limit: number = 1;
       let listenerOne = sinon.spy();
       let listenerTwo = sinon.spy();
       let event: string = "event";
       Event.defaultMaxListeners = Limit;
       Output.on(event, listenerOne);
       Output.on(event, listenerTwo);
       Output.listenerCount(event).should.eql(1);
    });
});
