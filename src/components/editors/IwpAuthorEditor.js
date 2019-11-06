import React from 'react';
// import update from 'immutability-helper';

/**
 * Edit Author information
 */
export default class IwpAuthorEditor extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            // 2019Nov06_0820 Build the design route consistently on construction of component.
            designRoute: [ "author" ],
            author: JSON.parse(JSON.stringify(props.animation.author))
        };

        console.log("IwpAuthorEditor:15> Constructor: this.state = ", this.state.author );

        // This binding is necessary to make `this` work in the callback
        this.onFormChange = this.onFormChange.bind(this);
    }

    onFormChange(event) {
        const targetName = event.target.name;

        // Local State Management
        let newAuthor = this.state.author;
        newAuthor[targetName] = event.target.value;
        this.setState({author: newAuthor});

        // Bubble Design Change Event
        const designCommand = { [targetName] : { $set : event.target.value } };
        if (this.props.onDesignChange) {
            this.props.onDesignChange(this.state.designRoute, designCommand);
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