import React from 'react';
// import update from "immutability-helper";
import IwpInputEditor from "./IwpInputEditor";
import { Button } from 'reactstrap';
import Dragula from 'react-dragula';

/**
 * Edit Author information
 */
export default class IwpInputsEditor extends React.Component {

    constructor(props) {
        super(props);

        // console.log("IwpInputsEditor:15> incoming animation: ", props.animation );


        // This binding is necessary to make `this` work in the callback
        this.onAddInput = this.onAddInput.bind(this);
        this.onReorderInputs = this.onReorderInputs.bind(this);
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


            console.log("IwpInputsEditor:26> Applied Dragula with options: ", options, "  to componentBackingInstance: " , componentBackingInstance);


            Dragula([componentBackingInstance], options).on('drag', function (el) {

                // console.log("IwpInputsEditor:37> on Drag: el: ", el);
                // el.className += ' dragging';

            }).on('drop', function (el, target) {
                console.log("IwpInputsEditor:37> on Drop: el: ", el, "target: " , target );
                // el.className = el.className.replace('dragging', '');
                component.onReorderInputs(el, target);

            });

        }
    };


    onReorderInputs(element, container) {

        // Reach into the dom to determine the new order?

        const childNodes =  Array.from(container.childNodes);

        console.log("IwpInputsEditor:68> ChildNodes is: " , childNodes);

        const newInputOrder = childNodes.map( input => {
                const inputName = input.getAttribute("input_name");
                return inputName;
            }
        );

        console.log("IwpInputsEditor:68> Determined new INput Order: " , newInputOrder);

        if(this.props.onDesignReorder) {
            this.props.onDesignReorder("objects.input", newInputOrder);
        }
    }



    onAddInput(event) {

        let inputName = "newInput";

        // Make sure new name doesn't conflict
        let uniqueName = false;
        for ( let inputAttempt = 0; ! uniqueName; inputAttempt++ ) {
            inputName = "newInput" +  ( inputAttempt > 0 ? inputAttempt : '' ); // Dont' add 0
            const inputNameAttempt = inputName;
            uniqueName = this.props.animation.objects.filter( o => o.name === inputNameAttempt ).length === 0;
        }

        console.log("IwpInputEditor:42> onAddInput: Determined Unique INput Name: " , uniqueName);


        if(this.props.onDesignAdd) {
            this.props.onDesignAdd("objects.input[name="+inputName+"]", { objectType: "input", name: inputName, hidden: false, initialValue: 0, text: "", units: "" })
        }
    }


    render() {

        // console.log("IwpInputsEditor:46> props: ", this.props );
        const inputs = this.props.animation.objects.filter( (o) => o.objectType === "input" );


        let inputsDom = inputs.map( (feature, i) => {
                const input = inputs[i];

                // console.log("IpwInputsEditor:45> inputs: ", inputs, "  input: " , input);

                return (
                    <div className="iwp-input-editor-container" key={input.name} input_name={input.name}>
                        <IwpInputEditor input={input} onDesignChange={this.props.onDesignChange} onDesignRemove={this.props.onDesignRemove}/>
                    </div>
                )


            }
        )


        return (
            <div className="iwp-inputs-editor">

                <h3>Inputs</h3>

                <div className="iwp-editor-control-buttons">
                <Button onClick={this.onAddInput}>Add New Input</Button>
                </div>

                <div className="iwp-drag-container container" ref={this.dragulaDecorator}>

                    {inputsDom}

                </div>

            </div>
        );
    }
}