// src/components/Task.js

import React from 'react';

export default function EquationEditor({ task: { id, equation, state }, onArchiveTask, onPinTask }) {
    return (
        <div className="equation-editor">
            <input type="text" value={equation} readOnly={false} />
        </div>
    );
}