import React from 'react';
import update from "immutability-helper";

/**
 * Edit Author information
 */
export default class IwpWindowEditor extends React.Component {

    constructor(props) {
        super(props);

        const window = props.animation.objects.filter( (o) => o.objectType === "window" )[0]


        this.state = {
            window: window
        };

        // This binding is necessary to make `this` work in the callback
        this.onFieldChange = this.onFieldChange.bind(this);

    }

    /** TODO Handle Field Changes Generically */
    onFieldChange(event) {
        let feature = event.target.attributes['feature'].value;
        let value = event.target.value;

        console.log("IwpWindowEditor:29> feature: " , feature, "  value:", value);

        this.setState( { window : update(this.state.window, {[feature]: {$set: value}}) } );

        if(this.props.onDesignChange) {
            this.props.onDesignChange("objects.window."+feature, value )
        }
    }



    render() {
        return (
            <div className="iwp-window-editor">

                <h3>Window</h3>
                <div>
                    <div className="iwp-window-editor-field">
                        <label>X Min</label>
                        <input type="text"
                               value={this.state.window.xmin}
                               readOnly={false}
                               feature="xmin"
                               onChange={this.onFieldChange}/>
                    </div>

                    <div className="iwp-window-editor-field">
                        <label>X Max</label>
                        <input type="text"
                               value={this.state.window.xmax}
                               readOnly={false}
                               feature="xmax"
                               onChange={this.onFieldChange}/>
                        </div>

                    <div className="iwp-window-editor-field">
                        <label>X Grid</label>
                        <input type="text"
                               value={this.state.window.xgrid}
                               readOnly={false}
                               feature="xgrid"
                               onChange={this.onFieldChange}/>
                        </div>

                    <div className="iwp-window-editor-field">

                        <label>X Unit</label>
                        <input type="text"
                               value={this.state.window.xgrid}
                               readOnly={false}
                               feature="xunit"
                               onChange={this.onFieldChange}/>
                        </div>

                    <br/>

                    <div className="iwp-window-editor-field">

                    <label>Y Min</label>
                        <input type="text"
                               value={this.state.window.ymin}
                               readOnly={false}
                               feature="ymin"
                               onChange={this.onFieldChange}/>
                    </div>
                    <div className="iwp-window-editor-field">

                    <label>Y Max</label>
                        <input type="text"
                               value={this.state.window.ymax}
                               readOnly={false}
                               feature="ymax"
                               onChange={this.onFieldChange}/>
                    </div>
                    <div className="iwp-window-editor-field">

                    <label>Y Grid</label>
                        <input type="text"
                               value={this.state.window.ygrid}
                               readOnly={false}
                               feature="ygrid"
                               onChange={this.onFieldChange}/>
                    </div>
                    <div className="iwp-window-editor-field">

                        <label>Y Unit</label>
                        <input type="text"
                               value={this.state.window.ygrid}
                               readOnly={false}
                               feature="yunit"
                               onChange={this.onFieldChange}/>
                    </div>


                </div>

            </div>
        );
    }
}