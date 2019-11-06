import React from 'react';
import { Button, Table } from 'reactstrap';

/**
 * Edit Author information
 */
export default class IwpSaveEditor extends React.Component {


    constructor(props) {
        super(props);
        this.state = {

        };

        // D-Fence
        if ( ! Array.isArray(this.props.animationUpdates) ) { throw Error("IwpObjectLists Defense: props.animationUpdates was not an array"); }

        // This binding is necessary to make `this` work in the callback
        this.onSaveClick = this.onSaveClick.bind(this);

    }


    onSaveClick(event) {
        alert("IwpSaveEditor:23> Todo, Push Animation Back to Server");

        console.log("IwpSaveEditor:25> Animation: ", this.props.animation);


        // Bubble back up
        this.props.onAnimationSave(event);
    }



    render() {

        console.log("IwpSaveEditor:39> this.props: ", this.props );


        let changeCount = this.props.animationUpdates.length;
        let changeRows = this.props.animationUpdates.map((animationUpdate, i) => {
            return (
                <tr key={i}>
                    <td>{i}</td>
                    <td>{animationUpdate.editorComponent}</td>
                    <td>{animationUpdate.eventMethod}</td>
                    <td><span style={{fontSize: "80%"}}>{JSON.stringify(animationUpdate.designUpdate)}</span></td>

                </tr>
            )
        }).reverse();



        return (
            <div className="iwp-editor iwp-save-editor">

                <br/>
               <div>

                   <form method="POST" target="_preview" action="http://localhost:8470/animation/preview">

                       <input type="hidden" name="animationFilename" value="reactDesignerNeedsFilenames56.iwp.json"/>

                       <input type="hidden" name="animationJson" value={JSON.stringify(this.props.animation)}/>

                       <Button active={true} color="primary">Preview Animation</Button>

                   </form>

                   <br/><br/>


               </div>


                <div>
                    <Button active={true} color="secondary" onClick={this.onSaveClick}>Save {changeCount} Changes</Button>
                </div>

                <br/><br/>

                <h3>Unsaved Changes</h3>

                <Table>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Editor</th>
                        <th>Event</th>
                        <th>Update</th>
                    </tr>
                    </thead>

                    <tbody>
                    {changeRows}


                    </tbody>
                </Table>
            </div>
        );
    }
}