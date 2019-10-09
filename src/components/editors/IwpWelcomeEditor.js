import React from 'react';


export default class IwpWelcomeEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            animation: props.animation
        };

    }

    render() {
        return (

            <div>

                <h3>Interactive Web Physics 6 Designer</h3>

                <br/>
                <p>Click any Feature or Object in the left list to get started editing!</p>

                <p>Inline guidance and help content will go here!</p>

                <p>2019Oct09 08:54 Preview Deployment</p>
            </div>

        );
    }
}