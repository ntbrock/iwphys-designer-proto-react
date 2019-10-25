import React from 'react';
import EquationEditor from "./EquationEditor";

/**
 * Congrats for making it here! This is where it all ties together.
 */

export default class IwpCalculatorEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {calculator: props.calculator};


        if (! props.designRoute) {
            throw Error("IwpCalculatorEditor called with no designRoute prop")
        }

        if (! props.onDesignChange) {
            throw Error("IwpCalculatorEditor called with no onDesignChange prop")
        }

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


        console.log("IwpCalculatorEditor:36> onFormChange: targetName : ", targetName, "  value: " , event.target.value);

        this.setState( { calculator: newCalculator } );

        if (this.props.onDesignChange) {
            this.props.onDesignChange(this.props.designRoute+".calculator", newCalculator);
        }

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