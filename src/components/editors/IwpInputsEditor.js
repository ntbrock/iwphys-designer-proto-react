import React from 'react';
import update from "immutability-helper";
import IwpInputEditor from "./IwpInputEditor";

/**
 * Edit Author information
 */
export default class IwpInputsEditor extends React.Component {

    constructor(props) {
        super(props);

        const inputs = props.animation.objects.filter( (o) => o.objectType === "input" )

        this.state = {
            inputs: inputs
        };

        // This binding is necessary to make `this` work in the callback
        this.onFieldChange = this.onFieldChange.bind(this);

    }

    /** TODO Handle Field Changes Generically */
    onFieldChange(event) {
        let feature = event.target.attributes['feature'].value;
        let value = event.target.value;

        console.log("IwpWindowEditor:29> feature: " , feature, "  value:", value);

        this.setState( { window : update(this.state.window, {[feature]: {$set: value}}) } );

        if(this.props.onDesignChange) {
            this.props.onDesignChange("objects.window."+feature, value )
        }
    }



    render() {

        let inputsDom = this.state.inputs.map( (feature, i) => {
                const input = this.state.inputs[i];

                console.log("IpwInputsEditor:45> inputs: ", this.state.inputs, "  input: " , input);

                return (
                    <div className="iwp-input-editor-field">
                        <IwpInputEditor name={input.name} expression={input.initialValue}/>
                        <br/>
                        <br/>
                    </div>
                )
            }
        )


        return (
            <div className="iwp-inputs-editor">

                <h3>Inputs</h3>


                <div>

                    {inputsDom}

                </div>

            </div>
        );
    }
}