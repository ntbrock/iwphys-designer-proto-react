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


        // This binding is necessary to make `this` work in the callback
        this.evaluate = this.evaluate.bind(this);
    }


    evaluate(e) {
        console.log("EquationEditor:26> evaluatee, e: ", e ); // this.state: " ,  this.state );


        this.setState((state,props) => ({ evaluation: 2 }));

        // this.setState({ evaluation: 2 });

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