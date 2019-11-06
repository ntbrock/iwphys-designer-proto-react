import React from 'react';
import EquationEditor from "./EquationEditor";

/**
 * IwpCalculatorEditor
 * 2019Nov06 Refactor
 * Congrats for making it here! This is where it all ties together.
 */

export default class IwpCalculatorEditor extends React.Component {

    constructor(props) {
        super(props);

        // D-Fence
        if ( props.feature === undefined ) { throw Error("IwpInputEditor props missing 'feature'")}
        if ( props.calculator === undefined ) { throw Error("IwpInputEditor props missing 'calculator'")}
        if ( props.onCalculatorChange === undefined ) { throw Error("IwpInputEditor props missing 'onCalculatorChange'")}

        this.state = {
            calculator: this.props.calculator
        };

        // This binding is necessary to make `this` work in the callback
        this.onFormChange = this.onFormChange.bind(this);
    }

    /* Generalized Form Handler for All Inputs */
    onFormChange(event) {

        let newCalculator = this.state.calculator;

        // Generalized for all form fields
        const targetName = event.target.name;

        // Targetnames remain globally unique so radiobuttons don't step on each other.
        // TODO Note the solid subobject recursion is slightly different.
        const targetParts = targetName.split(".");
        const subTargetName = targetParts[targetParts.length - 1];

        newCalculator[subTargetName] = event.target.value;

        console.log("IwpCalculatorEditor:36> onFormChange: targetName : ", targetName, "  subTargetName: " , subTargetName , " value: " , event.target.value);

        this.setState( { calculator: newCalculator } );

        // 2019Nov06 Let my editor interpret the event into a Design Change on my behalf
        this.props.onCalculatorChange(this.props.feature, newCalculator);
    }


    render() {
        // Shorthand
        const calc = this.state.calculator;
        let equationForm = undefined;

        if ( calc.calcType === "parametric") {

            equationForm = (
                <EquationEditor name="value" expression={calc.value} onFormChange={this.onFormChange}/>
            )

        } else if ( calc.calcType === "euler" ) {

            equationForm = (
                <div>

                    <div>
                        <label>Init Disp</label>
                        <EquationEditor name="displacement" expression={calc.displacement} onFormChange={this.onFormChange}/>
                    </div>
                    <div>
                        <label>Init Vel</label>
                        <EquationEditor name="velocity" expression={calc.velocity} onFormChange={this.onFormChange}/>
                    </div>
                    <div>
                        <label>Accel</label>
                        <EquationEditor name="acceleration" expression={calc.acceleration} onFormChange={this.onFormChange}/>
                    </div>
                </div>

            )

        } else {

            throw Error("IwpCalculatorEditor: 42> Unsupported calcType: " + this.props.calculator.calcType )
        }



        return (

            <div className="iwp-calculator-editor">

                <div className="iwp-editor-card-field">
                    <label>
                        <input type="radio" name={this.props.designRoute+".calcType"} value="parametric" onChange={this.onFormChange} checked={calc.calcType==="parametric"  }/>
                        &nbsp; Parametric
                    </label>

                    <label>
                        <input type="radio" name={this.props.designRoute+".calcType"} value="euler" onChange={this.onFormChange}  checked={calc.calcType==="euler" }/>
                        &nbsp; Euler
                    </label>
                </div>

                <div className="iwp-editor-card-field">

                {equationForm}

                </div>

            </div>

        )

    }

}