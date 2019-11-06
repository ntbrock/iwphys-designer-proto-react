import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';


export default class IwpObjectList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            animation: props.animation
        };

        // D-Fence
        if ( ! Array.isArray(this.props.animationUpdates) ) { throw Error("IwpObjectLists Defense: props.animationUpdates was not an array"); }

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

        const updateCount = this.props.animationUpdates.length;

        let saveButton;
        if ( updateCount === 0 ) {
            saveButton = <ListGroupItem feature="save" onClick={this.onFeatureClicked}>Saved</ListGroupItem>
        } else {
            saveButton = <ListGroupItem tag="a" href="#" feature="save" onClick={this.onFeatureClicked} color="primary" >Save {updateCount} Changes</ListGroupItem>
        }

        return (


            <ListGroup>

                <ListGroupItem tag="a" href="#" feature="preview" onClick={this.onFeatureClicked}>Preview Animation</ListGroupItem>

                {saveButton}

                <ListGroupItem tag="a" href="#" feature="json" onClick={this.onFeatureClicked}>Debug JSON</ListGroupItem>

                <ListGroupItem tag="a" href="#" feature="author" onClick={this.onFeatureClicked}>Author</ListGroupItem>

                <ListGroupItem tag="a" href="#" feature="description" onClick={this.onFeatureClicked}>Description</ListGroupItem>

                <ListGroupItem tag="a" href="#" feature="window" onClick={this.onFeatureClicked}>Window</ListGroupItem>

                <ListGroupItem tag="a" href="#" feature="graphWindow" onClick={this.onFeatureClicked}>Graph Window</ListGroupItem>

                {/* Build the Dynamic Object List */}

                <ListGroupItem tag="a" href="#" feature="time" onClick={this.onFeatureClicked}>Time</ListGroupItem>

                <ListGroupItem tag="a" href="#" feature="inputs" onClick={this.onFeatureClicked}>Inputs</ListGroupItem>

                <ListGroupItem tag="a" href="#" feature="outputs" onClick={this.onFeatureClicked}>Outputs</ListGroupItem>

                <ListGroupItem tag="a" href="#" feature="solids" onClick={this.onFeatureClicked}>Solids</ListGroupItem>


                <ListGroupItem tag="a" href="#" feature="dataTable" onClick={this.onFeatureClicked}>Data Table</ListGroupItem>



            </ListGroup>


        );
    }
}