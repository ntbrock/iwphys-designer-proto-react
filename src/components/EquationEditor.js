import React from 'react';

// src/components/EquationEditor.js
// The first component enables equation editing, inline validation, and output preview
// Math.js

export default class EquationEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            expression: props.expression,
            evaluation: undefined };

        console.log("EquationEditor:16> props: " , props);


        // This binding is necessary to make `this` work in the callback
        this.evaluate = this.evaluate.bind(this);

    }

    componentDidMount() {
        this.evaluate();
    }
    

    evaluate() {
        //console.log("EquationEditor:26> evaluatee, e: ", e ); // this.state: " ,  this.state );

        let evaluatedTo = 2;

        this.setState((state,props) => ({ evaluation: evaluatedTo }));

        // Notify listener
        if(this.props.onEvaluated) {  this.props.onEvaluated(evaluatedTo); }

    }

    render() {
        return (
            <div className="equation-editor">
                <input type="text"
                       value={this.state.expression}
                       readOnly={false}
                       onChange={this.evaluate}/>

                <span>{this.state.evaluation}</span>
            </div>
        );
    }
}