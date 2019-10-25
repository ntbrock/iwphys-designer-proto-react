import React from 'react';
import EquationEditor from "./EquationEditor";

/**
 * Congrats for making it here! This is where it all ties together.
 */

export default class IwpCalculatorEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {calculator: props.calculator};

        // This binding is necessary to make `this` work in the callback
        this.onFormChange = this.onFormChange.bind(this);
    }

    /* Generalized Form Handler for All Inputs */
    onFormChange(event) {
        let newCalculator = this.state.calculator;
        //----------------------
        // Generalized for all form fields
        const targetName = event.target.name;
        newCalculator[targetName] = event.target.value;

        this.setState( { calculator: newCalculator } );

        if (this.props.onDesignChange) {
            console.log("IwpCalculatorEditor:28> TODO How do we bubble this onDesignChange event up? We need to know our parent object? ")
        }
    }

    render() {
        // Shorthand
        const calc = this.state.calculator;
        let equationForm = undefined;

        if ( calc.calcType === "parametric") {

            equationForm = (
                <EquationEditor expression={calc.value}/>
            )

        } else if ( calc.calcType === "euler" ) {

            equationForm = (
                <div>

                    <div>
                        Init Disp: <EquationEditor expression={calc.displacement}/>
                    </div>
                    <div>
                    Init Vel: <EquationEditor expression={calc.velocity}/>
                    </div>
                    <div>
                        Accel: <EquationEditor expression={calc.acceleration}/>
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
                        <input type="radio" name="calcType" value="parametric" onChange={this.onFormChange} checked={calc.calcType==="parametric"  }/>
                        &nbsp; Parametric
                    </label>

                    <label>
                        <input type="radio" name="calcType" value="euler" onChange={this.onFormChange}  checked={calc.calcType==="euler" }/>
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