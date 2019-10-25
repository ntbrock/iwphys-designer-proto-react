import React from 'react';
import './IwpInputEditor.css';
// import EquationEditor from "./EquationEditor";
import { Card, CardBody, CardTitle, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsAltV } from '@fortawesome/free-solid-svg-icons'
import IwpCalculatorEditor from "./IwpCalculatorEditor";


/**
 * Single Output Editor
 */

export default class IwpOutputEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = { output: props.output };

        // This binding is necessary to make `this` work in the callback
        this.onFormChange = this.onFormChange.bind(this);
        this.onRemove = this.onRemove.bind(this);
    }

    /* Generalized Form Handler for All Inputs */
    onFormChange(event) {
        let newOutput = this.state.output;
        //----------------------
        // Generalized for all form fields
        const targetName = event.target.name;
        newOutput[targetName] = event.target.value;

        //-----------------------

        this.setState( { output: newOutput } );

        if (this.props.onDesignChange) {
            this.props.onDesignChange("objects.output[name="+newOutput.name+"]", newOutput);
        }
    }

    onRemove(event) {
        console.log("IwpOutputEditor:59> Removal event: " , event);

        if (this.props.onDesignRemove) {
            this.props.onDesignRemove("objects.output[name="+this.state.output.name+"]", this.state.output);
        }
    }


    // Card Mode
    render() {
        // Shorthand
        const output = this.state.output;

        return (
            <div className="iwp-output-editor">
                <form id="iwp-output-{this.state.output.name}">
                <Card className="iwp-editor-card">
                    <CardBody className="iwp-output-card-header">
                        <CardTitle className="drag-handle">
                            <strong>Output</strong>

                            &nbsp; &nbsp;
                            <FontAwesomeIcon icon={faArrowsAltV} />

                            <Button style={{float: "right"}} onClick={this.onRemove} size="sm">Remove</Button>
                        </CardTitle>
                    </CardBody>

                    <CardBody>
                        <div>
                            <label>Output Name</label>
                            <input type="text"
                                   name="name"
                                   value={output.name}
                                   readOnly={false}
                                   onChange={this.onFormChange}/>
                        </div>
                        <div>
                            <label>Text</label>
                            <input type="text"
                                   name="text"
                                   value={output.text}
                                   readOnly={false}
                                   onChange={this.onFormChange}/>
                        </div>

                        <div>
                            <label>Calculator</label>
                            <div className="iwp-editor-card-field">

                            <IwpCalculatorEditor calculator={output.calculator} onDesignChange={this.props.onDesignChange} />

                            </div>

                        </div>
                        <div>
                            <label>Units</label>
                            <input type="text"
                                   name="units"
                                   value={output.units}
                                   readOnly={false}
                                   onChange={this.onFormChange}/>
                        </div>
                        <div>
                            <label>Hidden</label>

                            <input
                                name="hidden"
                                type="checkbox"
                                checked={output.hidden}
                                onChange={this.onFormChange} />
                        </div>

                    </CardBody>
                </Card>
                </form>
            </div>
        );
    }


}