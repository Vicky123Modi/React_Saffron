import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import * as animationData from "./NotFound";
import Lottie from 'react-lottie';
import './NotFound.css';

export default class NotFound extends Component {

    moveHome = () => {
        browserHistory.push("/");
    };

    render() {

        const defaultOptions = {
            loop: true,
            autoplay: true,
            animationData: animationData,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
            }
        };

        return (
            <div>
                <Lottie options={defaultOptions} height={400} width={320}/>
                <div className="text-center">
                <button className="btn button_error px-2" onClick={this.moveHome}>Go to Homepage</button>
                </div>
            </div>
        );
    }
}


