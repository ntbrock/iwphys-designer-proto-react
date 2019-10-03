import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

// src/components/Task.stories.js

import EquationEditor from './EquationEditor';

export const equation = {
    id: '1',
    equation: '1+1',
    state: 'CREATED',
    updatedAt: new Date(2018, 0, 1, 9, 0),
};

export const actions = {
    onComputeTask: action('onComputeTask'),
};

storiesOf('EquationEditor', module)
    .add('default', () => <EquationEditor equation={equation} {...actions} />)
    .add('error', () => <EquationEditor equation={{ ...equation, state: 'ERROR' }} {...actions} />)
    .add('success', () => <EquationEditor equation={{ ...equation, state: 'SUCCESS' }} {...actions} />);


