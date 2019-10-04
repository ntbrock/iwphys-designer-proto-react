import React from 'react';
import update from "immutability-helper";

/**
 * Edit Author information
 */
export default class IwpGraphWindowEditor extends React.Component {

    constructor(props) {
        super(props);

        const graphWindow = props.animation.objects.filter( (o) => o.objectType === "graphWindow" )[0]

        this.state = {
            graphWindow: graphWindow
        };

        // This binding is necessary to make `this` work in the callback
        this.onFieldChange = this.onFieldChange.bind(this);

    }

    /** Handle Field Changes Generically */
    onFieldChange(event) {
        let feature = event.target.attributes['feature'].value;
        let value = event.target.value;

        console.log("IwpGraphWindowEditor:29> feature: " , feature, "  value:", value);

        this.setState( { graphWindow : update(this.state.graphWindow, {[feature]: {$set: value}}) } );

        if(this.props.onDesignChange) {
            this.props.onDesignChange("objects.graphWindow."+feature, value )
        }
    }



    render() {
        return (
            <div className="iwp-graphWindow-editor">

                <h3>Graph Window</h3>
                <div>
                    <div className="iwp-window-editor-field">
                        <label>X Min</label>
                        <input type="text"
                               value={this.state.graphWindow.xmin}
                               readOnly={false}
                               feature="xmin"
                               onChange={this.onFieldChange}/>
                    </div>

                    <div className="iwp-window-editor-field">
                        <label>X Max</label>
                        <input type="text"
                               value={this.state.graphWindow.xmax}
                               readOnly={false}
                               feature="xmax"
                               onChange={this.onFieldChange}/>
                        </div>

                    <div className="iwp-window-editor-field">
                        <label>X Grid</label>
                        <input type="text"
                               value={this.state.graphWindow.xgrid}
                               readOnly={false}
                               feature="xgrid"
                               onChange={this.onFieldChange}/>
                        </div>

                    <br/>

                    <div className="iwp-window-editor-field">

                    <label>Y Min</label>
                        <input type="text"
                               value={this.state.graphWindow.ymin}
                               readOnly={false}
                               feature="ymin"
                               onChange={this.onFieldChange}/>
                    </div>
                    <div className="iwp-window-editor-field">

                    <label>Y Max</label>
                        <input type="text"
                               value={this.state.graphWindow.ymax}
                               readOnly={false}
                               feature="ymax"
                               onChange={this.onFieldChange}/>
                    </div>
                    <div className="iwp-window-editor-field">

                    <label>Y Grid</label>
                        <input type="text"
                               value={this.state.graphWindow.ygrid}
                               readOnly={false}
                               feature="ygrid"
                               onChange={this.onFieldChange}/>
                    </div>


                </div>

            </div>
        );
    }
}