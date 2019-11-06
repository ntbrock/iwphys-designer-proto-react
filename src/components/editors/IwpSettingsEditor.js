import React from 'react';
import IwpDescriptionEditor from "./IwpDescriptionEditor";
import IwpWindowEditor from "./IwpWindowEditor";
import IwpGraphWindowEditor from "./IwpGraphWindowEditor";
import IwpTimeEditor from "./IwpTimeEditor";
import IwpAuthorEditor from "./IwpAuthorEditor";
import { Row, Col } from 'reactstrap';


/**
 * Collection of sub editors for all the settings
 */
export default class IwpSettingsEditor extends React.Component {

    /* Useless constructor warning.
    constructor(props) {
        super(props);
    }
    */

    render() {
        return (
            <div className="iwp-settings-editor">

                <Row>
                    <Col md={6}>
                        <IwpAuthorEditor {...this.props} />
                    </Col>
                    <Col md={6}>
                        <IwpTimeEditor {...this.props} />
                    </Col>
                </Row>

                <Row>
                    <Col md={12}>
                <IwpDescriptionEditor {...this.props} />
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <IwpWindowEditor {...this.props} />
                    </Col>
                    <Col md={6}>
                        <IwpGraphWindowEditor {...this.props} />
                    </Col>
                </Row>

            </div>
        );
    }
}