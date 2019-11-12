import React from 'react';
import update from "immutability-helper";

/**
 * Window Editor
 * 2019Nov06 Refactored
 */
export default class IwpWindowEditor extends React.Component {

    constructor(props) {
        super(props);

        // -------------- Be sure to update these constants -----------------------

        let objectType = "window";
        let editorClass = "IwpWindowEditor";

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

                <h3>Window</h3>
                <div>
                    <div className="iwp-editor-field">
                        <label>X Min</label>
                        <input type="text"
                               value={this.state.object.xmin}
                               name="xmin"
                               onChange={this.onFieldChange}/>
                    </div>

                    <div className="iwp-editor-field">
                        <label>X Max</label>
                        <input type="text"
                               value={this.state.object.xmax}
                               name="xmax"
                               onChange={this.onFieldChange}/>
                        </div>

                    <div className="iwp-editor-field">
                        <label>X Grid</label>
                        <input type="text"
                               value={this.state.object.xgrid}
                               name="xgrid"
                               onChange={this.onFieldChange}/>
                        </div>

                    <div className="iwp-editor-field">
                        <label>X Unit</label>
                        <input type="text"
                               value={this.state.object.xunit}
                               name="xunit"
                               onChange={this.onFieldChange}/>
                        </div>

                    <br/>

                    <div className="iwp-editor-field">
                        <label>Y Min</label>
                        <input type="text"
                               value={this.state.object.ymin}
                               name="ymin"
                               onChange={this.onFieldChange}/>
                    </div>

                    <div className="iwp-editor-field">
                        <label>Y Max</label>
                        <input type="text"
                               value={this.state.object.ymax}
                               name="ymax"
                               onChange={this.onFieldChange}/>
                    </div>

                    <div className="iwp-editor-field">
                        <label>Y Grid</label>
                        <input type="text"
                               value={this.state.object.ygrid}
                               name="ygrid"
                               onChange={this.onFieldChange}/>
                    </div>

                    <div className="iwp-editor-field">
                        <label>Y Unit</label>
                        <input type="text"
                               value={this.state.object.yunit}
                               name="yunit"
                               onChange={this.onFieldChange}/>
                    </div>


                </div>

            </div>
        );
    }
}