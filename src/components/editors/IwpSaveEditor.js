import React from 'react';
import { Button, Table } from 'reactstrap';
import * as axios from "axios";

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
        // alert("IwpSaveEditor:23> Todo, Push Animation Back to Server");

        console.log("IwpSaveEditor:25> Animation: ", this.props.animation);

        // Do an API post!

        const filename = encodeURI(this.props.animationFilename);
        const url = "http://localhost:8470/designer/api1/save/" + filename;

        console.log("IwpSaveEditor:36> Post url: ", url);

        const a = axios.create({
            baseURL: 'http://localhost:8470',
            timeout: 5000,
            headers: {'X-Token': this.props.token}
        });

        const onSuccess = this.props.onAnimationSave;
        
        a.post(url, this.props.animation)
            .then( function(response) {
              // Bubble back up
              onSuccess(event);
            })
            .catch( function(response) {
                console.log("IwpSaveEditor:50> Failure Saving: ", response)
                alert("Failure Saving: " + response);
            });
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

                <h3>User Authentication</h3>

                <div>
                    Token: {this.props.token}
                </div>
                <br/>

                <h3>Animation Filename</h3>

                <input type="text"
                       name="animationFilename"
                       value={this.props.animationFilename}
                       onChange={this.props.onAnimationFilename} />

                   <br/>
                   <br/>

                <div>
                    <Button active={true} color="secondary" onClick={this.onSaveClick}>Save {changeCount} Changes</Button>
                </div>

                <br/><br/>

                <h3>Unsaved Change Log</h3>

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