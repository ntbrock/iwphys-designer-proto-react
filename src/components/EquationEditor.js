import React from 'react';

// src/components/EquationEditor.js
// The first component enables equation editing, inline validation, and output preview
// Math.js


export default function EquationEditor({ equation: { id, expression, state }, onComputeTask }) {

    console.log("EquationEditor:10> equation expression: " , expression);


    return (
        <div className="equation-editor">
            <input type="text" value={expression} readOnly={false} onChange={() =>

                console.log("EquationEditor:17> Changed value!")
            }/>
        </div>
    );
}