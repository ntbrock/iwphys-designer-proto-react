import React from 'react';
// Rich Text in descriptions would be a cool upgrade one day!
// import {Editor, EditorState, ContentState} from 'draft-js';
import update from "immutability-helper";

/**
 * Description Editor
 */
export default class IwpDescriptionEditor extends React.Component {


    constructor(props) {
        super(props);

        // -------------- Be sure to update these constants -----------------------

        let objectType = "description";
        let editorClass = "IwpDescriptionEditor";

        // -------------- ------------------ -----------------------

        // Self-determine order
        let objectOrder = props.animation.objects.findIndex( o => o.objectType === objectType );
        let object = props.animation.objects[objectOrder];

        this.state = {
            editorClass: editorClass,
            objectType: objectType,
            object: object,
            designRoute: [ "objects", "order", objectOrder ]
        };

        // This binding is necessary to make `this` work in the callback
        this.onFieldChange = this.onFieldChange.bind(this);
    }


    /** Handle Field Changes Super Generically 2019Nov06 */
    onFieldChange(event) {
        const designCommand = { [event.target.name] : { $set : event.target.value } };
        // console.log(this.state.editorClass + ":38> onFieldChange, designCommand: " , designCommand );

        // Local State Management Immutable
        this.setState({object: update(this.state.object, designCommand ) });

        // Bubble Design Change Event
        this.props.onDesignChange(this.state.editorClass, this.state.designRoute, designCommand);
    }



    render() {
        const objectType = this.state.objectType;

        return (
            <div className={"iwp-"+objectType+"-editor"}>

                <h3>Description</h3>
                <textarea value={this.state.object.text} name="text" onChange={this.onFieldChange} />

            </div>
        );
    }
}