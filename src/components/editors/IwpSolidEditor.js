import React from 'react';
import './IwpInputEditor.css';
import { SketchPicker } from 'react-color';
import {Button, Card, CardBody, CardTitle} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowsAltV} from "@fortawesome/free-solid-svg-icons";
import IwpCalculatorEditor from "./IwpCalculatorEditor";

export default class IwpSolidEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {solid: props.solid};

        if (! props.designRoute) {
            throw Error("IwpCalculatorEditor called with no designRoute prop")
        }
        if (! props.onDesignChange) {
            throw Error("IwpCalculatorEditor called with no onDesignChange prop")
        }

        // This binding is necessary to make `this` work in the callback
        this.onColorChange = this.onColorChange.bind(this);
        this.onFormChange = this.onFormChange.bind(this);
    }


    onColorChange(color, event) {

        console.log("IwpSolidEdiitor:28> Received color: " , color);

        let newSolid = this.state.solid;

        newSolid.color.red = color.rgb.r;
        newSolid.color.green = color.rgb.g;
        newSolid.color.blue = color.rgb.b;
        newSolid.color.alpha = color.rgb.a;

        this.setState( { solid: newSolid } );

        if (this.props.onDesignChange) {
            this.props.onDesignChange(this.props.designRoute, newSolid);
        }
    }


    /* Generalized Form Handler for All Solids */
    onFormChange(event) {
        let newSolid = this.state.solid;
        //----------------------
        // Generalized for all form fields
        const targetPath = event.target.name.split(".");

        // TODO Refactor this to use immutable helper 'update'
        // TODO The calculators use a different ID sesparator
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

        // newSolid[targetName] = event.target.value;

        //-----------------------
        // These can be properties nested with a .


        //

        this.setState( { solid: newSolid } );

        if (this.props.onDesignChange) {
            this.props.onDesignChange(this.props.designRoute, newSolid);
        }
    }


    render() {

        //shorthand
        const solid = this.state.solid;


        return (
            <div className="iwp-solid-editor">
                <form id="iwp-solid-{this.state.solid.name}">
                <Card className="iwp-editor-card">
                    <CardBody className="iwp-solid-card-header">
                        <CardTitle className="drag-handle">
                            <strong>Solid</strong>

                            &nbsp; &nbsp;
                            <FontAwesomeIcon icon={faArrowsAltV} />

                            <Button style={{float: "right"}} onClick={this.onRemove} size="sm">Remove</Button>
                        </CardTitle>
                    </CardBody>

                    <CardBody>

                        <div>
                            <label>Name</label>
                            <input type="text"
                                   name="name"
                                   value={solid.name}
                                   onChange={this.onFormChange}/>
                        </div>

                        <div>

                            <label>X Path</label>
                            <div className="iwp-editor-card-field">
                                <IwpCalculatorEditor designRoute={this.props.designRoute+".xpath.calculator"} calculator={solid.xpath.calculator} onDesignChange={this.props.onDesignChange} />
                            </div>

                        </div>


                        <div>
                            <label>Y Path</label>
                            <div className="iwp-editor-card-field">
                                <IwpCalculatorEditor designRoute={this.props.designRoute+".ypath.calculator"} calculator={solid.ypath.calculator} onDesignChange={this.props.onDesignChange} />
                            </div>

                        </div>

                        <div>
                            <label>Shape</label>

                            <div className="iwp-editor-card-field">

                                <input type="text" name="shape.shapeType" value={solid.shape.shapeType} onChange={this.onFormChange}/> TODO:ddl

                                <br/>


                                <label>Height</label>
                                <IwpCalculatorEditor designRoute={this.props.designRoute+".shape.height"} calculator={solid.shape.height.calculator} onDesignChange={this.props.onDesignChange} />

                                <br/>

                                <label>Width</label>
                                <IwpCalculatorEditor designRoute={this.props.designRoute+".shape.width"} calculator={solid.shape.width.calculator} onDesignChange={this.props.onDesignChange} />

                                <br/>

                                <label>
                                    Graphable?
                                </label>
                                <input type="text" name="shape.isGraphable" value={solid.shape.isGraphable} onChange={this.onFormChange}/>

                                <br/>

                                <label>
                                    Draw Trails?
                                </label>
                                <input type="text" name="shape.drawTrails" value={solid.shape.drawTrails} onChange={this.onFormChange}/>

                                <br/>

                                <label>
                                    Draw Vectors?
                                </label>
                                <input type="text" name="shape.drawVectors" value={solid.shape.drawVectors} onChange={this.onFormChange}/>

                                <br/>
                                <i>Shape TODO: GraphOptions, Vectors, (Complex SubTables)</i>


                                <label>Color</label>

                                <input type="text"
                                       value={this.state.solid.color.red + " " + this.state.solid.color.green + " " + this.state.solid.color.blue }
                                       readOnly={true}
                                       onChange={this.onColorChange}/>
                                <SketchPicker color={this.state.solid.color} onChangeComplete={this.onColorChange}/>

                            </div>
                        </div>

                    </CardBody>
                </Card>

                </form>

            </div>
        );
    }
}