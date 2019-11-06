import React from 'react';
import './IwpInputEditor.css';
// import EquationEditor from "./EquationEditor";
import { Card, CardBody, CardTitle, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsAltV } from '@fortawesome/free-solid-svg-icons'


/**
 * Single Input Editor contained by the generically typed IwpObjectListEditor
 */

export default class IwpInputEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // 2019Nov06_0820 Build the design route consistently on construction of component.
            designRoute: [ "objects", "name", props.input.name ],
            input: JSON.parse(JSON.stringify(props.input))
        };

        // This binding is necessary to make `this` work in the callback
        this.onFormChange = this.onFormChange.bind(this);
        this.onRemove = this.onRemove.bind(this);
    }

    onFormChange(event) {
        const targetName = event.target.name;

        // Local State Management
        let newInput = this.state.input;
        newInput[targetName] = event.target.value; // NOte that this mutatess the global state!
        this.setState({input: newInput});

        // Bubble Design Change Event
        const designCommand = { [targetName] : { $set : event.target.value } };
        if (this.props.onDesignChange) {
            this.props.onDesignChange(this.state.designRoute, designCommand);
        }

    }



    onRemove(event) {
        console.log("IwpInputEditor:59> Removal event: " , event);

        if (this.props.onDesignRemove) {
            this.props.onDesignRemove("objects.input[name="+this.state.input.name+"]", this.state.input);
        }
    }


    // Card Mode
    render() {
        // Shorthand
        const input = this.state.input;

        return (
            <div className="iwp-input-editor">
                <form id="iwp-output-{this.state.output.name}">
                <Card className="iwp-editor-card">
                    <CardBody className="iwp-input-card-header">
                        <CardTitle className="drag-handle">
                            <strong>Input</strong>

                            &nbsp; &nbsp;
                            <FontAwesomeIcon icon={faArrowsAltV} />

                            <Button style={{float: "right"}} onClick={this.onRemove} size="sm">Remove</Button>
                        </CardTitle>
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
                            <label>Input Text</label>
                            <input type="text"
                                   name="text"
                                   value={input.text}
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
                </form>
            </div>
        );
    }


}