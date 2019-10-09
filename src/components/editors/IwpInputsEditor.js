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

    }

    // https://github.com/bevacqua/react-dragula
    dragulaDecorator = (componentBackingInstance) => {

        if (componentBackingInstance) {
            let options = {
/*
                moves: function (el, source, handle, sibling) {
                    console.log("IwpInputsEditor:30> moves: el: " , el, "  source: " , source );
                    return true;
                }
*/
            };


            console.log("IwpInputsEditor:26> Applied Dragula with options: ", options, "  to componentBackingInstance: " , componentBackingInstance);


            Dragula([componentBackingInstance], options).on('drag', function (el) {

                console.log("IwpInputsEditor:37> on Drag: el: ", el);
                el.className += ' dragging';

            }).on('drop', function (el) {
                console.log("IwpInputsEditor:37> on Drop: el: ", el);

                el.className = el.className.replace('dragging', '');


            }).on('over', function (el, container) {

                console.log("IwpInputsEditor:37> on Over: el: ", el);
                // container.className += ' ex-over';
            }).on('out', function (el, container) {

                console.log("IwpInputsEditor:37> on Out: el: ", el);
                // container.className = container.className.replace('ex-over', '');
            });



        }
    };


    onAddInput(event) {

        console.log("IwpInputEditor:42> onAddInput: event: " , event);

        let feature = "input1"; // Todo Make sure INput doesn't conflict
        if(this.props.onDesignAdd) {
            this.props.onDesignAdd("objects.input", { objectType: "input", name: feature, hidden: false, initialValue: 0, text: "", units: "" })
        }
    }


    render() {

        // console.log("IwpInputsEditor:46> props: ", this.props );
        const inputs = this.props.animation.objects.filter( (o) => o.objectType === "input" );


        let inputsDom = inputs.map( (feature, i) => {
                const input = inputs[i];

                // console.log("IpwInputsEditor:45> inputs: ", inputs, "  input: " , input);

                return (
                    <div className="iwp-input-editor-container" key={input.name}>
                        <IwpInputEditor input={input} onDesignChange={this.props.onDesignChange}/>
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