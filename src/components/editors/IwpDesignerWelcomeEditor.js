import React from 'react';


export default class IwpDesignerWelcomeEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            animation: props.animation
        };

    }

    render() {
        return (

            <div>

                <br/>

                <h3>Interactive Web Physics 6 - Designer</h3>

                <p>Click any Feature or Object in the left list to get started editing!</p>

                <p>Inline guidance and help content will go here!</p>

            </div>

        );
    }
}