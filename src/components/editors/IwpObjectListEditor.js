import React from 'react';
// import update from "immutability-helper";
import IwpInputEditor from "./IwpInputEditor";
import { Button } from 'reactstrap';
import Dragula from 'react-dragula';

/**
 * IwpObjectListEditor - Generalized List of Objects
 */
export default class IwpObjectListEditor extends React.Component {

    constructor(props) {
        super(props);

        // console.log("IwpInputsEditor:15> incoming animation: ", props.animation );

        this.objectTypeLabel = props.objectTypeLabel; // "Input";
        this.objectTypeFilter = props.objectTypeFilter;
        this.editorClassName = "iwp-"+props.objectTypeFilter+"-editor";


        // This binding is necessary to make `this` work in the callback
        this.onAdd = this.onAdd.bind(this);
        this.onReorder = this.onReorder.bind(this);
    }

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

        // Reach into the dom to determine the new order?
        const childNodes =  Array.from(container.childNodes);
        // console.log("IwpObjectsEditor:63> ChildNodes is: " , childNodes);
        const newObjectOrder = childNodes.map( input => {
                const objectName = input.getAttribute("object-name");
                return objectName;
            }
        );

        // console.log("IwpObjectsEditor:71> Determined new Object Order: " , newInputOrder);

        if(this.props.onDesignReorder) {
            this.props.onDesignReorder("objects."+this.objectTypeFilter, newObjectOrder);
        }
    }

    onAdd(event) {

        let objectName = "new"+this.objectTypeLabel;

        // Make sure new name doesn't conflict
        let uniqueName = false;
        for ( let inputAttempt = 0; ! uniqueName; inputAttempt++ ) {
            objectName = "new" + this.objectTypeLabel +  ( inputAttempt > 0 ? inputAttempt : '' ); // Dont' add 0
            const inputNameAttempt = objectName;
            uniqueName = this.props.animation.objects.filter( o => o.name === inputNameAttempt ).length === 0;
        }

        console.log("IwpInputEditor:42> onAddInput: Determined Unique INput Name: " , uniqueName);


        if(this.props.onDesignAdd) {

            // TODO - Pull The new attriobutes in a more generalized way?

            this.props.onDesignAdd("objects."+this.objectTypeFilter+"[name="+objectName+"]",
                { objectType: this.objectTypeFilter, name: objectName, hidden: false, initialValue: 0, text: "", units: "" })
        }
    }


    render() {
        const objects = this.props.animation.objects.filter( (o) => o.objectType === this.objectTypeFilter );

        let objectsDom = objects.map( (feature, i) => {
            const object = objects[i];

            // Dynamically determine subeditor type.
            let subEditor = undefined;
            if ( this.objectTypeFilter == "input" ) {
                subEditor =
                    <IwpInputEditor input={object} onDesignChange={this.props.onDesignChange} onDesignRemove={this.props.onDesignRemove}/>
            }

            return (
                <div className={this.editorClassName+"-container"} key={object.name} object-name={object.name}>
                    {subEditor}
                </div>
            )
        });


        return (
            <div className={this.editorClassName}>

                <h3>{this.objectTypeLabel}s</h3>

                <div className="iwp-editor-control-buttons">
                <Button onClick={this.onAdd}>Add New {this.objectTypeLabel}</Button>
                </div>

                <div className="iwp-drag-container container" ref={this.dragulaDecorator}>
                    {objectsDom}
                </div>

            </div>
        );
    }
}