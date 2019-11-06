import React from 'react';
import update from "immutability-helper";

/**
 * GraphWindow Editor
 * 2019Nov06 Refactored
 */
export default class IwpGraphWindowEditor extends React.Component {

    constructor(props) {
        super(props);

        // -------------- Be sure to update these constants -----------------------

        let objectType = "graphWindow";
        let editorClass = "IwpGraphWindowEditor";

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

                <h3>Graph Window</h3>
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

                    <br/>

                    <div className="iwp-editor-field">

                    <label>Y Min</label>
                        <input type="text"
                               value={this.state.object.ymin}
                               readOnly={false}
                               name="ymin"
                               onChange={this.onFieldChange}/>
                    </div>
                    <div className="iwp-editor-field">

                    <label>Y Max</label>
                        <input type="text"
                               value={this.state.object.ymax}
                               readOnly={false}
                               name="ymax"
                               onChange={this.onFieldChange}/>
                    </div>
                    <div className="iwp-editor-field">

                    <label>Y Grid</label>
                        <input type="text"
                               value={this.state.object.ygrid}
                               readOnly={false}
                               name="ygrid"
                               onChange={this.onFieldChange}/>
                    </div>


                </div>

            </div>
        );
    }
}