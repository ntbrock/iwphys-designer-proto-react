import React from 'react';
import {Editor, EditorState, ContentState} from 'draft-js';

/**
 * Edit Author information
 */
export default class IwpDescriptionEditor extends React.Component {


    constructor(props) {
        super(props);

        const description = props.animation.objects.filter( (o) => o.objectType === "description" )[0]

        this.state = {
            description: description,
            text: description.text,
            editorState: EditorState.createWithContent( ContentState.createFromText(description.text))
        };

        this.onChange = (editorState) => this.setState({editorState});

        // This binding is necessary to make `this` work in the callback
        this.onTextChange = this.onTextChange.bind(this);
    }


    onTextChange(event) {
        let text = event.target.value;
        this.setState( { text : text } );
        if(this.props.onDesignChange) {
            this.props.onDesignChange("objects.descripion", text )
        }
    }


    render() {
        return (
            <div className="iwp-editor iwp-description-editor">

                <h3>Description</h3>

                <div style={{borderStyle:'solid', borderWidth: '1px', borderColor: '#cccccc'}}>

                    <Editor editorState={this.state.editorState} onChange={this.onChange}/>
                </div>
            </div>
        );
    }
}