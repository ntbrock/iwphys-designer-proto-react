import React from 'react';

/**
 * Edit Author information
 */
export default class IwpAuthorEditor extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            author: props.author };

        // This binding is necessary to make `this` work in the callback
        this.onNameChange = this.onEmailChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onOrganizationChange = this.onEmailChange.bind(this);
        this.onUsernameChange = this.onEmailChange.bind(this);
    }

    onNameChange(event) {
        this.setState( { author : { name : event.target.value } }  );
        if(this.props.onDesignChange) {
            this.props.onDesignChange(this.state)
        }
    }

    onEmailChange(event) {
        this.setState( { author : { email : event.target.value } } );
        if(this.props.onDesignChange) {
            this.props.onDesignChange(this.state)
        }
    }

    onOrganizationChange(event) {
        this.setState( { author : { organization : event.target.value } } );
        if(this.props.onDesignChange) {
            this.props.onDesignChange(this.state)
        }
    }

    onUsernameChange(event) {
        this.setState( { author : { username : event.target.value } } );
        if(this.props.onDesignChange) {
            this.props.onDesignChange(this.state)
        }
    }


    render() {
        return (
            <div className="iwp-input-editor">

                <h3>Author</h3>
                <div>
                    <label>Email</label>
                    <input type="text"
                           value={this.state.author.email}
                           readOnly={false}
                           onChange={this.onEmailChange}/>
                </div>

                <div>
                    <label>Name</label>
                    <input type="text"
                           value={this.state.author.name}
                           readOnly={false}
                           onChange={this.onNameChange}/>
                </div>

                <div>
                    <label>Organization</label>
                    <input type="text"
                           value={this.state.author.organization}
                           readOnly={false}
                           onChange={this.onOrganizationChange}/>
                </div>

                <div>
                    <label>Username</label>
                    <input type="text"
                           value={this.state.author.username}
                           readOnly={false}
                           onChange={this.onUsernameChange}/>
                </div>

            </div>
        );
    }
}