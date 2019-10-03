import React from 'react';
import './IwpInputEditor.css';
import { SketchPicker } from 'react-color';

export default class IwpSolidEditor extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            color: props.color,
            expression: props.expression };

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
            <div className="iwp-input-editor">

                <div>
                    <label>Solid Name</label>
                    <input type="text"
                           value={this.state.name}
                           readOnly={false}
                           onChange={this.onNameChange}/>
                </div>

                <div>
                   <label>Solid Color</label>
                    <input type="text"
                           value={this.state.color}
                           readOnly={true}
                           onChange={this.onColorChange}/>
                    <SketchPicker color={this.state.color} onChangeComplete={this.onColorChange}/>
                </div>

            </div>
        );
    }
}