import React from 'react';

/**
 * Edit Author information
 */
export default class IwpAuthorEditor extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            name: props.animation.author.name,
            email: props.animation.author.email,
            organization: props.animation.author.name,
            username: props.animation.author.username,
        };

        // This binding is necessary to make `this` work in the callback
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onOrganizationChange = this.onOrganizationChange.bind(this);
        this.onUsernameChange = this.onUsernameChange.bind(this);
    }


    onEmailChange(event) {
        let email = event.target.value;
        this.setState( { email : email } );
        if(this.props.onDesignChange) {
            this.props.onDesignChange("author.email", email )
        }
    }


    onNameChange(event) {
        let name = event.target.value;
        this.setState( { name : name } );
        if(this.props.onDesignChange) {
            this.props.onDesignChange("author.name", name )
        }
    }

    onOrganizationChange(event) {
        let organization = event.target.value;
        this.setState( { organization : organization } );
        if(this.props.onDesignChange) {
            this.props.onDesignChange("author.organization", organization )
        }
    }

    onUsernameChange(event) {
        let username = event.target.value;
        this.setState( { username : username } );
        if(this.props.onDesignChange) {
            this.props.onDesignChange("author.username", username )
        }
    }


    render() {
        return (
            <div className="iwp-editor iwp-input-editor">

                <h3>Author</h3>
                <div>
                    <label>Email</label>
                    <input type="text"
                           value={this.state.email}
                           readOnly={false}
                           onChange={this.onEmailChange}/>
                </div>

                <div>
                    <label>Name</label>
                    <input type="text"
                           value={this.state.name}
                           readOnly={false}
                           onChange={this.onNameChange}/>
                </div>

                <div>
                    <label>Organization</label>
                    <input type="text"
                           value={this.state.organization}
                           readOnly={false}
                           onChange={this.onOrganizationChange}/>
                </div>

                <div>
                    <label>Username</label>
                    <input type="text"
                           value={this.state.username}
                           readOnly={false}
                           onChange={this.onUsernameChange}/>
                </div>

            </div>
        );
    }
}