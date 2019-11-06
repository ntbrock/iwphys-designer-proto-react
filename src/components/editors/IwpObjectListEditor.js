import React from 'react';
// import update from "immutability-helper";
import IwpInputEditor from "./IwpInputEditor";
import IwpOutputEditor from "./IwpOutputEditor";
import IwpSolidEditor from "./IwpSolidEditor";

import { Button } from 'reactstrap';
import Dragula from 'react-dragula';

/**
 * IwpObjectListEditor - Generalized List of Objects
 */
export default class IwpObjectListEditor extends React.Component {

    constructor(props) {
        super(props);


        // -------------- Be sure to update these constants -----------------------

        let editorClass = "IwpObjectListEditor";

        // -------------- ------------------ -----------------------

        this.state = {
            editorClass: editorClass,
        };


        // console.log("IwpInputsEditor:15> incoming animation: ", props.animation );
        // DEFENSE
        if ( props.onDesignChange === undefined ) { throw Error("Missing Prop: onDesignChange")}
        if ( props.onDesignAdd === undefined ) { throw Error("Missing Prop: onDesignAdd")}
        if ( props.onDesignRemove === undefined ) { throw Error("Missing Prop: onDesignRemove")}
        if ( props.onDesignReorder === undefined ) { throw Error("Missing Prop: onDesignRemove")}
        if ( props.animationRerenderIncrement === undefined ) { throw Error("Missing Prop: animationRerenderIncrement")}
        if ( props.objectTypeFilter === undefined ) { throw Error("Missing Prop: objectTypeFilter")}
        if ( props.objectTypeLabel  === undefined) { throw Error("Missing Prop: objectTypeLabel")}

        // This binding is necessary to make `this` work in the callback
        this.onAdd = this.onAdd.bind(this);
        this.onReorder = this.onReorder.bind(this);
    }

    editorClassName = () => {
        return "iwp-"+this.props.objectTypeFilter+"-editor"
    };

    // Dynamically determine subeditor type.
    constructSubEditor = (object, objectOrder) => {

        // console.log("IwpObjectListEditor:35> Construct Sub Editor for object: " , object,  "  objectOrder: ", objectOrder );

        if ( this.props.objectTypeFilter === "input" ) {
            return (
                <IwpInputEditor object={object}
                                objectOrder={objectOrder}
                                animation={this.props.animation}
                                animationRerenderIncrement={this.props.animationRerenderIncrement}
                                onDesignChange={this.props.onDesignChange}
                                onDesignRemove={this.props.onDesignRemove}/>
            )
        } else if ( this.props.objectTypeFilter === "output" ) {
            return (
                <IwpOutputEditor object={object}
                                 objectOrder={objectOrder}
                                 animation={this.props.animation}
                                 animationRerenderIncrement={this.props.animationRerenderIncrement}
                                 onDesignChange={this.props.onDesignChange}
                                 onDesignRemove={this.props.onDesignRemove}/>
            )

        } else if ( this.props.objectTypeFilter === "solid" ) {
            return (
                <IwpSolidEditor object={object}
                                objectOrder={objectOrder}
                                animation={this.props.animation}
                                animationRerenderIncrement={this.props.animationRerenderIncrement}
                                onDesignChange={this.props.onDesignChange}
                                onDesignRemove={this.props.onDesignRemove}/>
            )

        } else {
            throw Error("IwpObjectListEditor:37> Unsupported objectTypeFilter: "+this.props.objectTypeFilter )
        }
    };


    // https://github.com/bevacqua/react-dragula
    dragulaDecorator = (componentBackingInstance) => {

        const component = this;

        if (componentBackingInstance) {
            let options = {
                moves: function (el, source, handle, sibling) {
                    return handle.classList.contains('drag-handle');
                }
            };

            // console.log("IwpObjectsEditor:26> Applied Dragula with options: ", options, "  to componentBackingInstance: " , componentBackingInstance);

            Dragula([componentBackingInstance], options).on('drag', function (el) {

                // console.log("IwpInputsEditor:37> on Drag: el: ", el);
                // el.className += ' dragging';

            }).on('drop', function (el, target) {
                // console.log("IwpInputsEditor:37> on Drop: el: ", el, "target: " , target );
                // el.className = el.className.replace('dragging', '');
                component.onReorder(el, target);
            });

        }
    };


    onReorder(element, container) {

        // Reach into the dom to determine the new order

        const childNodes =  Array.from(container.childNodes);
        // console.log("IwpObjectsEditor:63> ChildNodes is: " , childNodes);

        // Create a sorted list of all previous Object Orders

        const possibleOrder = childNodes.map( object => +object.getAttribute("object-order")).sort();

        console.log("IwpObjectsEditor:114> possibleOrder: " , possibleOrder );

        // Need to 'up-scale' the order, since the incoming list is only visible objects.
        const newObjectOrder = childNodes.map( (object,newObjectOrder) => {
                return { newObjectOrder: +possibleOrder[newObjectOrder],
                         previousObjectOrder: +object.getAttribute("object-order"),
                         objectName: object.getAttribute("object-name") };
            }
        );


        // Need to fill the arr
        console.log("IwpObjectsEditor:71> Determined new Object Order: " , newObjectOrder);

        this.props.onDesignReorder(this.state.editorClass, ["objects"], newObjectOrder);

    }

    onAdd(event) {

        let objectName = "new"+this.props.objectTypeLabel;

        // Make sure new name doesn't conflict
        let uniqueName = false;
        for ( let inputAttempt = 0; ! uniqueName; inputAttempt++ ) {
            objectName = "new" + this.props.objectTypeLabel +  ( inputAttempt > 0 ? inputAttempt : '' ); // Dont' add 0
            const inputNameAttempt = objectName;
            uniqueName = this.props.animation.objects.filter( o => o.name === inputNameAttempt ).length === 0;
        }

        // console.log("IwpInputEditor:42> onAddInput: Determined Unique INput Name: " , uniqueName);

        // TODO - Different intiializer by each object type

        const designRoute = [ "objects" ];


        const objectType = this.props.objectTypeFilter;
        let newObject = undefined;

        if ( objectType === "input" ) {
            // Input
            newObject = {
                objectType: objectType,
                name: objectName,
                hidden: false,
                initialValue: 0,
                text: "",
                units: ""
            };
        } else if ( objectType === "output" ) {
            // Input
            newObject = {
                objectType: objectType,
                name: objectName,
                text: "",
                units: "",
                calculator: {
                    calcType: "parametric",
                    value: "0"
                },
                hidden: false
            };
        } else if ( objectType === "solid" ) {

            newObject = {
                objectType: objectType,
                name: objectName,
                shape: {
                    shapeType: "rectangle",
                    vectors: {
                        xVel: false,
                        yVel: false,
                        xAccel: false,
                        yAccel: false,
                        Vel: false,
                        Accel: false
                    },
                    width: {
                        calculator: {
                            calcType: "parametric",
                            value: "1"
                        }
                    },
                    height: {
                        calculator: {
                            calcType: "parametric",
                            value: "1"
                        }
                    },
                    graphOptions: {
                        graphVisible: true,
                        initiallyOn: {
                            xPos: true,
                            xVel: false,
                            xAccel: false,
                            yPos: true,
                            yVel: false,
                            yAccel: false
                        }
                    },
                    isGraphable: true,
                    drawTrails: false,
                    drawVectors: false
                },
                color: {
                    red: 51,
                    green: 51,
                    blue: 51
                },
                xpath: {
                    calculator: {
                        calcType: "parametric",
                        value: "0"
                    }
                },
                ypath: {
                    calculator: {
                        calcType: "parametric",
                        value: "0"
                    }
                },
            };

        } else {
            throw Error("IwpObjectListEditor:255> No new object constructor for type: " + objectType );
        }

        this.props.onDesignAdd( this.state.editorClass, designRoute, { $unshift: [ newObject ] } );
    }


    render() {

        // Important ObjectOrderIs Global!  Don't limit it in by objectType.

        let objectsDom = this.props.animation.objects.map( (object, objectOrder) => {

            if ( object.objectType === this.props.objectTypeFilter ) {

                let subEditor = this.constructSubEditor(object, objectOrder);
                return (
                    <div className={this.editorClassName+"-container"} key={this.props.animationRerenderIncrement+"-"+objectOrder} object-order={objectOrder} object-name={object.name}>
                        {subEditor}
                    </div>
                )

            } else {
                return undefined;
            }
        });


        return (
            <div className={this.editorClassName()}>

                <h3>{this.props.objectTypeLabel}s</h3>

                <div className="iwp-editor-control-buttons">
                <Button onClick={this.onAdd}>Add New {this.props.objectTypeLabel}</Button>
                </div>

                <div className="iwp-drag-container container" ref={this.dragulaDecorator}>
                    {objectsDom}
                </div>

            </div>
        );
    }
}