import React from 'react';
import './IwpInputEditor.css';
import EquationEditor from "./EquationEditor";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';


/**
 * Single Input Editor
 */

export default class IwpInputEditor extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            input: props.input };

        // This binding is necessary to make `this` work in the callback
        this.onFormChange = this.onFormChange.bind(this);
    }

    /* Generalized Form Handler for All Inputs */
    onFormChange(event) {
        let newInput = this.state.input;
        //----------------------
        // TODO Generalize this for all form fields
        const targetName = event.target.name;

        if (targetName ==="name") {
            newInput.name = event.target.value;

        } else if ( targetName === "initialValue" ) {
            newInput.initialValue = event.target.value;

        } else if ( targetName === "units" ) {
            newInput.units = event.target.value;

        } else if ( targetName === "hidden" ) {
            newInput.hidden = event.target.checked;

        } else {
            throw "IwpInputEditor:43> Unrecognized form field named: " + targetName;
        }

        //-----------------------

        this.setState( { input: newInput } );

        if (this.props.onDesignChange) {
            this.props.onDesignChange("objects.input[name="+newInput.name+"]", newInput);
        }
    }


    // Card Mode
    render() {
        // Shorthand
        const input = this.state.input;

        return (
            <div className="iwp-input-editor">

                <Card>
                    <CardBody>
                        <CardTitle><strong>Input</strong></CardTitle>
                    </CardBody>

                    <CardBody>
                        <div>
                            <label>Input Name</label>
                            <input type="text"
                                   name="name"
                                   value={input.name}
                                   readOnly={false}
                                   onChange={this.onFormChange}/>
                        </div>
                        <div>
                            <label>Input Equation</label>

                            <input type="text"
                                   name="initialValue"
                                   value={input.initialValue}
                                   readOnly={false}
                                   onChange={this.onFormChange}/>

                            {/*<EquationEditor expression={input.initialValue}/>*/}
                        </div>
                        <div>
                            <label>Units</label>
                            <input type="text"
                                   name="units"
                                   value={input.units}
                                   readOnly={false}
                                   onChange={this.onFormChange}/>
                        </div>
                        <div>
                            <label>Hidden</label>

                            <input
                                name="hidden"
                                type="checkbox"
                                checked={input.hidden}
                                onChange={this.onFormChange} />
                        </div>

                    </CardBody>
                </Card>
            </div>
        );
    }

    // Div Mode
    /*
    render() {
        return (
            <div className="iwp-input-editor">

                <div>
                    <label>Input Name</label>
                    <input type="text"
                           value={this.state.name}
                           readOnly={false}
                           onChange={this.onNameChange}/>
                </div>
                <div>
                    <label>Input Equation</label>
                    <EquationEditor expression={this.state.expression}/>
                </div>
            </div>
        );
    }
    */
}