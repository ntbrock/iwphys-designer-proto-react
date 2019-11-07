import React from 'react';
import IwpSaveEditor from "./editors/IwpSaveEditor";
import IwpWelcomeEditor from "./editors/IwpWelcomeEditor";
import IwpObjectListEditor from "./editors/IwpObjectListEditor";
import IwpJsonViewEditor from "./editors/IwpJsonViewEditor";
import IwpSettingsEditor from "./editors/IwpSettingsEditor";


export default class IwpEditorPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};

        // D-Fence
        if (this.props.animationZero === undefined) {
            throw Error("IwpEditorPanel Defense: props.animationZero was not passed.");
        }
        if (!Array.isArray(this.props.animationUpdates)) {
            throw Error("IwpEditorPanel Defense: props.animationUpdates was not an array");
        }

        // console.log("IwpEditorPanel:20> Incoming Animation: " , props.animation );

        // This binding is necessary to make `this` work in the callback
        this.onObjectClicked = this.onObjectClicked.bind(this);
    }

    /** Bubbles up from any design change */
    onObjectClicked(event) {
        if (this.props.onObjectClicked) {
            this.props.onObjectClicked(event);
        }
    }


    /** HANDLE NAVIGATION CLICKS **/

    render() {

        let focused = this.props.focusedEditor;

        let editor;

        if (focused) {

            // TODO Refactor combine all these into a 'settings' Editor.


            if (focused === "save") {
                editor = <IwpSaveEditor animation={this.props.animation}
                                        animationUpdates={this.props.animationUpdates}
                                        animationFilename={this.props.animationFilename}
                                        onDesignChange={this.props.onDesignChange}
                                        onAnimationFilename={this.props.onAnimationFilename}
                                        onAnimationSave={this.props.onAnimationSave} />
            } else if (focused === "settings") {
                // Collapsed Author, Time, Description, etc down into a single editor
                editor = <IwpSettingsEditor {...this.props} />

            } else if (focused === "inputs") {
                editor = <IwpObjectListEditor objectTypeLabel="Input"
                                              objectTypeFilter="input"
                                              animation={this.props.animation}
                                              animationUpdates={this.props.animationUpdates}
                                              animationRerenderIncrement={this.props.animationRerenderIncrement}
                                              onDesignChange={this.props.onDesignChange}
                                              onDesignAdd={this.props.onDesignAdd}
                                              onDesignRemove={this.props.onDesignRemove}
                                              onDesignReorder={this.props.onDesignReorder}/>

            } else if (focused === "outputs") {
                editor = <IwpObjectListEditor objectTypeLabel="Output"
                                              objectTypeFilter="output"
                                              animation={this.props.animation}
                                              animationUpdates={this.props.animationUpdates}
                                              animationRerenderIncrement={this.props.animationRerenderIncrement}
                                              onDesignChange={this.props.onDesignChange}
                                              onDesignAdd={this.props.onDesignAdd}
                                              onDesignRemove={this.props.onDesignRemove}
                                              onDesignReorder={this.props.onDesignReorder}/>

            } else if (focused === "solids") {
                editor = <IwpObjectListEditor objectTypeLabel="Solid"
                                              objectTypeFilter="solid"
                                              animation={this.props.animation}
                                              animationUpdates={this.props.animationUpdates}
                                              animationRerenderIncrement={this.props.animationRerenderIncrement}
                                              onDesignChange={this.props.onDesignChange}
                                              onDesignAdd={this.props.onDesignAdd}
                                              onDesignRemove={this.props.onDesignRemove}
                                              onDesignReorder={this.props.onDesignReorder}/>

            } else if (focused === "json") {
                editor = <IwpJsonViewEditor animation={this.props.animation}
                                            animationZero={this.props.animationZero}
                                            animationUpdates={this.props.animationUpdates}
                                            animationRerenderIncrement={this.props.animationRerenderIncrement}/>


            }
        }

        if (!editor) {
            editor = <IwpWelcomeEditor animation={this.props.animation}/>
        }

        // console.log("IwpEditorPanel:36> Rendering props, focused: ", focused, "  editor.props: ", editor.props,  " animation: " , this.props.animation );

        return (

            <div className="iwp-editor-panel">
                {editor}
            </div>
        );
    }
}