import React from "react";
import { Component } from "react";

export class CurrentDate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date: new Date().toDateString(),
        };
    } 

    render() {
        return (
            <span>{this.state.date}</span>
        );
    }
}
