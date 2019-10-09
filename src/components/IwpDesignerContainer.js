import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import update from 'immutability-helper';

import IwpObjectList from "./IwpObjectList";
import IwpEditorPanel from "./IwpEditorPanel";

/**
 * Focused OBject is what's being editied. When user clicks, the focused object changes.
 *
 */

export default class IwpDesignerContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            animation: props.animation,
            unsavedChanges: {},
            focusedFeature: undefined,
            focusedObject: undefined,
        };

        console.log("IwpDesignerContainer:12> Incoming Animation: " , props.animation );

        // This binding is necessary to make `this` work in the callback
        this.onDesignChange = this.onDesignChange.bind(this);
        this.onDesignAdd = this.onDesignAdd.bind(this);
        this.onDesignRemove = this.onDesignRemove.bind(this);
        this.onAnimationSave = this.onAnimationSave.bind(this);
        this.onObjectClicked = this.onObjectClicked.bind(this);
        this.onFeatureClicked = this.onFeatureClicked.bind(this);
    }

    /** Bubbles up from any design change */
    onDesignChange(feature, value) {
        console.log("IwpDesignerContainer:19> Design Change: event: ", feature, "  value: ", value, " to ss");
        this.setState({
            unsavedChanges: update(this.state.unsavedChanges, {[feature]: {$set: value}})
        });
    }

    /** Bubbles up from any design change */
    onDesignAdd(feature, value) {
        console.log("IwpDesignerContainer:43> Design Add: feature: ", feature, "  value: ", value, " to ss");

        // manipulate animation state, then pass that back down
        let animation = this.state.animation;

        if ( feature === "objects.input" ) {

            animation.objects = update(animation.objects, {$push: [value] });

            console.log("IwpDesignerContainer:54> new animation: " , animation);
            this.setState({
               animation: animation
            })

            // TODO update unsaved changes

        } else {
            throw "onDesignAdd: unrecognized feature: '"+feature+ "'";
        }
    }

    /** Bubbles up from any design change */
    onDesignRemove(feature, value) {
        console.log("IwpDesignerContainer:49> Design Remove: event: ", feature, "  value: ", value, " to ss");
    }



    onAnimationSave(event) {
        this.setState({
            unsavedChanges: {}
        })
    }


    onObjectClicked(object, event) {
        console.log("IwpDesignerContainer:28> Object Click Event: object: " , object, " event: " , event);
        this.setState( { focusedObject: object, focusedFeature: undefined })
    }

    onFeatureClicked(feature, event) {
        console.log("IwpDesignerContainer:39> Feature Click Event: feature: " , feature, "  event: " , event);
        this.setState( { focusedObject: undefined, focusedFeature: feature })
    }




    render() {

        console.log("IwpDesignerController:95> Rendering state animation: " , this.state.animation );

        return (

            <Container>
                <Row>

                    {/* Object Tree */}
                    <Col md={3}>
                        <h3>IWP Designer</h3>

                        <IwpObjectList
                            animation={this.state.animation}
                            unsavedChanges={this.state.unsavedChanges}
                            onDesignChange={this.onDesignChange}
                            onFeatureClicked={this.onFeatureClicked}
                            onObjectClicked={this.onObjectClicked} />

                    </Col>

                    {/* Editor Panel */}

                    <Col md={9}>

                        <IwpEditorPanel animation={this.state.animation}
                                        unsavedChanges={this.state.unsavedChanges}
                                        focusedFeature={this.state.focusedFeature}
                                        focusedObject={this.state.focusedObject}
                                        onDesignChange={this.onDesignChange}
                                        onDesignAdd={this.onDesignAdd}
                                        onDesignRemove={this.onDesignRemove}
                                        onAnimationSave={this.onAnimationSave}/>

                    </Col>

                </Row>

            </Container>

        );
    }
}