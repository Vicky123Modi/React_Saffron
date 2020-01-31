import React, {Component} from 'react';
import $ from "jquery";
import Lottie from 'react-lottie';
import * as animationData from './loader'

export default class Loader extends Component {
    componentWillMount() {
        $("body").addClass("loadingSuccess");
    }

    componentWillUnmount() {
        $("body").removeClass("loadingSuccess");
    }

    render() {
        const defaultOptions = {
            loop: false,
            autoplay: true,
            animationData: animationData,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
            }
        };

        return (
            <div className="loadingPanel">
                <Lottie options={defaultOptions} height={400} width={400}/>
            </div>
        )
    }
}
