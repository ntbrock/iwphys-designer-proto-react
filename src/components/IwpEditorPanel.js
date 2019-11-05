import React from 'react';
import IwpAuthorEditor from "./editors/IwpAuthorEditor";
import IwpSaveEditor from "./editors/IwpSaveEditor";
import IwpDescriptionEditor from "./editors/IwpDescriptionEditor";
import IwpWindowEditor from "./editors/IwpWindowEditor";
import IwpGraphWindowEditor from "./editors/IwpGraphWindowEditor";
import IwpTimeEditor from "./editors/IwpTimeEditor";
import IwpWelcomeEditor from "./editors/IwpWelcomeEditor";
import IwpObjectListEditor from "./editors/IwpObjectListEditor";
import IwpJsonViewEditor from "./editors/IwpJsonViewEditor";


export default class IwpEditorPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            animation: props.animation };


        // console.log("IwpEditorPanel:20> Incoming Animation: " , props.animation );

        // This binding is necessary to make `this` work in the callback
        this.onObjectClicked = this.onObjectClicked.bind(this);
    }

    /** Bubbles up from any design change */
    onObjectClicked(event) {
        if ( this.props.onObjectClicked ) { this.props.onObjectClicked(event); }
    }


    /** HANDLE NAVIGATION CLICKS **/

    render() {

        let focused = this.props.focusedFeature || this.props.focusedObject;

        let editor;

        if ( focused ) {

            // TODO Refactor combine all these into a 'settings' Editor.

            if ( focused === "author" ) {
                editor = <IwpAuthorEditor animation={this.props.animation} onDesignChange={this.props.onDesignChange}/>

            } else if ( focused === "save" ) {
                editor = <IwpSaveEditor animation={this.props.animation} unsavedChanges={this.props.unsavedChanges} onDesignChange={this.props.onDesignChange} onAnimationSave={this.props.onAnimationSave}/>

            } else if ( focused === "description" ) {
                editor = <IwpDescriptionEditor animation={this.props.animation} unsavedChanges={this.props.unsavedChanges} onDesignChange={this.props.onDesignChange} />

            } else if ( focused === "window" ) {
                editor = <IwpWindowEditor animation={this.props.animation} unsavedChanges={this.props.unsavedChanges} onDesignChange={this.props.onDesignChange} />

            } else if ( focused === "graphWindow" ) {
                editor = <IwpGraphWindowEditor animation={this.props.animation} unsavedChanges={this.props.unsavedChanges} onDesignChange={this.props.onDesignChange} />

            } else if ( focused === "time" ) {
                editor = <IwpTimeEditor animation={this.props.animation} unsavedChanges={this.props.unsavedChanges} onDesignChange={this.props.onDesignChange} />

            } else if ( focused === "inputs" ) {
                editor = <IwpObjectListEditor animation={this.props.animation}
                                          objectTypeLabel="Input"
                                          objectTypeFilter="input"
                                          unsavedChanges={this.props.unsavedChanges}
                                          onDesignChange={this.props.onDesignChange}
                                          onDesignAdd={this.props.onDesignAdd}
                                          onDesignRemove={this.props.onDesignRemove}
                                          onDesignReorder={this.props.onDesignReorder} />

            } else if ( focused === "outputs" ) {
                editor = <IwpObjectListEditor animation={this.props.animation}
                                          objectTypeLabel="Output"
                                          objectTypeFilter="output"
                                          unsavedChanges={this.props.unsavedChanges}
                                          onDesignChange={this.props.onDesignChange}
                                          onDesignAdd={this.props.onDesignAdd}
                                          onDesignRemove={this.props.onDesignRemove}
                                          onDesignReorder={this.props.onDesignReorder} />

            } else if ( focused === "solids" ) {
                editor = <IwpObjectListEditor animation={this.props.animation}
                                          objectTypeLabel="Solid"
                                          objectTypeFilter="solid"
                                          unsavedChanges={this.props.unsavedChanges}
                                          onDesignChange={this.props.onDesignChange}
                                          onDesignAdd={this.props.onDesignAdd}
                                          onDesignRemove={this.props.onDesignRemove}
                                          onDesignReorder={this.props.onDesignReorder}/>
            } else if ( focused === "json" ) {
                editor = <IwpJsonViewEditor animation={this.props.animation} animation0={this.props.animation0} />


            }
        }

        if ( ! editor ) {
            editor = <IwpWelcomeEditor animation={this.props.animation}/>
        }

        // console.log("IwpEditorPanel:36> Rendering props, focused: ", focused, "  editor.props: ", editor.props,  " animation: " , this.props.animation );

        return (

            <div>

                <h3>IWP Editor Panel</h3>
                <div className="iwp-editor-panel">
                {editor}
                </div>

            </div>

        );
    }
}