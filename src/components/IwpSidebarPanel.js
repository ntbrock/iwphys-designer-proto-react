import React from 'react';
import {Button, ListGroup, ListGroupItem} from 'reactstrap';


export default class IwpSidebarPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            animation: props.animation
        };

        // D-Fence
        if ( ! Array.isArray(this.props.animationUpdates) ) { throw Error("IwpObjectLists Defense: props.animationUpdates was not an array"); }
        if ( this.props.onSidebarClicked === undefined ) { throw Error("IwpObjectLists Defense: props.onSidebarClicked was undefined"); }

        // This binding is necessary to make `this` work in the callback
        this.onSidebarClicked = this.onSidebarClicked.bind(this);
    }


    /** Bubbles up from any sidebar click an tells the main layout to swap the editor panel */

    onSidebarClicked(event) {
        let feature = event.target.attributes["feature"].value;
        this.props.onSidebarClicked(feature, event);
    }


    render() {

        const updateCount = this.props.animationUpdates.length;

        let saveButton;
        if ( updateCount === 0 ) {
            saveButton = <ListGroupItem feature="save" onClick={this.onSidebarClicked}>Saved</ListGroupItem>
        } else {
            saveButton = <ListGroupItem tag="a" href="#" feature="save" onClick={this.onSidebarClicked} color="primary" >Save {updateCount} Changes</ListGroupItem>
        }

        return (


            <ListGroup>

                <ListGroupItem style={{backgroundColor: "#ddd"}}>

                    <form method="POST" target="_preview" action="http://localhost:8470/animation/preview">

                        <input type="hidden" name="animationFilename" value="reactDesignerNeedsFilenames56.iwp.json"/>

                        <input type="hidden" name="animationJson" value={JSON.stringify(this.props.animation)}/>

                        <Button active={true} color="primary">Preview Animation</Button>

                    </form>

                </ListGroupItem>

                {saveButton}


                <ListGroupItem tag="a" href="#" feature="settings" onClick={this.onSidebarClicked}>Settings</ListGroupItem>

                {/* Build the Dynamic Object List */}

                <ListGroupItem tag="a" href="#" feature="inputs" onClick={this.onSidebarClicked}>Inputs</ListGroupItem>

                <ListGroupItem tag="a" href="#" feature="outputs" onClick={this.onSidebarClicked}>Outputs</ListGroupItem>

                <ListGroupItem tag="a" href="#" feature="solids" onClick={this.onSidebarClicked}>Solids</ListGroupItem>

                {/*
                <ListGroupItem tag="a" href="#" feature="dataTable" onClick={this.onSidebarClicked}>Data Table</ListGroupItem>
                */}

                <ListGroupItem tag="a" href="#" feature="json" onClick={this.onSidebarClicked}>Json Differences</ListGroupItem>


            </ListGroup>


        );
    }
}