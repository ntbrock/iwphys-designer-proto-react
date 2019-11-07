import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import update from 'immutability-helper';
// import diff from 'deep-diff';
import IwpSidebarPanel from "./IwpSidebarPanel";
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
            animationRerenderIncrement: 0,  // If objects are added and sub-components to be redrawn, increment this.
            focusedEditor: undefined
        };

        // console.log("IwpDesignerContainer:24> Incoming Animation: " , props.animation );

        // This binding is necessary to make `this` work in the callback
        this.onDesignChange = this.onDesignChange.bind(this);
        this.onDesignAdd = this.onDesignAdd.bind(this);
        this.onDesignRemove = this.onDesignRemove.bind(this);
        this.onDesignReorder = this.onDesignReorder.bind(this);
        this.onAnimationSave = this.onAnimationSave.bind(this);
        this.onSidebarClicked = this.onSidebarClicked.bind(this);
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

    /** Bubbles up from any design change in any sub compoent. Very important function */
    /* Design: Design Routes can be objects for communicating special modifiers */
    /* 2019Nov06 Design Route as an Array! */
    onDesignChange(editorComponent, designRoute, designUpdate) {
        if ( typeof(editorComponent) != "string" ) { throw Error("onDesignChange call made with previous API, first arg is the editorCompponent")}

        // console.log("IwpDesignerContainer:41> Design Change: designRoute: ", designRoute, "  designUpdate: ", designUpdate, "  {[designRoute]: designUpdate}: ", {[designRoute]: designUpdate} );
        // Mutate the animation
        // console.log("IwpDesignerContainer:45> State.animation: ", this.state.animation );

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


        // Store it!
        if ( animationUpdate ) {
            this.applyAnimationUpdate(editorComponent, designRoute, animationUpdate, "onDesignChange", false );
        } else {
            throw Error("No Animation Update resulted from Design Route: " + JSON.stringify(designRoute));
        }

    }




    /** Bubbles up from Additions that happen in IwpObjectList Editor */
    /* Could lkely be combine with remove since we're doing the immutability update in the compponent */
    onDesignAdd(editorComponent, designRoute, designUpdate) {
        if ( typeof(editorComponent) != "string" ) { throw Error("onDesignChange call made with previous API, first arg is the editorCompponent")}
        // console.log("IwpDesignerContainer:43> Design Add: designRoute: ", designRoute, "  designUpdate: ", designUpdate, " to ss");

        // This should become defined by the below router
        let animationUpdate = undefined;

        if ( ! Array.isArray(designRoute) ) {
            throw Error("DesignRoute was not an array: " + JSON.stringify(designRoute) );
        } else {

            if (designRoute[0] === "objects" && designRoute.length === 1) {
                animationUpdate = { objects: designUpdate };
            } else {
                throw Error("DesignRoute[0] was not recognized as objects or was too long: " + JSON.stringify(designRoute));
            }
        }

        // Store it!
        if ( animationUpdate ) {
            this.applyAnimationUpdate(editorComponent, designRoute, animationUpdate, "onDesignAdd", true);
        } else {
            throw Error("No Animation Update resulted from Design Route: " + JSON.stringify(designRoute));
        }
    }

    /** Bubbles up from any design change */
    onDesignRemove(editorComponent, designRoute, designUpdate) {
        if ( typeof(editorComponent) != "string" ) { throw Error("onDesignChange call made with previous API, first arg is the editorCompponent")}

        // console.log("IwpDesignerContainer:69> Design Remove: event: ", designRoute, "  designUpdate: ", designUpdate, " to ss");

        // This should become defined by the below router
        let animationUpdate = undefined;

        if ( ! Array.isArray(designRoute) ) {
            throw Error("DesignRoute was not an array: " + JSON.stringify(designRoute) );
        } else {

            if (designRoute[0] === "objects" && designRoute.length === 1) {
                animationUpdate = { objects: designUpdate };
            } else {
                throw Error("DesignRoute[0] was not recognized as objects or was too long: " + JSON.stringify(designRoute));
            }
        }

        // Store it!
        if ( animationUpdate ) {
            this.applyAnimationUpdate(editorComponent, designRoute, animationUpdate, "onDesignAdd", true);
        } else {
            throw Error("No Animation Update resulted from Design Route: " + JSON.stringify(designRoute));
        }

    }



    /** Bubbles up from any design reordering - Changig this to by index -vs- by name to amtch the rest */
    onDesignReorder(editorComponent, designRoute, orderUpdate) {
        if ( typeof(editorComponent) != "string" ) { throw Error("onDesignChange call made with previous API, first arg is the editorCompponent")}

        // console.log("IwpDesignerContainer:74> onDesignReorder: event: ", designRoute, "  orderUpdate: ", orderUpdate, " ");

        // onDesignReorder
        let animationUpdate = undefined;

        if ( ! Array.isArray(designRoute) ) {
            throw Error("DesignRoute was not an array: " + JSON.stringify(designRoute) );
        } else {

            if (designRoute[0] === "objects" && designRoute.length === 1) {

                // Special reorder so I can do the entire immiutability set at once.
                let reordered = new Array(this.state.animation.objects.length);

                this.state.animation.objects.map( (object,objectOrder) => {

                    let newOrder = ( orderUpdate.find( o => o.objectName === object.name ) );
                    // console.log("IwpDesignerConatiner:196> newOrder: ", newOrder );
                    if ( newOrder && newOrder.newObjectOrder !== undefined ) {
                        // Use new ordering
                        return reordered[+newOrder.newObjectOrder] = object;
                    } else {
                        // Preserve ordering
                        return reordered[+objectOrder] = object;
                    }
                });

                // Full objects reset! SCary right?
                animationUpdate = { objects: { $set : reordered } };


            } else {
                throw Error("DesignRoute[0] was not recognized as objects or was too long: " + JSON.stringify(designRoute));
            }
        }

        // Store it!
        if ( animationUpdate ) {
            this.applyAnimationUpdate(editorComponent, designRoute, animationUpdate, "onDesignReorder", true);
            // Could this rerender = false because of dragula dom updates? Likely, but want to always keep 100% fresh at bottom components.
        } else {
            throw Error("No Animation Update resulted from Design Route: " + JSON.stringify(designRoute));
        }

    }


    /**
     * Common Location for storing all animation changes after they have been gerneralized
     */

    applyAnimationUpdate(editorComponent, designRoute, animationUpdate, eventMethod, rerender ) {
        if ( typeof(editorComponent) != "string" ) { throw Error("onDesignChange call made with previous API, first arg is the editorCompponent")}

        console.log("IwpDesignerContainer:193> applyAnimationUpdate: editorComponent: ", editorComponent, " designRoute: ", designRoute,  " animationUpdate: ", animationUpdate, "  eventMethod: " , eventMethod );
        // console.log("IwpDesignerContainer:195> state.animationRerenderIncrement: " , this.state.animationRerenderIncrement , "   adder: " , ( rerender ? 1 : 0 ));

        this.setState({
            animation: update(this.state.animation, animationUpdate),
            animationUpdates: update(this.state.animationUpdates, {
                $push: [{
                    editorComponent: editorComponent,
                    designRoute: designRoute,
                    designUpdate: animationUpdate,
                    eventMethod: eventMethod
                }]
            }),
            animationRerenderIncrement: this.state.animationRerenderIncrement + ( rerender ? 1 : 0 )
        })

    }




    onAnimationSave(event) {
        // TODO: Network POST back to play
        // Apply everythining, reset Animation zero and abandon all updates
        this.setState({
            animationZero: JSON.parse(JSON.stringify(this.state.animation)),
            animationUpdates: []
        });
    }


    onSidebarClicked(editor, event) {
        // console.log("IwpDesignerContainer:86> Feature Click Event: feature: " , feature, "  event: " , event);
        this.setState( { focusedEditor: editor })
    }



    render() {

        // console.log("IwpDesignerController:95> Rendering state animation: " , this.state.animation );

        return (

            <Container>
                <Row>

                    {/* Object Tree */}
                    <Col md={3} className="iwp-sidebar-container">

                        <IwpSidebarPanel
                            animation={this.state.animation}
                            animationZero={this.state.animationZero}
                            animationUpdates={this.state.animationUpdates}
                            animationRerenderIncrement={this.state.animationRerenderIncrement}
                            onDesignChange={this.onDesignChange}
                            onSidebarClicked={this.onSidebarClicked} />

                    </Col>

                    {/* Editor Panel */}

                    <Col md={9} className="iwp-editor-container">

                        <IwpEditorPanel animation={this.state.animation}
                                        animationZero={this.state.animationZero}
                                        animationUpdates={this.state.animationUpdates}
                                        animationRerenderIncrement={this.state.animationRerenderIncrement}
                                        focusedEditor={this.state.focusedEditor}
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