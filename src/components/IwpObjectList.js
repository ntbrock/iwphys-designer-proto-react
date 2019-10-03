import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';


export default class IwpObjectList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            animation: props.animation };


        console.log("IwpDesignerContainer:12> Incoming Animation: " , props.animation );

        // This binding is necessary to make `this` work in the callback
        this.onFeatureClicked = this.onFeatureClicked.bind(this);
        this.onObjectClicked = this.onObjectClicked.bind(this);
    }

    /** Bubbles up from any design change ,  Features are core things like Author, Objects are dynamic things like Solids. */
    onFeatureClicked(event) {

        let feature = event.target.attributes["feature"].value;
        if ( this.props.onFeatureClicked ) { this.props.onFeatureClicked(feature, event); }
    }

    onObjectClicked(event) {
        if ( this.props.onObjectClicked ) { this.props.onObjectClicked(event); }
    }

    render() {
        return (


            <ListGroup>

                <ListGroupItem tag="a" href="#" feature="preview" onClick={this.onFeatureClicked}>Preview Animation</ListGroupItem>

                <ListGroupItem tag="a" href="#" feature="author" onClick={this.onFeatureClicked}>Author</ListGroupItem>

                <ListGroupItem tag="a" href="#" feature="description" onClick={this.onFeatureClicked}>Description</ListGroupItem>


                {/* Build the Dynamic Object List */}



                <ListGroupItem tag="a" href="#" feature="dataTable" onClick={this.onFeatureClicked}>Data Table</ListGroupItem>


                <ListGroupItem tag="a" href="#" feature="json" onClick={this.onFeatureClicked}>JSON</ListGroupItem>

            </ListGroup>


        );
    }
}