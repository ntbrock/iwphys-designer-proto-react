import React from 'react';
import update from "immutability-helper";

/**
 * Edit Author information
 */
export default class IwpTimeEditor extends React.Component {

    constructor(props) {
        super(props);

        // -------------- only thing to edit -----------------------
        let objectType = "time";


        // -------------- ------------------ -----------------------

        // Self-determine order
        let objectOrder = props.animation.objects.findIndex( o => o.objectType === objectType );
        let object = props.animation.objects[objectOrder];

        this.state = {
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

        console.log("IwpTimeEditor:39> onFieldChange, designCommand: " , designCommand );

        // Local State Management Immutable
        this.setState({object: update(this.state.object, designCommand ) });

        // Bubble Design Change Event
        this.props.onDesignChange('IwpTimeEditor', this.state.designRoute, designCommand);
    }



    render() {
        // eslint-disable-next-line no-unused-vars
        const objectType = this.state.objectType;

        return (
            <div className="iwp-{objectType}-editor">

                <h3>Time</h3>
                <div>
                    <div className="iwp-{objectType}-editor-field">
                        <label>Start</label>
                        <input type="text"
                               name="start"
                               value={this.state.object.start}
                               onChange={this.onFieldChange}/>
                    </div>

                    <div className="iwp-{objectType}-editor-field">
                        <label>Stop</label>
                        <input type="text"
                               name="stop"
                               value={this.state.object.stop}
                               onChange={this.onFieldChange}/>
                    </div>

                    <div className="iwp-{objectType}-editor-field">
                        <label>Change</label>
                        <input type="text"
                               name="change"
                               value={this.state.object.change}
                               readOnly={false}
                               onChange={this.onFieldChange}/>
                    </div>


                    <div className="iwp-{objectType}-editor-field">
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