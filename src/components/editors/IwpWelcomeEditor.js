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

                <h5>Getting Started Quickly:</h5>
                <p>Use the <i>left sidebar</i> to navigate and create or edit your physics animation.</p>

                <p><strong>Preview</strong> your animation at any time in a new popup tab.</p>

                <p><strong>Save</strong> records your animation changes to our cloud server so that you can then share it with your audiences.</p>

                <p><strong>Settings</strong> enables you to change the time range, description, window, and graph coordinate systems.</p>

                <p><strong>Inputs</strong> allow your viewers to change certain parameters in your animation.</p>

                <p><strong>Outputs</strong> render calculations in numerical form with units to your users.</p>

                <p><strong>Solids</strong> render visual objects with motion, color, vectors, and trails.</p>

                <p><i>Json Differences</i> is a technical interface we use for testsing and debugging, showing the object structure of your entire animation.</p>


            </div>

        );
    }
}