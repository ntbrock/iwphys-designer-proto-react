import React from 'react';
import { Container, Row, Col } from 'reactstrap';

export default class IwpDesignerContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            animation: props.animation };


        console.log("IwpDesignerContainer:12> Incoming Animation: " , props.animation );

        // This binding is necessary to make `this` work in the callback
        this.onDesignChange = this.onDesignChange.bind(this);
    }

    /** Bubbles up from any design change */
    onDesignChange(event) {
        console.log("IwpDesignerContainer:19> Design Change: event: " , event);
    }


    render() {
        return (

            <Container>
                <Row>

                    {/* Object Tree */}
                    <Col md={2}>
                        <h3>Iwp Designer Container </h3>

                    </Col>

                    {/* Editor Panel */}

                    <Col md={10}>
                        <p>{JSON.stringify(this.props.animation)}</p>

                    </Col>

                </Row>

            </Container>

        );
    }
}