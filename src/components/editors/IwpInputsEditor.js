import React from 'react';
import update from "immutability-helper";
import IwpInputEditor from "./IwpInputEditor";
import { Button } from 'reactstrap';


/**
 * Edit Author information
 */
export default class IwpInputsEditor extends React.Component {

    constructor(props) {
        super(props);

        console.log("IwpInputsEditor:15> inccoming animation: ", props.animation );


        // This binding is necessary to make `this` work in the callback
        this.onFieldChange = this.onFieldChange.bind(this);
        this.onAddInput = this.onAddInput.bind(this);

    }

    /** TODO Handle Field Changes Generically */
    onFieldChange(event) {
        let feature = event.target.attributes['feature'].value;
        let value = event.target.value;

        console.log("IwpWindowEditor:29> feature: " , feature, "  value:", value);

        this.setState( { window : update(this.state.window, {[feature]: {$set: value}}) } );

        if(this.props.onDesignChange) {
            this.props.onDesignChange("objects.inputs["+feature+"]", value )
        }
    }

    onAddInput(event) {

        console.log("IwpInputEditor:42> onAddInput: event: " , event);

        let feature = "input1"; // Todo Make sure INput doesn't conflict
        if(this.props.onDesignAdd) {
            this.props.onDesignAdd("objects.input", { objectType: "input", name: feature, hidden: false, initialValue: 0, text: "", units: "" })
        }
    }


    render() {

        console.log("IwpInputsEditor:51> props: ", this.props );
        const inputs = this.props.animation.objects.filter( (o) => o.objectType === "input" );


        let inputsDom = inputs.map( (feature, i) => {
                const input = inputs[i];

                console.log("IpwInputsEditor:45> inputs: ", inputs, "  input: " , input);


                return (
                    <div className="iwp-input-editor-field" key={input.name}>
                        <IwpInputEditor input={input} onDesignChange={this.props.onDesignChange}/>
                        <br/>
                        <br/>
                    </div>
                )


            }
        )


        return (
            <div className="iwp-inputs-editor">

                <h3>Inputs</h3>

                <div className="iwp-editor-control-buttons">
                <Button onClick={this.onAddInput}>Add New Input</Button>
                </div>

                <div>

                    {inputsDom}

                </div>

            </div>
        );
    }
}