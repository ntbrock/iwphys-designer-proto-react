import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import update from 'immutability-helper';
// import diff from 'deep-diff';
import IwpObjectList from "./IwpObjectList";
import IwpEditorPanel from "./IwpEditorPanel";

/**
 * Focused OBject is what's being editied. When user clicks, the focused object changes.
 *
 * 2019Nov05 Brockman Implementing the animationZero -vs- animationChanged with difference tracking.
 *
 *
 */

export default class IwpDesignerContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            animation: props.animation,
            // First Deep Copy is expensive on initialization to be sure we're 100% broken free. The immutabiltiy helper still had internal refs
            animationZero: JSON.parse(JSON.stringify(props.animation)),
            animationUpdates: [],
            focusedFeature: undefined,
            focusedObject: undefined,
        };

        // console.log("IwpDesignerContainer:24> Incoming Animation: " , props.animation );

        // This binding is necessary to make `this` work in the callback
        this.onDesignChange = this.onDesignChange.bind(this);
        this.onDesignAdd = this.onDesignAdd.bind(this);
        this.onDesignRemove = this.onDesignRemove.bind(this);
        this.onDesignReorder = this.onDesignReorder.bind(this);
        this.onAnimationSave = this.onAnimationSave.bind(this);
        this.onObjectClicked = this.onObjectClicked.bind(this);
        this.onFeatureClicked = this.onFeatureClicked.bind(this);
    }

    // https://stackoverflow.com/questions/7176908/how-to-get-index-of-object-by-its-property-in-javascript
    findIndexWithAttr(array, attr, value) {
        for(let i = 0; i < array.length; i += 1) {
            if(array[i][attr] === value) {
                return i;
            }
        }
        return -1;
    }

    /** Bubbles up from any design change */
    /* Design: Design Routes can be objects for communicating special modifiers */
    /* 2019Nov06 Design Route as an Array! */
    onDesignChange(designRoute, designUpdate) {
        console.log("IwpDesignerContainer:41> Design Change: designRoute: ", designRoute, "  designUpdate: ", designUpdate, "  {[designRoute]: designUpdate}: ", {[designRoute]: designUpdate} );

        // Mutate the animation

        console.log("IwpDesignerContainer:45> State.animation: ", this.state.animation );

        // This should become defined by the below router
        let animationUpdate = undefined;

        if ( ! Array.isArray(designRoute) ) {
            throw Error("DesignRoute was not an array: " + JSON.stringify(designRoute) );


        } else {

            if (designRoute[0] === "objects" && designRoute.length > 1) {

                // 2nd level

                if (designRoute[1] === "name" && designRoute.length > 2 ) {

                    // Find the Objects index by its name property
                    const objectIndex = this.findIndexWithAttr( this.state.animation.objects, "name", designRoute[2] );

                    if ( objectIndex < 0 ) {
                        throw Error("DesignRoute was unable to locate an object by name: " + JSON.stringify(designRoute) );
                    } else {
                        animationUpdate = { objects: { [objectIndex]: designUpdate } };
                    }

                } else if (designRoute[1] === "order" && designRoute.length > 2 ) {

                    const objectOrder = +designRoute[2];
                    // We know the object order so can make a direct update.
                    animationUpdate = { objects: { [objectOrder] : designUpdate } };

                } else {

                    throw Error("DesignRoute objects 2nd part not recognized: " + JSON.stringify(designRoute));
                }


            } else if (designRoute[0] === "author") {
                // So clean!
                animationUpdate = { author: designUpdate };

            } else {

                throw Error("DesignRoute[0] was not recognized as objects or author: " + JSON.stringify(designRoute));
            }
        }


        if ( animationUpdate ) {

            console.log("IwpDesignerContainer:108> setting state with animationUpdate: " , animationUpdate );

            this.setState( {

                animation: update(this.state.animation, animationUpdate),
                animationUpdates: update(this.state.animationUpdates, { $push: [ { designRoute: designRoute, designUpdate: designUpdate, animationUpdate: animationUpdate } ] })
            })

        } else {

            throw Error("No Animation Update resulted from Design Route: " + JSON.stringify(designRoute));
        }

    }




    /** Bubbles up from any design Addition */
    onDesignAdd(designRoute, designUpdate) {
        console.log("IwpDesignerContainer:43> Design Add: designRoute: ", designRoute, "  designUpdate: ", designUpdate, " to ss");

        throw Error("TODO Implement Design Add using new animationChanges + DesisgnRoute Model");

        /*

        // manipulate animation state, then pass that back down
        let animation = this.state.animation;

        if ( designRoute.startsWith("objects.input") ) {

            animation.objects = update(animation.objects, {$unshift: [designUpdate] });

            console.log("IwpDesignerContainer:54> new animation: " , animation);
            this.setState({
                animation: animation,
                animationUpdates: update(this.state.animationUpdates, {$push: [{ [designRoute]: designUpdate}] })
            });

            // TODO update unsaved changes

        } else {
            throw Error("onDesignAdd: unrecognized designRoute: '"+designRoute+ "'");
        }
        */

    }

    /** Bubbles up from any design change */
    onDesignRemove(designRoute, designUpdate) {
        console.log("IwpDesignerContainer:69> Design Remove: event: ", designRoute, "  designUpdate: ", designUpdate, " to ss");

        throw Error("TODO Implement Design Remove using new animationChanges + DesisgnRoute Model");

        /*
        // Manipulate the Animation to remove the object refernces
        let animation = this.state.animation;
        const filteredObjects = animation.objects.filter( o => o.name !== designUpdate.name );

        animation.objects = update(animation.objects, {$set: filteredObjects });


        this.setState({
            animation: animation,
            animationUpdates: update(this.state.animationUpdates, { $push: [{ [designRoute]: designUpdate }] })
        })
        */
    }

    /** Bubbles up from any design reordering */
    onDesignReorder(designRoute, designUpdate) {
        console.log("IwpDesignerContainer:74> onDesignReorder: event: ", designRoute, "  designUpdate: ", designUpdate, " to ss");

        throw Error("TODO Implement Design Reorder using new animationChanges + DesisgnRoute Model");
        /*

        this.setState({
            animationUpdates: update(this.state.animationUpdates, { $push: [{ [designRoute]: designUpdate }] })
        })
        */
    }


    onAnimationSave(event) {
        // TODO: Network POST back to play
        // Apply everythining, reset Animation zero and abandon all updates
        this.setState({
            animationZero: JSON.parse(JSON.stringify(this.state.animation)),
            animationUpdates: []
        });
    }



    onObjectClicked(object, event) {
        // console.log("IwpDesignerContainer:81> Object Click Event: object: " , object, " event: " , event);
        this.setState( { focusedObject: object, focusedFeature: undefined })
    }

    onFeatureClicked(feature, event) {
        // console.log("IwpDesignerContainer:86> Feature Click Event: feature: " , feature, "  event: " , event);
        this.setState( { focusedObject: undefined, focusedFeature: feature })
    }



    render() {

        // console.log("IwpDesignerController:95> Rendering state animation: " , this.state.animation );

        return (

            <Container>
                <Row>

                    {/* Object Tree */}
                    <Col md={3}>
                        <h3>IWP Designer</h3>

                        <IwpObjectList
                            animation={this.state.animation}
                            animationZero={this.state.animationZero}
                            animationUpdates={this.state.animationUpdates}
                            onDesignChange={this.onDesignChange}
                            onFeatureClicked={this.onFeatureClicked}
                            onObjectClicked={this.onObjectClicked} />

                    </Col>

                    {/* Editor Panel */}

                    <Col md={9}>

                        <IwpEditorPanel animation={this.state.animation}
                                        animationZero={this.state.animationZero}
                                        animationUpdates={this.state.animationUpdates}
                                        focusedFeature={this.state.focusedFeature}
                                        focusedObject={this.state.focusedObject}
                                        onDesignChange={this.onDesignChange}
                                        onDesignAdd={this.onDesignAdd}
                                        onDesignRemove={this.onDesignRemove}
                                        onDesignReorder={this.onDesignReorder}
                                        onAnimationSave={this.onAnimationSave}/>

                    </Col>

                </Row>

            </Container>

        );
    }
}