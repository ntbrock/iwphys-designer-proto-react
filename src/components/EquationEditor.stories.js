import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

// src/components/Task.stories.js

import EquationEditor from './EquationEditor';

export const equation = {
    expression: '1+1',
};

export const actions = {
    onEvaluated: action('onEvaluated'),
};

storiesOf('EquationEditor', module)
    .add('oneplusone', () => <EquationEditor expression={equation.expression} {...actions} />)


