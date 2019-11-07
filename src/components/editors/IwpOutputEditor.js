import React from 'react';
import './IwpInputEditor.css';
// import EquationEditor from "./EquationEditor";
import { Card, CardBody, CardTitle, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsAltV } from '@fortawesome/free-solid-svg-icons'
import IwpCalculatorEditor from "./IwpCalculatorEditor";
import update from "immutability-helper";

/**
 * Single Output Editor
 * 2019Nov06 Refactor - Object Order is the new key so that editing the name keep focus.
 */

export default class IwpOutputEditor extends React.Component {

    constructor(props) {

        super(props);

        // D-Fence
        if (props.objectOrder === undefined) {
            throw Error("IwpOutputEditor props missing 'objectOrder'")
        }
        if (props.onDesignRemove === undefined) {
            throw Error("IwpOutputEditor props missing 'onDesignRemove'")
        }
        if (props.onDesignChange === undefined) {
            throw Error("IwpOutputEditor props missing 'onDesignRemove'")
        }


        // -------------- Be sure to update these constants -----------------------

        let objectType = "output";
        let editorClass = "IwpOutputEditor";

        // -------------- ------------------ -----------------------

        // Parent Determines Order
        let objectOrder = props.objectOrder;
        let object = props.animation.objects[objectOrder];

        this.state = {
            editorClass: editorClass,
            objectType: objectType,
            objectOrder: objectOrder,
            object: object,
            designRoute: ["objects", "order", objectOrder]
        };

        // This binding is necessary to make `this` work in the callback
        this.onFieldChange = this.onFieldChange.bind(this);
        this.onCalculatorChange = this.onCalculatorChange.bind(this);
        this.onRemove = this.onRemove.bind(this);
    }


    /** Handle Field Changes Super Generically 2019Nov06 */
    onFieldChange(event) {
        // Special Checkbox + Number Logic
        let value = event.target.type === 'checkbox' ? event.target.checked : ( event.target.type === 'number' ? +event.target.value : event.target.value );

        // console.log("IwpOutputEditor:56> onFieldChange: event.target.name: ", event.target.name, "  event.target.value : " , event.target.value, " value: " ,value );

        const designCommand = {[event.target.name]: {$set: value}};
        // console.log(this.state.editorClass + ":38> onFieldChange, designCommand: " , designCommand );

        // Local State Management Immutable
        this.setState({object: update(this.state.object, designCommand)});

        // Bubble Design Change Event
        this.props.onDesignChange(this.state.editorClass, this.state.designRoute, designCommand);
    }


    onCalculatorChange(feature, calculator) {
        console.log("IwpOutputEditor:61> onCalculatorChange: feature: " , feature, " newCalculator", calculator );

        const designCommand = {[feature]: {$set: calculator}};

        // Bubble Calculator Change Event
        this.props.onDesignChange(this.state.editorClass, this.state.designRoute, designCommand);
    }

    onRemove(event) {
        // console.log("IwpOutputEditor:59> Removal event: " , event, "  on objectOrder: " , this.props.objectOrder );
        this.props.onDesignRemove(this.state.editorClass, ["objects"], {$splice: [[this.props.objectOrder, 1]]});
    }


    // Card Mode
    render() {
        const objectType = this.state.objectType;

        return (
            <div className={"iwp-" + objectType + "-editor"}>
                <form id={"iwp-"+objectType+"-order-"+this.state.objectOrder}>
                    <Card className="iwp-editor-card">
                        <CardBody className="iwp-card-header">
                            <CardTitle className="drag-handle">
                                <strong>Output</strong>

                                &nbsp; &nbsp;
                                <FontAwesomeIcon icon={faArrowsAltV}/>

                                <Button style={{float: "right"}} onClick={this.onRemove} size="sm">Remove</Button>
                            </CardTitle>
                        </CardBody>


                        <CardBody>
                            <div>
                                <label>Output Name</label>
                                <input type="text"
                                       name="name"
                                       value={this.state.object.name}
                                       onChange={this.onFieldChange}/>
                            </div>


                            <div>
                                <label>Text</label>
                                <input type="text"
                                       name="text"
                                       value={this.state.object.text}
                                       onChange={this.onFieldChange}/>
                            </div>

                            <div>
                                <label>Calculator</label>
                                <div className="iwp-editor-card-field">
                                    <IwpCalculatorEditor feature='calculator'
                                                         designRoute={this.state.designRoute}
                                                         calculator={this.state.object.calculator}
                                                         onCalculatorChange={this.onCalculatorChange}/>
                                </div>

                            </div>

                            <div>
                                <label>Units</label>
                                <input type="text"
                                       name="units"
                                       value={this.state.object.units}
                                       onChange={this.onFieldChange}/>
                            </div>
                            <div>
                                <label>Hidden</label>

                                <input
                                    name="hidden"
                                    type="checkbox"
                                    checked={this.state.object.hidden}
                                    onChange={this.onFieldChange}/>
                            </div>


                        </CardBody>
                    </Card>
                </form>
            </div>
        );
    }

}