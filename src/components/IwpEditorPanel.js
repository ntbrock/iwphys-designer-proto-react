import React from 'react';
import IwpAuthorEditor from "./editors/IwpAuthorEditor";
import IwpSaveEditor from "./editors/IwpSaveEditor";
import IwpDesignerWelcomeEditor from "./editors/IwpDesignerWelcomeEditor";


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

        let focused = this.props.focusedFeature || this.props.focusedObject;

        let editor;

        if ( focused ) {

            if ( focused === "author" ) {
                editor = <IwpAuthorEditor animation={this.props.animation} onDesignChange={this.props.onDesignChange}/>
            } else if ( focused === "save" ) {

                editor = <IwpSaveEditor animation={this.props.animation} unsavedChanges={this.props.unsavedChanges} onDesignChange={this.props.onDesignChange} onAnimationSave={this.props.onAnimationSave}/>

            }
        }

        if ( ! editor ) {
            editor = <IwpDesignerWelcomeEditor animation={this.props.animation}/>
        }


        return (

            <div>

                <h3>IWP Editor Panel</h3>

                {editor}

            </div>

        );
    }
}