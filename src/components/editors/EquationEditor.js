import React from 'react';
import { create, all } from 'mathjs';
import './EquationEditor.css';

// src/components/EquationEditor.js
// The first component enables equation editing, inline validation, and output preview
// Math.js

export default class EquationEditor extends React.Component {

    math = create(all);

    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            expression: props.expression,
            evaluation: undefined,
            exception: undefined };

        // This binding is necessary to make `this` work in the callback
        this.evaluate = this.evaluate.bind(this);
    }

    componentDidMount() {
        this.evaluate();
    }

    evaluate(event) {

        let newExpression = this.state.expression;

        // Store the new expression if user edits
        if (event) {
            const target = event.target;
            console.log("EquationEditor:26> evaluatee, target: ", target); // this.state: " ,  this.state );

            this.setState((state, props) => ({expression: target.value}));
            newExpression = target.value;
        }



        const CONFIG_evaluationOn = false;

        if ( CONFIG_evaluationOn ) {

            // Perform Mathematical Calculation

            try {
                let evaluatedTo = 0;
                // Zero out empty expressions
                if (newExpression) {
                    evaluatedTo = this.math.evaluate(newExpression);
                }
                this.setState((state, props) => ({evaluation: evaluatedTo, exception: undefined}));

                // Notify listener
                if (this.props.onEvaluated) {
                    this.props.onEvaluated(evaluatedTo);
                }
            } catch (x) {

                this.setState((state, props) => ({evaluation: undefined, exception: x + ""}));

                // console.log("EquationEditor:58> Exception in calculation: " , x );

            }
        }


        // Bubble Event up component stack
        // console.log("EquationEditor:65> On Form Change: for event: ", event, "  onFormChange: ", this.props.onFormChange );

        if ( this.props.onFormChange && event ) {
            this.props.onFormChange(event);
        }

    }

    render() {
        return (
            <span className="equation-editor">
                <input type="text"
                       name={this.props.name}
                       value={this.state.expression === undefined ? '' : this.state.expression}
                       readOnly={false}
                       onChange={this.evaluate}/>

                <span className="equation-evaluation">{JSON.stringify(this.state.evaluation)}</span>
                <span className="equation-exception">{this.state.exception}</span>
            </span>
        );
    }
}