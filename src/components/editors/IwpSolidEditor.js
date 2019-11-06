import React from 'react';
import './IwpInputEditor.css';
import { SketchPicker } from 'react-color';
import {Button, Card, CardBody, CardTitle} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowsAltV} from "@fortawesome/free-solid-svg-icons";
import IwpCalculatorEditor from "./IwpCalculatorEditor";
import update from "immutability-helper";


/**
 * Single Solid Editor contained by the generically typed IwpObjectListEditor
 * 2019Nov06 Refactor - Object Order is the new key so that editing the name keep focus.
 */

export default class IwpSolidEditor extends React.Component {

    constructor(props) {

        super(props);

        // D-Fence
        if ( props.objectOrder === undefined ) { throw Error("IwpInputEditor props missing 'objectOrder'")}
        if ( props.onDesignRemove === undefined ) { throw Error("IwpInputEditor props missing 'onDesignRemove'")}
        if ( props.onDesignChange === undefined ) { throw Error("IwpInputEditor props missing 'onDesignChange'")}


        // -------------- Be sure to update these constants -----------------------

        let objectType = "solid";
        let editorClass = "IwpSolidEditor";

        // -------------- ------------------ -----------------------

        // Parent Determines Order
        let objectOrder = props.objectOrder;
        let object = props.animation.objects[objectOrder];

        this.state = {
            editorClass: editorClass,
            objectType: objectType,
            objectOrder: objectOrder,
            object: object,
            designRoute: [ "objects", "order", objectOrder ]
        };

        // This binding is necessary to make `this` work in the callback
        this.onFieldChange = this.onFieldChange.bind(this);
        this.onRemove = this.onRemove.bind(this);
        this.onColorChange = this.onColorChange.bind(this);
        this.onCalculatorChange = this.onCalculatorChange.bind(this);
    }



/*  Initial Logic Pass, Graveyard this code soon
    onFormChange(event) {
        let newSolid = this.state.solid;
        const targetPath = event.target.name.split(".");
        let solidFeature = newSolid;
        let targetName = targetPath.shift();

        let iterations = 5;
        while( targetPath.length > 0 && iterations > 0 ) {
            solidFeature = solidFeature[targetName];
            targetName = targetPath.shift();
            iterations--;
        }

        // Finally, once we've walked, write the target value
        solidFeature[targetName] = event.target.value;
        console.log("IwpSolidEditor:43> Finally Assigning TargetNAme: " , targetName, "  TargetPath: " ,  event.target.value,   "  Resulting newSolid:", newSolid );

        this.setState( { solid: newSolid } );
    }
 */
    /** Handle Field Changes Super Generically 2019Nov06 */
    onFieldChange(event) {

        // Special Checkbox Logic
        let value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;

        // console.log("IwpInputEditor:56> onFieldChange: event.target.name: ", event.target.name, "  event.target.value : " , event.target.value, " value: " ,value );

        const designCommand = { [event.target.name] : { $set : value } };
        // console.log(this.state.editorClass + ":38> onFieldChange, designCommand: " , designCommand );

        // Local State Management Immutable
        this.setState({object: update(this.state.object, designCommand ) });

        // Bubble Design Change Event
        this.props.onDesignChange(this.state.editorClass, this.state.designRoute, designCommand);
    }

    onRemove(event) {
        // console.log("IwpInputEditor:59> Removal event: " , event, "  on objectOrder: " , this.props.objectOrder );
        this.props.onDesignRemove(this.state.editorClass, ["objects"], { $splice: [[this.props.objectOrder, 1]] });
    }


    dotNotationToFeature(path, finalValue) {
        // The vivification that kolodny talks about
        let topFeature = {};
        let feature = topFeature;
        const parts = path.split(".");
        const partsLength = parts.length-1;
        // nesty
        parts.map((part,i) => {
            if ( i < partsLength || finalValue === undefined ) {
                feature[part] = {};
                feature = feature[part];
            } else {
                // At the end, set the value i defined
                feature[part] = finalValue;
            }
            return part; // identity map
        });
        return topFeature;
    }

    onCalculatorChange(feature, calculator) {

        // const designCommand = {[feature]: {$set: calculator}};

        const designCommand = this.dotNotationToFeature(feature, { $set: calculator } );

        console.log("IwpSolidEditor:127> onCalculatorChange: feature: " , feature,  "  newCalculator", calculator,  "  designRoute: " , this.state.designRoute,  " designCommand: " , designCommand );

        // Bubble Calculator Change Event
        this.props.onDesignChange(this.state.editorClass, this.state.designRoute, designCommand);
    }




    onColorChange(color, event) {

        console.log("IwpSolidEdiitor:28> Received color: " , color);

        const newColor = {
            red: color.rgb.r,
            green: color.rgb.g,
            blue: color.rgb.b,
            alpha: color.rgb.a
        };

        const designCommand = { color : { $set : newColor } };

        // Local State Management Immutable
        this.setState({object: update(this.state.object, designCommand ) });

        // Bubble Design Change Event
        this.props.onDesignChange(this.state.editorClass, this.state.designRoute, designCommand);
    }




    render() {

        const objectType = this.state.objectType;
        const object = this.state.object;

        return (
            <div className={"iwp-"+objectType+"-editor"}>
                <form id={"iwp-"+objectType+"-order-"+this.state.objectOrder}>
                    <Card className="iwp-editor-card">
                    <CardBody className="iwp-card-header">
                        <CardTitle className="drag-handle">
                            <strong>Solid</strong>

                            &nbsp; &nbsp;
                            <FontAwesomeIcon icon={faArrowsAltV} />

                            <Button style={{float: "right"}} onClick={this.onRemove} size="sm">Remove</Button>
                        </CardTitle>
                    </CardBody>

                    <CardBody>

                        <div>
                            <label>Solid Name</label>
                            <input type="text"
                                   name="name"
                                   value={object.name}
                                   onChange={this.onFieldChange}/>
                        </div>

                        <div>

                            <label>X Path</label>
                            <div className="iwp-editor-card-field">
                                <IwpCalculatorEditor feature='xpath.calculator'
                                                     calculator={object.xpath.calculator}
                                                     onCalculatorChange={this.onCalculatorChange} />

                            </div>

                        </div>


                        <div>
                            <label>Y Path</label>
                            <div className="iwp-editor-card-field">
                                <IwpCalculatorEditor feature='ypath.calculator'
                                                     calculator={object.ypath.calculator}
                                                     onCalculatorChange={this.onCalculatorChange} />

                            </div>

                        </div>

                        <div>
                            <label>Shape</label>

                            <div className="iwp-editor-card-field">

                                <input type="text"
                                       name="shape.shapeType"
                                       value={object.shape.shapeType}
                                       onChange={this.onFieldChange}/> TODO:ddl

                                <br/>


                                <label>Height</label>
                                <IwpCalculatorEditor feature='shape.height'
                                                     calculator={object.shape.height.calculator}
                                                     onCalculatorChange={this.onCalculatorChange} />
                                <br/>

                                <label>Width</label>

                                <IwpCalculatorEditor feature='shape.width'
                                                     calculator={object.shape.width.calculator}
                                                     onCalculatorChange={this.onCalculatorChange} />

                                <br/>

                                <label>
                                    Graphable?
                                </label>
                                <input type="text" name="shape.isGraphable" value={object.shape.isGraphable} onChange={this.onFieldChange}/>

                                <br/>

                                <label>
                                    Draw Trails?
                                </label>
                                <input type="text" name="shape.drawTrails" value={object.shape.drawTrails} onChange={this.onFieldChange}/>

                                <br/>

                                <label>
                                    Draw Vectors?
                                </label>
                                <input type="text" name="shape.drawVectors" value={object.shape.drawVectors} onChange={this.onFieldChange}/>

                                <br/>
                                <i>Shape TODO: GraphOptions, Vectors, (Complex SubTables)</i>


                                <label>Color</label>

                                <input type="text"
                                       value={object.color.red + " " + object.color.green + " " + object.color.blue }
                                       readOnly={true}
                                       onChange={this.onColorChange}/>
                                <SketchPicker color={object.color} onChangeComplete={this.onColorChange}/>

                            </div>
                        </div>

                    </CardBody>
                </Card>

                </form>

            </div>
        );
    }
}