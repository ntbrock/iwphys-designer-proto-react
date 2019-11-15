import React from 'react';
import IwpDesignerContainer from "./IwpDesignerContainer";
import emptyAnimation from "../animations/EmptyAnimation";
import * as axios from "axios";
import * as config from "../config.json"

/**
 * Wrapper Component responsible for loading remote content before initializing designer
 */

export default class IwpDesignerLoader extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            animation: this.props.animation,
            failureMessage: undefined
        };
    }

    async componentDidMount() {

        const animationUrl = this.props.animationUrl;
        let animationFilename = this.props.animationFilename;
        const token = this.props.token;

        const axiosClient = axios.create({
            baseURL: config.api.baseURL,
            timeout: 5000,
            headers: {'X-Token': token}
         });

        console.log("IwpDesignerLoader:15> ComponentDidMount, animationUrl: " , animationUrl, "  animationFilename: ", animationFilename, " token: " , token );

        let animation = undefined;
        let failureMessage = undefined;

        // Method 1 - Load form URL
        if ( animationUrl !== undefined && animationUrl.length > 0 ) {

            const response = await axiosClient.get(animationUrl);

            if ( response.status >= 200 && response.status < 300 ) {
                animation = response.data;

                // Special case, when pullinig from URL, sest the last past as animationFilename

                const urlparts = animationUrl.split("/");
                if ( urlparts.length > 1 ) {

                    animationFilename = decodeURI(urlparts[urlparts.length-1]);
                    console.log("IwpDesignerLoaader:52> found AnimationFilename: " , animationFilename);
                }

            } else {
                failureMessage =  "Error Response " + response.status + " : " + JSON.stringify(response.data);
            }

        // Method 2 - Load from API call to user
        } else if ( animationFilename !== undefined && animationFilename.length > 0 ) {

            const response = await axiosClient.get("/designer/api1/json/" + encodeURI(animationFilename) );

            if ( response.status >= 200 && response.status < 300 ) {

                console.log("IwpDesignerLoader:65> REsponse good: ", response.data );

                animation = response.data;
            } else {
                failureMessage =  "Error Response " + response.status + " : " + JSON.stringify(response.data);
            }

        } else {

            animation = emptyAnimation();
        }

        // Default behavior, empty animation
        this.setState({
            animation: animation,
            failureMessage: failureMessage,
            animationFilename: animationFilename
        });

        // Do we have a token + filename?  try to get existing animation.

    }

    render() {


        if ( this.state.failureMessage !== undefined) {

            return (
                <div style={{width: "100%", padding: "3rem", textAlign: "center", color: "red"}}>
                    Failure Downloading Designer Animation: {this.state.failureMessage}
                </div>
            )

        } else if(this.state.animation === undefined ) {

            return (
                <div style={{width: "100%", padding: "3rem", textAlign: "center"}}>
                    Downloading Designer Animation...
                </div>
            )

        } else {

            return (
                <IwpDesignerContainer animation={this.state.animation}
                                      animationFilename={this.state.animationFilename}
                                      token={this.props.token} />

            )

        }

    }

}

