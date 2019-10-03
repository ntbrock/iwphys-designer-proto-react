import React from 'react';
import './IwpInputEditor.css';
import EquationEditor from "./EquationEditor";

// src/components/EquationEditor.js
// The first component enables equation editing, inline validation, and output preview
// Math.js

export default class IwpInputEditor extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            expression: props.expression };

        // This binding is necessary to make `this` work in the callback
        this.onNameChange = this.onNameChange.bind(this);
    }

    onNameChange(event) {

        this.setState( { name: event.target.value } );

    }


    render() {
        return (
            <div className="iwp-input-editor">
                <label>Input Name</label>
                <input type="text"
                       value={this.state.name}
                       readOnly={false}
                       onChange={this.onNameChange}/>

                <label>Input Equation</label>
                <EquationEditor expression={this.state.expression}/>

            </div>
        );
    }
}