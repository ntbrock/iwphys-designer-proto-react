import React from 'react';
import update from 'immutability-helper';

/**
 * Author Editor
 * 2019Nov06 Refactored
 */

export default class IwpAuthorEditor extends React.Component {

    constructor(props) {
        super(props);

        // -------------- Be sure to update these constants -----------------------

        let objectType = "author";
        let editorClass = "IwpAuthorEditor";

        // -------------- ------------------ -----------------------

        // Author has no order
        let object = props.animation.author;

        this.state = {
            editorClass: editorClass,
            objectType: objectType,
            object: object,
            designRoute: [ "author" ]
        };

        // This binding is necessary to make `this` work in the callback
        this.onFieldChange = this.onFieldChange.bind(this);
    }


    /** Handle Field Changes Super Generically 2019Nov06 */
    onFieldChange(event) {
        const designCommand = { [event.target.name] : { $set : event.target.value } };
        // console.log(this.state.editorClass + ":38> onFieldChange, designCommand: " , designCommand );

        // Local State Management Immutable
        this.setState({object: update(this.state.object, designCommand ) });

        // Bubble Design Change Event
        this.props.onDesignChange(this.state.editorClass, this.state.designRoute, designCommand);
    }



    render() {

        const objectType = this.state.objectType;

        return (
            <div className={"iwp-"+objectType+"-editor"}>

                <h3>Author</h3>
                <div>
                    <label>Email</label>
                    <input type="text"
                           name="email"
                           value={this.state.object.email}
                           onChange={this.onFieldChange} />
                </div>

                <div>
                    <label>Name</label>
                    <input type="text"
                           name="name"
                           value={this.state.object.name}
                           onChange={this.onFieldChange} />
                </div>

                <div>
                    <label>Organization</label>
                    <input type="text"
                           name="organization"
                           value={this.state.object.organization}
                           onChange={this.onFieldChange} />
                </div>

                <div>
                    <label>Username</label>
                    <input type="text"
                           name="username"
                           value={this.state.object.username}
                           onChange={this.onFieldChange} />
                </div>

            </div>
        );
    }
}