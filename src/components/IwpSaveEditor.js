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

        // This binding is necessary to make `this` work in the callback
        this.onSaveClick = this.onSaveClick.bind(this);

    }


    onSaveClick(event) {
        alert("IwpSaveEditor:23> Todo, Push Animation Back to Server");
    }



    render() {

        console.log("IwpSaveEditor:30> this.props: ", this.props );

        let changeRows = Object.keys(this.props.unsavedChanges).map((feature, i) => {
            return ( <tr key={feature}>
                <td>{i}</td>
                    <td>{feature}</td>
                    <td>{this.props.unsavedChanges[feature]}</td>
                </tr> )

        })


        return (
            <div className="iwp-editor iwp-save-editor">

                <h3>Save Changes?</h3>

                <Button active={true} color="primary" onClick={this.onSaveClick}>Save Changes</Button>

                <br/><br/>
                
                <h3>List of Changes</h3>

                <Table>
                    <thead>
                    <tr>
                        <th>Change #</th>
                        <th>Feature</th>
                        <th>New Value</th>
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