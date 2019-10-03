import React from 'react';
import { Container, Row, Col } from 'reactstrap';


export default class IwpDesignerWelcomePanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            animation: props.animation
        };

    }

    render() {
        return (

            <div>

                <h3>HOWTO Use IWP Designer</h3>

                <p>Click any Feature or Object in the left list to get started editing!</p>

                <p>Inline guidance and help content will go here!</p>

            </div>

        );
    }
}