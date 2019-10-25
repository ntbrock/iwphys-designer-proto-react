import React from 'react';
import './IwpInputEditor.css';
import { SketchPicker } from 'react-color';
import {Button, Card, CardBody, CardTitle} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowsAltV} from "@fortawesome/free-solid-svg-icons";

export default class IwpSolidEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {solid: props.solid};

        // This binding is necessary to make `this` work in the callback
        this.onNameChange = this.onNameChange.bind(this);
        this.onColorChange = this.onColorChange.bind(this);
    }

    onNameChange(event) {

        this.setState( { name: event.target.value } );

    }

    onColorChange(color, event) {

        console.log("IwpSolidEdiitor:28> Received color: " , color);
        this.setState( { color: color.hex } );
    }


    render() {
        return (
            <div className="iwp-solid-editor">
                <form id="iwp-output-{this.state.output.name}">
                <Card className="iwp-editor-card">
                    <CardBody className="iwp-solid-card-header">
                        <CardTitle className="drag-handle">
                            <strong>Input</strong>

                            &nbsp; &nbsp;
                            <FontAwesomeIcon icon={faArrowsAltV} />

                            <Button style={{float: "right"}} onClick={this.onRemove} size="sm">Remove</Button>
                        </CardTitle>
                    </CardBody>

                    <CardBody>

                        <div>
                            <label>Name</label>
                            <input type="text"
                                   value={this.state.solid.name}
                                   readOnly={false}
                                   onChange={this.onNameChange}/>
                        </div>

                        <div>
                            <label>Xpath</label>

                            <pre>
                            Calculator
                            </pre>

                        </div>


                        <div>
                            <label>YPath</label>

                            <pre>
                             Calculator
                            </pre>

                        </div>

                        <div>
                            <label>Shape</label>

                            <pre>
                            Shape Type
                            vectors
                            width
                            height
                            graphable
                            trails?
                            vectors?
                            </pre>

                        </div>


                        <div>
                            <label>Color</label>
                            <input type="text"
                                   value={this.state.solid.color}
                                   readOnly={true}
                                   onChange={this.onColorChange}/>
                            <SketchPicker color={this.state.solid.color} onChangeComplete={this.onColorChange}/>
                        </div>


                    </CardBody>
                </Card>

                </form>

            </div>
        );
    }
}