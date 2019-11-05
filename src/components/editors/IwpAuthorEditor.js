import React from 'react';
import update from 'immutability-helper';

/**
 * Edit Author information
 */
export default class IwpAuthorEditor extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            author: update(props.animation.author,{ cloned: { $set: true }}) // 1600 Attempt to CLONE for local editing.
        };

        console.log("IwpAuthorEditor:15> Constructor: this.state = ", this.state.author );

        // This binding is necessary to make `this` work in the callback
        this.onFormChange = this.onFormChange.bind(this);
    }

    /* Generalized Form Handler for All Inputs */
    onFormChange(event) {
        const targetName = event.target.name;

        if ( true ) {
            let newAuthor = this.state.author;
            //----------------------
            // Generalized for all form fields
            // Mutate our Local State

            newAuthor[targetName] = event.target.value;
            this.setState({author: newAuthor});
        }

        // Send the Design Change up
        const designRoute = 'author';
        const designCommand = { [targetName] : { $set : event.target.value } };
        if (this.props.onDesignChange) {
            this.props.onDesignChange(designRoute, designCommand);
        }

    }



    render() {
        return (
            <div className="iwp-editor iwp-input-editor">

                <h3>Author</h3>
                <div>
                    <label>Email</label>
                    <input type="text"
                           name="email"
                           value={this.state.author.email}
                           readOnly={false}
                           onChange={this.onFormChange}/>
                </div>

                <div>
                    <label>Name</label>
                    <input type="text"
                           name="name"
                           value={this.state.author.name}
                           readOnly={false}
                           onChange={this.onFormChange}/>
                </div>

                <div>
                    <label>Organization</label>
                    <input type="text"
                           name="organization"
                           value={this.state.author.organization}
                           readOnly={false}
                           onChange={this.onFormChange}/>
                </div>

                <div>
                    <label>Username</label>
                    <input type="text"
                           name="username"
                           value={this.state.author.username}
                           readOnly={false}
                           onChange={this.onFormChange}/>
                </div>

            </div>
        );
    }
}