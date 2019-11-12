import React from 'react';
import update from "immutability-helper";

/**
 * Time Editor
 * 2019Nov06 Refactored
 */

export default class IwpTimeEditor extends React.Component {

    constructor(props) {
        super(props);

        // -------------- Be sure to update these constants -----------------------

        let objectType = "time";
        let editorClass = "IwpTimeEditor";

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
        // 2019Nov12 Quick Fix to enable decimals
        const designCommand = { [event.target.name] : { $set : event.target.value } };
        const designCommandNumerical = { [event.target.name] : { $set : +event.target.value } };
        // console.log(this.state.editorClass + ":38> onFieldChange, designCommand: " , designCommand );

        // Local State Management Immutable
        this.setState({object: update(this.state.object, designCommand ) });

        // Bubble Design Change Event
        this.props.onDesignChange(this.state.editorClass, this.state.designRoute, designCommandNumerical);
    }



    render() {
        const objectType = this.state.objectType;

        return (
            <div className={"iwp-"+objectType+"-editor"}>

                <h3>Time Range</h3>
                <div>
                    <div className="iwp-editor-field">
                        <label>Start</label>
                        <input type="text"
                               name="start"
                               value={this.state.object.start}
                               onChange={this.onFieldChange}/>
                    </div>

                    <div className="iwp-editor-field">
                        <label>Duration</label>
                        <input type="text"
                               name="stop"
                               value={this.state.object.stop}
                               onChange={this.onFieldChange}/>
                    </div>

                    <div className="iwp-editor-field">
                        <label>Change</label>
                        <input type="text"
                               name="change"
                               value={this.state.object.change}
                               readOnly={false}
                               onChange={this.onFieldChange}/>
                    </div>


                    <div className="iwp-editor-field">
                        <label>Fps</label>
                        <input type="text"
                               name="fps"
                               value={this.state.object.fps}
                               readOnly={false}
                               onChange={this.onFieldChange}/>
                    </div>


                </div>

            </div>
        );
    }
}