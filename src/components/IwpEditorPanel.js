import React from 'react';


export default class IwpEditorPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            animation: props.animation };


        console.log("IwpDesignerContainer:12> Incoming Animation: " , props.animation );

        // This binding is necessary to make `this` work in the callback
        this.onObjectClicked = this.onObjectClicked.bind(this);
    }

    /** Bubbles up from any design change */
    onObjectClicked(event) {
        if ( this.props.onObjectClicked ) { this.props.onObjectClicked(event); }
    }


    render() {
        return (

            <div>

                <h3>IWP Editor Panel</h3>

                <p>Focused Feature : {this.props.focusedFeature}</p>

                <p>Focused Object : {this.props.focusedObject}</p>


            </div>

        );
    }
}